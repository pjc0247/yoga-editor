import yoga from "yoga-layout-prebuilt";
import { observable, runInAction, untracked } from "mobx";

import { YogaNode } from "./model";

let tid = 0;

export interface IWorkspace {
  workspaceRoot: HTMLElement | null;

  root: YogaNode | null;
  activeNode: YogaNode | null;
  flyingNode: YogaNode | null;
  overlappingNode: YogaNode | null;

  insertTimer: number;

  createWorkspace(): void;

  setActiveNode(node: YogaNode | null): void;
  setFlyingNode(node: YogaNode | null): void;
  setOverlappingNode(node: YogaNode | null): void;
}
export const workspace = observable<IWorkspace>({
  workspaceRoot: null,
  root: null,
  activeNode: null,
  flyingNode: null,
  overlappingNode: null,

  insertTimer: 0,

  createWorkspace() {
    this.root = YogaNode.create();
    this.root.width = 320;
    this.root.height = 640;

    this.workspaceRoot = document.getElementById("yoga-root");
  },

  setActiveNode(node: YogaNode | null) {
    this.activeNode = node;
  },
  setFlyingNode(node: YogaNode | null) {
    this.flyingNode = node;
  },
  setOverlappingNode(node: YogaNode | null) {
    if (this.overlappingNode === node) return;

    this.overlappingNode = node;

    // todo: move these to somewhere else
    clearTimeout(tid);
    if (node) {
      tid = setTimeout(() => {
        runInAction(() => {
          const { x, y } = this.flyingNode!.flyingPosition;
          const edge = node.getOverlappingEdge(x, y);

          if (edge === "inside") {
            this.flyingNode?.reparent(node);
          } else if (edge === "bottom") {
            this.flyingNode!.detatch();
            node.parent?.insertChild(this.flyingNode!, node.siblingIndex + 1);
          } else if (edge === "top") {
            this.flyingNode!.detatch();
            node.parent?.insertChild(this.flyingNode!, node.siblingIndex);
          } else if (edge === "right") {
            const wrapper = YogaNode.create();
            wrapper.direction = yoga.FLEX_DIRECTION_ROW;
            const siblingIndex = node.siblingIndex;
            const parent = node.parent;
            node.reparent(wrapper);
            this.flyingNode!.detatch();
            wrapper.appendChild(this.flyingNode!);
            parent?.insertChild(wrapper, siblingIndex);
          } else if (edge === "left") {
            const wrapper = YogaNode.create();
            wrapper.direction = yoga.FLEX_DIRECTION_ROW;
            const siblingIndex = node.siblingIndex;
            const parent = node.parent;
            this.flyingNode!.detatch();
            wrapper.appendChild(this.flyingNode!);
            node.reparent(wrapper);
            parent?.insertChild(wrapper, siblingIndex);
          }

          this.flyingNode?.setFlying(false);
          this.setFlyingNode(null);
        });
      }, 800);
    }
  },
} as IWorkspace);
