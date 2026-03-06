# System Architecture

The AI 3D Game Builder is divided into six primary layers. Strict separation of these layers is required to maintain stability as AI continuously modifies the repository.

## 1. ENGINE
**Purpose:** Core rendering, scene management, physics calculations, input handling, and audio systems.
- Must remain highly optimized, stable, and completely agnostic to the AI generation logic.
- Serves as the foundation upon which templates and generated games sit.

## 2. GENERATOR
**Purpose:** AI systems that interpret prompts and assemble games.
- Contains the intelligence of the platform (e.g., prompt parsers, pipeline managers, code synthesizers).
- Dynamically retrieves assets and game logic templates to synthesize a complete game.
- Never directly mutates the ENGINE layer.

## 3. TEMPLATES
**Purpose:** Prebuilt game structures.
- Contains base logic and folder schemas for different genres (e.g., racing, fps, platformer).
- The GENERATOR uses these as reliable starting points or scaffolds to build out customized games without rewriting the wheel.

## 4. EDITOR
**Purpose:** User interface for editing and assembling games.
- A front-end application where users type prompts, view system progress, and manually tweak generated scenes and logic.

## 5. RUNTIME
**Purpose:** System that launches generated games.
- A controlled execution environment or sandbox that safely loads games from the GAMES directory, ensuring they run smoothly without crashing the core editor or engine.

## 6. GAMES
**Purpose:** Folder containing generated games.
- A dynamic storage layer where all prompt-generated games, assets, and specific logic scripts are placed.
- Core systems (ENGINE, RUNTIME) read from here to execute the game data.
