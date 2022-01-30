import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Paper, Portal } from "@mui/material";
import { useContextMenu } from "react-contexify";

import { YogaNode } from "@/store/model";
import { useStores } from "@/store";
import { stringToColor, toYogaWorld } from "@/util";
import { NodeMenuID } from "@/component/menu";

interface NodeProps {
  node: YogaNode;
}
export const Node = observer(({ node }: NodeProps) => {
  const { workspace } = useStores();
  const { show: showContextMenu } = useContextMenu({
    id: NodeMenuID,
  });

  const style = node.isFlying
    ? overrideStyle(
        node.getComputedStyles(),
        node.flyingPosition.x - node.width / 2,
        node.flyingPosition.y - node.height / 2,
        node.width,
        node.height
      )
    : node.getComputedStyles();

  const onClick = (e: React.MouseEvent) => {
    if (workspace.activeNode === node) return;

    e.stopPropagation();
    workspace.setActiveNode(node);
  };
  const onDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    node.flyingPosition = toYogaWorld(e.clientX, e.clientY);
    node.setFlying(true);

    workspace.setFlyingNode(node);
  };
  const onDragEnd = (e: React.MouseEvent) => {
    if (!node.isFlying) return;

    e.stopPropagation();
    node.setFlying(false);
    workspace.setFlyingNode(null);
  };
  const onDrag = (e: React.MouseEvent) => {
    if (!node.isFlying) return;

    e.stopPropagation();
    const yogaPosition = toYogaWorld(e.clientX, e.clientY);
    e.target.style.left = `${yogaPosition.x - node.width / 2}px`;
    e.target.style.top = `${yogaPosition.y - node.height / 2}px`;
    node.flyingPosition = yogaPosition;
  };
  const onContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    showContextMenu(e, { props: { node } });
  };

  if (node.isFlying) {
    const { x, y } = node.flyingPosition;
    const hit = workspace.root!.getOverlappingNode(x, y);
    const edge = hit?.getOverlappingEdge(x, y);

    workspace.setOverlappingNode(hit);
  }

  const overlappingEdge =
    workspace.overlappingNode === node
      ? node.getOverlappingEdge(
          workspace.flyingNode?.flyingPosition?.x!,
          workspace.flyingNode?.flyingPosition?.y!
        )
      : null;
  const d = node.dirty;

  return (
    <Portal container={workspace.workspaceRoot} disablePortal={!node.isFlying}>
      <Container
        draggable="true"
        active={workspace.activeNode === node}
        flying={node.isFlying}
        hovered={workspace.overlappingNode === node}
        edge={overlappingEdge}
        style={{ ...style, backgroundColor: stringToColor(node.id) }}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        onMouseUp={onDragEnd}
        onMouseMove={onDrag}
        onContextMenu={onContextMenu}
      >
        {node.children?.map((x, index) => (
          <Node key={index} node={x} />
        ))}

        {node.id}
      </Container>
    </Portal>
  );
});

const overrideStyle = (
  style: any,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return {
    ...style,
    transition: "none",
    position: "absolute",
    left: x + "px",
    top: y + "px",
    width: width + "px",
    height: height + "px",
  };
};

const Container = styled.div<{
  active: boolean;
  hovered: boolean;
  flying: boolean;
  edge: EdgeKind | null;
}>`
  position: absolute;
  display: flex;

  outline: 1.5px dashed #999;

  background: white;

  align-items: center;
  justify-content: center;

  transition: all 0.245s ease;
  transition-property: transform, inset, border, width, height, left, top,
    background;

  ${({ active }) =>
    active
      ? `
      box-shadow: 0px 0px 5px 5px rgba(0, 181, 255, 0.7);
      transform: scale(1.025);
      z-index: 10;
  `
      : `
  `}
  ${({ flying }) =>
    flying
      ? `
      position: absolute;
      opacity: 0.5;
  `
      : `
  `}
  ${({ hovered }) =>
    hovered
      ? `
  `
      : `
  `}
  ${({ edge }) => {
    return {
      ["top"]: "border-top: 10px solid rgba(0,0,255, 0.4);",
      ["right"]: "border-right: 10px solid rgba(0,0,255, 0.4);",
      ["bottom"]: "border-bottom: 10px solid rgba(0,0,255, 0.4);",
      ["left"]: "border-left: 10px solid rgba(0,0,255, 0.4);",
      ["inside"]: "background: rgba(0,0,255, 0.2);",
    }[edge!];
  }}
`;
