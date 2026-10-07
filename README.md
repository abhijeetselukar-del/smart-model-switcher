# smart-model-switcher

A Claude Code plugin that automatically switches the active model based on keywords in your prompt — no manual `/model` changes needed.

## How it works

Type naturally. The plugin reads each prompt before it is sent and routes it to the right model:

### Claude Opus — deep thinking

Triggers on: `think deeply`, `analyze`, `review all`, `architect`, `audit`, `explain in depth`, `deep dive`, `root cause`, `why is this failing`, `debug this`, `code review`, `refactor`, `production ready`, `edge cases`, `write tests`, `security review`, `performance review`, `compare approaches`, `pros and cons`, `best approach`, `trade-offs`, `design system`, `design pattern`

### Claude Haiku — quick tasks

Triggers on: `quick:`, `briefly`, `just `, `one-liner`, `tldr`, `explain briefly`, `what is`, `define `, `remind me`, `what does`, `syntax for`, `how do i`, `example of`, `give me a`, `list `, `rename this`, `fix typo`, `format this`, `translate`

### Claude Sonnet — everything else _(default)_

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
