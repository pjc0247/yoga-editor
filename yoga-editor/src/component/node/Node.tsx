import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Paper, Portal } from "@mui/material";

import { YogaNode } from "@/store/model";
import { useStores } from "@/store";

interface NodeProps {
  node: YogaNode;
}
export const Node = observer(({ node }: NodeProps) => {
  const { workspace } = useStores();

  const RootWrapper = node.isFlying ? Portal : React.Fragment;

  const style = node.isFlying
    ? overrideStyle(
        node.getComputedStyles(),
        node.flyingPosition.x - node.width / 2,
        node.flyingPosition.y - node.height / 2,
        node.width,
        node.height
      )
    : node.getComputedStyles();

  console.log("isFlying", node.isFlying);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    workspace.setActiveNode(node);
  };
  const onDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    node.flyingPosition = {
      x: e.pageX,
      y: e.pageY,
    };
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
    e.target.style.left = `${e.pageX - node.width / 2}px`;
    e.target.style.top = `${e.pageY - node.height / 2}px`;
    node.flyingPosition = {
      x: e.pageX,
      y: e.pageY,
    };
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
    <RootWrapper>
      <Container
        draggable="true"
        active={workspace.activeNode === node}
        hovered={workspace.overlappingNode === node}
        edge={overlappingEdge}
        style={style}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        onMouseUp={onDragEnd}
        onMouseMove={onDrag}
      >
        {node.children?.map((x, index) => (
          <Node key={index} node={x} />
        ))}
      </Container>
    </RootWrapper>
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
  edge: EdgeKind | null;
}>`
  position: absolute;
  display: flex;

  outline: 1.5px dashed #999;

  transition: all 0.245s ease;
  transition-property: inset, border, width, height, left, top, background;

  ${({ active }) =>
    active
      ? `
      box-shadow: 0px 0px 15px 5px #3EB595;
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
