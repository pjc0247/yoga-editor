import React from "react";
import { Menu, Item, ItemParams } from "react-contexify";

import { YogaNode } from "@/store/model";

export const NodeMenuID = "NODE_MENU";

interface NodeMenuParams
  extends ItemParams<
    {
      node: YogaNode;
    },
    any
  > {}

interface NodeMenuProps {}
export const NodeMenu = ({}: NodeMenuProps) => {
  const onRemove = ({ props }: NodeMenuParams) => {
    const node = props?.node;
    console.log(node?.id);
    node?.detatch();
  };

  return (
    <Menu id={NodeMenuID}>
      <Item onClick={onRemove}>Remove</Item>
    </Menu>
  );
};
