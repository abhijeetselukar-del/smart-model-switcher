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

## Install (2 minutes)

You need [Claude Code](https://claude.com/claude-code) installed. Run these two commands in your terminal:

```bash
claude plugin marketplace add abhijeetselukar-del/smart-model-switcher
claude plugin install smart-model-switcher@abhi-local
```

Then **start a new Claude Code session**. That's it. It stays on permanently, in the terminal and in the Claude app's Code tab, with no flags to remember.

Prefer typing inside Claude Code? Run these instead:

```
/plugin marketplace add abhijeetselukar-del/smart-model-switcher
/plugin install smart-model-switcher@abhi-local
```

### Check it works

Send `quick: what is a closure`. The spinner should show `· Haiku`.

### Existing sessions

Sessions that were already open when you installed won't pick it up. Quit and resume them: `claude --continue`.

### Try it without installing

```bash
git clone https://github.com/abhijeetselukar-del/smart-model-switcher ~/smart-model-switcher
claude --plugin-dir ~/smart-model-switcher
```

This only lasts for that one session.

### Uninstall

```bash
claude plugin uninstall smart-model-switcher@abhi-local
claude plugin marketplace remove abhi-local
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
.claude-plugin/marketplace.json  # lets people install it straight from GitHub
hooks/hooks.json             # hook registration
hooks/register.js            # plugin logic
tsconfig.json                # TypeScript config
```

## Author

Abhi
