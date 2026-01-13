// #region agent log
const originalConfig = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

// Log PostCSS config loading
if (typeof process !== 'undefined') {
  const fs = require('fs');
  const path = require('path');
  const logPath = path.join(process.cwd(), '.cursor', 'debug.log');
  try {
    const logEntry = JSON.stringify({
      location: 'postcss.config.mjs:1',
      message: 'PostCSS config loaded',
      data: {
        hasTailwindPlugin: !!originalConfig.plugins['@tailwindcss/postcss'],
        hasAutoprefixer: !!originalConfig.plugins.autoprefixer,
        pluginsCount: Object.keys(originalConfig.plugins).length
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'B'
    }) + '\n';
    fs.appendFileSync(logPath, logEntry, 'utf8');
  } catch (e) {
    // Ignore if log file doesn't exist yet
  }
}
// #endregion

export default originalConfig;

