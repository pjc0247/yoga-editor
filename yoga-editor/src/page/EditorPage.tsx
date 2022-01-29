import React, { useEffect } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStores } from "@/store";
import { InspectorWindow, Node } from "@/component";

export const EditorPage = observer(() => {
  const { workspace } = useStores();

  useEffect(() => {
    workspace.createWorkspace();
  }, []);

  return (
    <Container>
      <InspectorWindow />

      {workspace.root && <Node node={workspace.root} />}
    </Container>
  );
});

const Container = styled.div`
  padding: 32px;
`;
