import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import yoga from "yoga-layout-prebuilt";

import { useStores } from "@/store";
import { YogaNode } from "@/store/model";
import { EdgeValues } from "@/component/input";

interface FlexTabProps {
  activeNode: YogaNode;
}
export const FlexTab = observer(({ activeNode }: FlexTabProps) => {
  const { workspace } = useStores();

  return (
    <Container>
      <Select
        value={activeNode.direction}
        onChange={(e) =>
          (activeNode.direction = e.target.value as yoga.YogaDirection)
        }
      >
        <MenuItem value={yoga.FLEX_DIRECTION_ROW}>Horizontal</MenuItem>
        <MenuItem value={yoga.FLEX_DIRECTION_ROW_REVERSE}>
          Horizontal Reversed
        </MenuItem>
        <MenuItem value={yoga.FLEX_DIRECTION_COLUMN}>Vertical</MenuItem>
        <MenuItem value={yoga.FLEX_DIRECTION_COLUMN_REVERSE}>
          Vertical Reversed
        </MenuItem>
      </Select>

      <Select
        value={activeNode.overflow}
        onChange={(e) =>
          (activeNode.overflow = e.target.value as yoga.YogaOverflow)
        }
      >
        <MenuItem value={yoga.OVERFLOW_VISIBLE}>Visible</MenuItem>
        <MenuItem value={yoga.OVERFLOW_SCROLL}>Scroll</MenuItem>
        <MenuItem value={yoga.OVERFLOW_HIDDEN}>Hidden</MenuItem>
      </Select>

      <TextField
        value={activeNode.flex}
        onChange={(e) => (activeNode.flex = +e.target.value)}
      />
      <TextField
        value={activeNode.flexBasis}
        onChange={(e) => (activeNode.flexBasis = +e.target.value)}
      />
    </Container>
  );
});

const Container = styled(Paper).attrs({})`
  padding: 20px 20px;
`;
