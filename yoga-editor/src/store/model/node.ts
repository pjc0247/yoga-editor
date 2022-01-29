import yoga, { Node } from "yoga-layout-prebuilt";
import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";

export class YogaNode {
  private node: yoga.YogaNode;

  private _id: string;
  get id() {
    return this._id;
  }

  flyingPosition: Position = { x: 0, y: 0 };
  isFlying: boolean = false;
  dirty: number = 0;

  private _parent: YogaNode | undefined;
  get parent() {
    return this._parent;
  }

  private _position: yoga.YogaPositionType = yoga.POSITION_TYPE_RELATIVE;
  set position(value: yoga.YogaPositionType) {
    this.node.setPositionType(value);
    this._position = value;
  }
  get position() {
    return this._position;
  }

  private _direction: yoga.YogaDirection = yoga.FLEX_DIRECTION_COLUMN;
  set direction(value: yoga.YogaDirection) {
    this.node.setFlexDirection(value);
    this._direction = value;
  }
  get direction() {
    return this._direction;
  }

  private _flex: number = 0;
  set flex(value: number) {
    this.node.setFlex(value);
    this._flex = value;
  }
  get flex() {
    return this._flex;
  }

  private _flexBasis: number = 0;
  set flexBasis(value: number) {
    this.node.setFlexBasis(value);
    this._flexBasis = value;
  }
  get flexBasis() {
    return this._flexBasis;
  }

  private _width: number = 320;
  set width(value: number) {
    this.node.setWidth(value);
    this._width = value;
  }
  get width() {
    return this._width;
  }

  private _height: number = 320;
  set height(value: number) {
    this.node.setHeight(value);
    this._height = value;
  }
  get height() {
    return this._height;
  }

  private _padding: Edge = { left: 0, top: 0, right: 0, bottom: 0 };
  set padding(value: Edge) {
    this.node.setPadding(yoga.EDGE_TOP, value.top);
    this.node.setPadding(yoga.EDGE_RIGHT, value.right);
    this.node.setPadding(yoga.EDGE_BOTTOM, value.bottom);
    this.node.setPadding(yoga.EDGE_LEFT, value.left);
    this._padding = value;

    this.parent?.markDirty();
  }
  get padding() {
    return this._padding;
  }

  private _margin: Edge = { left: 0, top: 0, right: 0, bottom: 0 };
  set margin(value: Edge) {
    this.node.setMargin(yoga.EDGE_TOP, value.top);
    this.node.setMargin(yoga.EDGE_RIGHT, value.right);
    this.node.setMargin(yoga.EDGE_BOTTOM, value.bottom);
    this.node.setMargin(yoga.EDGE_LEFT, value.left);
    this._margin = value;

    this.parent?.markDirty();
  }
  get margin() {
    return this._margin;
  }

  get root() {
    let p = this.parent;
    while (!!p?.parent) p = this.parent;
    return p;
  }

  get siblingIndex() {
    return this.parent?.children.indexOf(this) ?? -1;
  }

  children: YogaNode[] = [];

  constructor() {
    this.node = Node.create();
    this._id = `${uuid().substring(0, 8)}`;
    makeAutoObservable(this);
  }

  static create() {
    const node = new YogaNode();
    node.flex = 1;
    node.flexBasis = 100;
    node.position = yoga.POSITION_TYPE_RELATIVE;
    node.direction = yoga.FLEX_DIRECTION_COLUMN;
    node.padding = { top: 4, right: 4, bottom: 4, left: 4 };
    node.margin = { top: 0, right: 0, bottom: 0, left: 0 };

    return node;
  }
  static copy(from: YogaNode) {
    const node = new YogaNode();
    node.node.copyStyle(from.node);

    return node;
  }

  markDirty() {
    this.dirty = Date.now();
    this.children.forEach((x) => x.markDirty());
  }

  detatch() {
    if (!this.parent) return;

    this.parent.removeChild(this);
  }

  insertChild(node: YogaNode, index: number) {
    node._parent = this;
    this.node.insertChild(node.node, index);
    this.children = [...this.children, node];

    this.markDirty();
  }
  appendChild(node: YogaNode) {
    this.insertChild(node, this.node.getChildCount());
  }
  removeChild(node: YogaNode) {
    node._parent = undefined;
    this.node.removeChild(node.node);
    this.children = this.children.filter((x) => x !== node);

    this.markDirty();
  }
  reparent(node: YogaNode) {
    this.detatch();

    node.appendChild(this);
  }

  setFlying(value: boolean) {
    if (value) {
      const root = this.root;
      this.reparent(root!);
    }
    this.isFlying = value;

    this.markDirty();
  }

  calc() {
    this.node.calculateLayout();
  }

  getComputedStyles() {
    if (this.node.isDirty()) this.calc();
    return this.node.getComputedLayout();
  }

  containsPoint(x: number, y: number) {
    const { left, top, width, height } = this.node.getComputedLayout();
    return left <= x && x <= left + width && top <= y && y <= top + height;
  }

  getOverlappingNode(x: number, y: number): YogaNode | null {
    return this._getOverlappingNode(x, y);
  }
  private _getOverlappingNode(x: number, y: number): YogaNode | null {
    if (!this.containsPoint(x, y)) return null;

    for (const c of this.children) {
      if (c.isFlying) continue;
      const hit = c._getOverlappingNode(x, y);
      if (hit) return hit;
    }
    return this;
  }

  getOverlappingEdge(x: number, y: number): EdgeKind | null {
    const { left, top, width, height } = this.node.getComputedLayout();
    const Threshold = 20;

    if (!this.containsPoint(x, y)) return null;

    if (Math.abs(x - left) <= Threshold) return "left";
    if (Math.abs(x - (left + width)) <= Threshold) return "right";
    if (Math.abs(y - top) <= Threshold) return "top";
    if (Math.abs(y - (top + height)) <= Threshold) return "bottom";

    return "inside";
  }

  export(): Record<string, any> {
    return {
      position: this.position,
      flex: this.flex,
      width: this.width,
      height: this.height,
      children: this.children.map((x) => x.export()),
    };
  }
}
