# Code Map

This document outlines the allowed directory structure for the repository. **Do not create random folders outside of this hierarchy.**

```
/
├── ai/                 # Core AI instructions and context (You are here)
│   ├── AI_CONTEXT.md
│   ├── GOAL.md
│   ├── RULES.md
│   ├── ARCHITECTURE.md
│   └── CODEMAP.md
│
├── engine/             # Core rendering, scene, physics, input and audio
│   ├── render/         
│   ├── physics/        
│   ├── input/          
│   └── audio/          
│
├── generator/          # AI systems that interpret prompts and assemble games
│   ├── prompt_parser/  
│   ├── asset_generator/
│   └── scene_assembler/
│
├── templates/          # Prebuilt game structures
│   ├── racing/         
│   ├── fps/            
│   └── platformer/     
│
├── editor/             # User interface for editing and assembling games
│   ├── ui/             
│   └── tools/          
│
├── runtime/            # System that launches generated games
│   ├── loader/         
│   └── player/         
│
└── games/              # Folder containing generated games
    └── [game_id]/      # Unique directory for an individual generated game
        ├── scene/      
        ├── logic/      
        └── assets/     
```

## Guidance for AI Agents
When tasked with writing new code or modifying existing code, find the correct directory above.

- If protecting against performance bottlenecks in rendering, work inside `/engine/render/`.
- If parsing a new user prompt or managing LLM requests, work inside `/generator/prompt_parser/`.
- If an AI agent generates a new character model, place it inside `/games/[game_id]/assets/`.
- Do not create custom root-level folders unless verified against this Code Map.
