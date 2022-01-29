/// <reference types="vite/client" />

interface Position {
  x: number;
  y: number;
}

interface Edge {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

type EdgeKind = "top" | "right" | "bottom" | "left" | "inside";
