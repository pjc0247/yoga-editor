import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Box, MenuItem, Paper, Select, TextField } from "@mui/material";
import yoga from "yoga-layout-prebuilt";

import { useStores } from "@/store";
import { YogaNode } from "@/store/model";

interface AlignTabProps {
  activeNode: YogaNode;
}
export const AlignTab = observer(({ activeNode }: AlignTabProps) => {
  const { workspace } = useStores();

  return (
    <Container>
      <Select
        value={activeNode.alignItems}
        onChange={(e) =>
          (activeNode.alignItems = e.target.value as yoga.YogaAlign)
        }
      >
        <MenuItem value={yoga.ALIGN_AUTO}>Auto</MenuItem>
        <MenuItem value={yoga.ALIGN_CENTER}>Center</MenuItem>
        <MenuItem value={yoga.ALIGN_FLEX_START}>Flex Start</MenuItem>
        <MenuItem value={yoga.ALIGN_FLEX_END}>Flex End</MenuItem>
        <MenuItem value={yoga.ALIGN_SPACE_BETWEEN}>Space Between</MenuItem>
      </Select>

      <Select
        value={activeNode.justifyContent}
        onChange={(e) =>
          (activeNode.justifyContent = e.target
            .value as yoga.YogaJustifyContent)
        }
      >
        <MenuItem value={yoga.JUSTIFY_CENTER}>Center</MenuItem>
        <MenuItem value={yoga.JUSTIFY_FLEX_START}>Flex Start</MenuItem>
        <MenuItem value={yoga.JUSTIFY_FLEX_END}>Flex End</MenuItem>
      </Select>
    </Container>
  );
});

const Container = styled(Paper).attrs({})`
  display: flex;
  flex-direction: column;

  padding: 20px 20px;
`;
