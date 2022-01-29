import React, { useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStores } from "@/store";
import { InspectorWindow, Node, OutputWindow } from "@/component";

export const EditorPage = observer(() => {
  const { workspace } = useStores();

  useEffect(() => {
    workspace.createWorkspace();
  }, []);

  return (
    <Container>
      <InspectorWindow />
      <OutputWindow />

      <PreviewContainer id="yoga-root">
        {workspace.root && <Node node={workspace.root} />}
      </PreviewContainer>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex: 1;

  height: 100vh;

  background: rgba(144, 203, 251, 0.3);

  align-items: center;
  justify-content: center;
`;

const PreviewContainer = styled.div`
  position: relative;

  > div:nth-child(1) {
    position: relative !important;
  }
`;
