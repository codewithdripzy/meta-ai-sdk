export type AgentPartData =
  | {
    role: "user" | "assistant";
    text: string;
  }
  | {
    role: "user" | "assistant";
    inlineData: {
      mimeType: string;
      data: string;
    };
  };