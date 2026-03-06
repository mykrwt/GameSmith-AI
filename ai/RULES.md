# AI Development Rules

To ensure a stable architecture for long-term development, all AI agents modifying this repository must strictly follow these rules:

## 1. Modular Code
- Keep systems small, focused, and strictly separated by concern.
- Prefer modular systems. Do not write monolithic scripts. For example, rendering logic and physics logic must live in completely separate modules.

## 2. No Extremely Large Files
- Prevent monolithic files. Break down any file that grows beyond a reasonable size into smaller, logical sub-components.

## 3. Strict Separation Between Systems
- Follow the exact layer structure defined in `ARCHITECTURE.md`.
- Systems like the `ENGINE` must be completely decoupled from the `EDITOR` and `GENERATOR` modules. Do not import `EDITOR` state into `ENGINE` code.

## 4. Protect Core Systems
- Generated content (user games, output of the generator) must NEVER break core systems.
- Treat the `ENGINE`, `EDITOR`, and `RUNTIME` as protected layers. Prevent rewriting core systems unless explicitly requested by the user.

## 5. Prevent Random Folder Creation
- Do not invent new top-level directories or random folders.
- Always consult the `CODEMAP.md` to see where your code or assets should live. Stay within the predefined boundaries.

## 6. Safe Interfaces
- When communicating between layers (e.g., between the generator and the runtime), use well-defined, stable interfaces or configurations (like JSON/YAML templates) rather than direct code injection whenever possible. Do not execute untrusted generative logic in the core runtime execution context without sandboxing.
