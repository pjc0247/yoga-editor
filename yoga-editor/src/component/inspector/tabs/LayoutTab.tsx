import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Box, Button, Paper, Tab, Tabs } from "@mui/material";

import { useStores } from "@/store";
import { YogaNode } from "@/store/model";
import { EdgeValues } from "@/component/input";

interface LayoutTabProps {
  activeNode: YogaNode;
}
export const LayoutTab = observer(({ activeNode }: LayoutTabProps) => {
  const { workspace } = useStores();

  return (
    <Container>
      <EdgeValues
        value={activeNode.padding}
        onChange={(e) => (activeNode.padding = e)}
      />
      <EdgeValues
        value={activeNode.margin}
        onChange={(e) => (activeNode.margin = e)}
      />
    </Container>
  );
});

const Container = styled(Paper).attrs({})`
  display: flex;
  flex-direction: column;

  padding: 20px 20px;
`;
