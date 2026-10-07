const OPUS_SIGNALS = [
  'think deeply', 'analyze', 'review all', 'architect', 'audit', 'explain in depth',
  'deep dive', 'root cause', 'why is this failing', 'debug this',
  'code review', 'refactor', 'production ready', 'edge cases',
  'write tests', 'security review', 'performance review',
  'compare approaches', 'pros and cons', 'best approach', 'trade-offs',
  'design system', 'design pattern'
]

const HAIKU_SIGNALS = [
  'quick:', 'briefly', 'just ', 'one-liner', 'tldr', 'explain briefly',
  'what is', 'define ', 'remind me', 'what does', 'syntax for',
  'how do i', 'example of', 'give me a', 'list ',
  'rename this', 'fix typo', 'format this', 'translate'
]

const SONNET_DEFAULT = 'claude-sonnet-4-6'
const OPUS_ID        = 'claude-opus-4-5'
const HAIKU_ID       = 'claude-haiku-4-5'

let targetModel = SONNET_DEFAULT
let switchLog   = []

function detectModel(text) {
  const lower = text.toLowerCase()
  if (OPUS_SIGNALS.some(s  => lower.includes(s))) return OPUS_ID
  if (HAIKU_SIGNALS.some(s => lower.includes(s))) return HAIKU_ID
  return SONNET_DEFAULT
}

function modelLabel(id) {
  if (id.includes('opus'))  return 'Opus'
  if (id.includes('haiku')) return 'Haiku'
  return 'Sonnet'
}

export function register(on) {
  on('prompt.submit', async ($, e, next) => {
    const detected = detectModel(e.text)
    if (detected !== targetModel) {
      switchLog.unshift({
        time:  new Date().toLocaleTimeString(),
        model: modelLabel(detected),
        text:  e.text.slice(0, 40)
      })
      if (switchLog.length > 8) switchLog.pop()
      targetModel = detected
      $.ui.invalidate('ui.render')
    }
    return next(e)
  }).catch(() => {
    console.error('[smart-model-switcher] prompt.submit error (unhandled)')
  })

  on('turn.step', async function* ($, e, next) {
    yield* next({ ...e, model: targetModel })
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const label = modelLabel(targetModel)
    return next({ ...e,
      props: { ...e.props, suffix: ` · ${label}` }
    })
  })
}
