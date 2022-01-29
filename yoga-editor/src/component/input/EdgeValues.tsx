import React from "react";
import styled from "styled-components";
import { Box, TextField } from "@mui/material";

interface EdgeValuesProps {
  value: Edge;
  onChange: (x: Edge) => void;
}
export const EdgeValues = ({ value, onChange }: EdgeValuesProps) => {
  return (
    <Box>
      <Row>
        <NumberField
          value={value.top}
          onChange={(e) => onChange({ ...value, top: +e.target.value })}
        />
      </Row>

      <Row>
        <NumberField
          value={value.left}
          onChange={(e) => onChange({ ...value, left: +e.target.value })}
        />
        <BoxIndicator />
        <NumberField
          value={value.right}
          onChange={(e) => onChange({ ...value, right: +e.target.value })}
        />
      </Row>

      <Row>
        <NumberField
          value={value.bottom}
          onChange={(e) => onChange({ ...value, bottom: +e.target.value })}
        />
      </Row>
    </Box>
  );
};

const NumberField = styled(TextField).attrs({
  type: "number",
  variant: "outlined",
})`
  width: 52px;

  input {
    padding: 4px 8px;
  }
`;

const BoxIndicator = styled.div`
  width: 64px;
  height: 64px;

  border: 1px solid #999;

  border-radius: 8px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;

  flex-direction: row;

  margin: 4px;
  gap: 4px;

  align-items: center;
  justify-content: center;
`;
