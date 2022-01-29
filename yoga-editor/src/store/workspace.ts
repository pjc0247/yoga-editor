import { observable, runInAction, untracked } from "mobx";

import { YogaNode } from "./model";

export interface IWorkspace {
  root: YogaNode | null;
  activeNode: YogaNode | null;
  flyingNode: YogaNode | null;
  overlappingNode: YogaNode | null;

  insertTimer: number;

  createWorkspace(): void;

  setActiveNode(node: YogaNode): void;
  setFlyingNode(node: YogaNode | null): void;
  setOverlappingNode(node: YogaNode | null): void;
}
export const workspace = observable<IWorkspace>({
  root: null,
  activeNode: null,
  flyingNode: null,
  overlappingNode: null,

  insertTimer: 0,

  createWorkspace() {
    this.root = YogaNode.create();
    this.root.width = 320;
    this.root.height = 640;
  },

  setActiveNode(node: YogaNode) {
    this.activeNode = node;
  },
  setFlyingNode(node: YogaNode) {
    this.flyingNode = node;
  },
  setOverlappingNode(node: YogaNode) {
    if (this.overlappingNode === node) return;

    this.overlappingNode = node;

    untracked(() => {
      clearTimeout(this.insertTimer);
      if (node) {
        this.insertTimer = setTimeout(() => {
          console.log("insert");
          runInAction(() => {
            console.log("a");
            this.flyingNode?.reparent(node);
            console.log("b");
            node.setFlying(false);
            this.setFlyingNode(null);
          });
        }, 800);
      }
    });
  },
} as IWorkspace);
