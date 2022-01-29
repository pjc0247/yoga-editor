import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { Paper } from "@mui/material";

import { useStores } from "@/store";

interface OutputWindowProps {}
export const OutputWindow = observer(({}: OutputWindowProps) => {
  const { workspace } = useStores();

  return (
    <Container>
      <pre>{JSON.stringify(workspace.root?.export(), null, 2)}</pre>
    </Container>
  );
});

const Container = styled(Paper).attrs({
  elevation: 2,
})`
  position: absolute;
  right: 16px;
  bottom: 16px;

  width: 280px;
  max-height: 480px;

  padding: 20px 20px;

  > pre {
    height: 320px;
    overflow: auto;
  }
`;
