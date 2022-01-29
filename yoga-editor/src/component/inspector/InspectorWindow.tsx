import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Box, Button, Paper, Tab, Tabs } from "@mui/material";

import { useStores } from "@/store";
import { YogaNode } from "@/store/model";
import { EdgeValues } from "@/component/input";

interface InspectorWindowProps {}
export const InspectorWindow = observer(({}: InspectorWindowProps) => {
  const { workspace } = useStores();
  const [tab, setTab] = useState(0);

  const onAddNode = () => {
    workspace.root?.appendChild(YogaNode.create());
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
          <Box>
            <EdgeValues
              value={workspace.activeNode.padding}
              onChange={(e) => (workspace.activeNode!.padding = e)}
            />
            <EdgeValues
              value={workspace.activeNode.margin}
              onChange={(e) => (workspace.activeNode!.margin = e)}
            />
          </Box>
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
