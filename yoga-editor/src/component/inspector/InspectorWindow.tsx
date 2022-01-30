import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Box, Button, Paper, Tab, Tabs } from "@mui/material";

import { useStores } from "@/store";
import { YogaNode } from "@/store/model";
import { EdgeValues } from "@/component/input";
import { FlexTab, LayoutTab } from "./tabs";

interface InspectorWindowProps {}
export const InspectorWindow = observer(({}: InspectorWindowProps) => {
  const { workspace } = useStores();
  const [tab, setTab] = useState(0);

  const onAddNode = () => {
    const newNode = YogaNode.create();
    workspace.root?.appendChild(newNode);
  };

  return (
    <Container>
      <Button onClick={onAddNode}>add node</Button>
      {!!workspace.activeNode && (
        <>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="Flex" />
            <Tab label="Layout" />
            <Tab label="Alignment" />
          </Tabs>
          {tab === 0 && <FlexTab activeNode={workspace.activeNode} />}
          {tab === 1 && <LayoutTab activeNode={workspace.activeNode} />}
        </>
      )}
    </Container>
  );
});

const Container = styled(Paper).attrs({
  elevation: 2,
})`
  position: absolute;
  right: 16px;
  top: 16px;

  padding: 20px 20px;
`;
