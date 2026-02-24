<div align="center">
  <h1>Meta AI SDK</h1>
  <p>TypeScript SDK and CLI for building AI-powered developer tools, agents, and integrations with Meta AI.</p>
  
  <p>
    <a href="https://www.npmjs.com/package/@orello/meta-sdk">
      <img src="https://img.shields.io/npm/v/@orello/meta-sdk.svg?style=flat-square" alt="NPM Version" />
    </a>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT" />
    </a>
  </p>

  <a href="https://www.buymeacoffee.com/thecodeguyy" target="_blank">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&slug=thecodeguyy&button_colour=FF5F5F&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00" alt="Buy Me a Coffee" style="height:40px;" />
  </a>
</div>

---

## Overview

**Meta AI SDK** provides a unified TypeScript interface for building, integrating, and automating with Meta AI models. It includes:

- SDK for agent orchestration, tool integration, and context management
- Utilities for safe, context-aware automation
- CLI for advanced developer workflows (coming soon)

---

## Features

- **MetaAI Class**: Simple interface for interacting with Meta AI models
- **Agent Framework**: Compose multi-agent systems with planning, tool selection, and feedback loops
- **Safe Execution**: Built-in guardrails to prevent destructive actions
- **Streaming & Context**: Stream model outputs and manage working memory
- **Extensible Tools**: Integrate your own tools, functions, and APIs
- **Beautiful Terminal Output**: Colorful, structured, and readable logs

---

## Installation

Add to your project:

```bash
npm install npm i meta-ai-sdk
```

> Requires Node.js 18+ and TypeScript 5+ for SDK usage.

---

## Usage

### Basic Usage with MetaAI

```typescript
import { MetaAI } from '@orello/meta-sdk';

const meta = new MetaAI({
  apiKey: 'YOUR_API_KEY',
  model: 'meta-llama/Llama-2-7b-chat-hf',
});

async function main() {
  const response = await meta.generateContent({
    prompt: 'Summarize the latest AI research trends.',
    maxTokens: 256,
    temperature: 0.7,
  });
  console.log(response.result);
}

main();
```

### Streaming Responses

```typescript
import { MetaAI } from '@orello/meta-sdk';

const meta = new MetaAI({ apiKey: 'YOUR_API_KEY' });

async function streamExample() {
  const stream = await meta.generateContentStream({
    prompt: 'Write a poem about the ocean.',
    maxTokens: 100,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.text);
  }
}

streamExample();
```

---

## Agentic Workflow Example

The SDK supports multi-agent orchestration:

1. **Information Gathering**: Collect files, logs, docs, and context
2. **Planning**: Generate a markdown implementation plan and decompose into tasks
3. **Tool Detection**: Select tools/functions and create execution plans
4. **Execution & Feedback**: Run plans, detect errors, and retry with feedback loops

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

MIT License
