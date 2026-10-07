# smart-model-switcher

A Claude Code plugin that automatically switches the active model based on keywords in your prompt — no manual `/model` changes needed.

## How it works

Type naturally. The plugin reads each prompt before it is sent and routes it to the right model:

| Trigger words | Model |
|---|---|
| `think deeply`, `analyze`, `review all`, `architect`, `audit`, `explain in depth` | Claude Opus |
| `quick:`, `briefly`, `just `, `one-liner`, `tldr`, `explain briefly` | Claude Haiku |
| _(anything else)_ | Claude Sonnet _(default)_ |

The current model is shown in the Spinner suffix (e.g. `· Opus`, `· Haiku`, `· Sonnet`) so you always know which model is active.

## Installation

```
claude --plugin-dir ~/smart-model-switcher
```

Or add it permanently to your Claude Code config:

```jsonc
// ~/.claude/settings.json
{
  "pluginDirs": ["~/smart-model-switcher"]
}
```

## Hooks

| Hook | What it does |
|---|---|
| `prompt.submit` | Detects trigger words and sets the target model; logs recent switches |
| `turn.step` | Injects the selected model ID into every inference step |
| `ui.render` (Spinner) | Appends `· <Model>` to the spinner so the active model is always visible |

## Files

```
.claude-plugin/plugin.json   # manifest
hooks/hooks.json             # hook registration
hooks/register.js            # plugin logic
tsconfig.json                # TypeScript config
```

## Author

Abhi
