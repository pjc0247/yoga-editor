import React from "react";

import { Box, Input } from "@mui/material";

interface EdgeValuesProps {
  value: Edge;
  onChange: (x: Edge) => void;
}
export const EdgeValues = ({ value, onChange }: EdgeValuesProps) => {
  return (
    <Box>
      <Input
        type="number"
        value={value.top}
        onChange={(e) => onChange({ ...value, top: +e.target.value })}
      />
      <Input
        type="number"
        value={value.right}
        onChange={(e) => onChange({ ...value, right: +e.target.value })}
      />
      <Input
        type="number"
        value={value.bottom}
        onChange={(e) => onChange({ ...value, bottom: +e.target.value })}
      />
      <Input
        type="number"
        value={value.left}
        onChange={(e) => onChange({ ...value, left: +e.target.value })}
      />
    </Box>
  );
};
