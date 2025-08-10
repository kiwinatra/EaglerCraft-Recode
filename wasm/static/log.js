// log.js - Красивый логгер для консоли
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    
    // Цвета текста
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    
    // Цвета фона
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
  };
  
  const log = {
    info: (...args) => console.log(`${colors.cyan}ℹ INFO:${colors.reset}`, ...args),
    success: (...args) => console.log(`${colors.green}✓ SUCCESS:${colors.reset}`, ...args),
    warn: (...args) => console.log(`${colors.yellow}⚠ WARNING:${colors.reset}`, ...args),
    error: (...args) => console.log(`${colors.red}✗ ERROR:${colors.reset}`, ...args),
    debug: (...args) => console.log(`${colors.magenta}🐛 DEBUG:${colors.reset}`, ...args),
    event: (...args) => console.log(`${colors.blue}🎯 EVENT:${colors.reset}`, ...args),
    
    // Стилизованный вывод для вашего курсора
    cursor: (x, y) => console.log(
      `${colors.bgBlue}${colors.white} CURSOR ${colors.reset}`,
      `X: ${colors.bright}${x}px${colors.reset}`,
      `Y: ${colors.bright}${y}px${colors.reset}`
    ),
    
    // Логирование анимаций
    animation: (name) => console.log(
      `${colors.bgMagenta}${colors.white} ANIMATION ${colors.reset}`,
      `${colors.underscore}${name}${colors.reset} triggered`
    ),
    
    // Логирование скролла
    scroll: (direction) => console.log(
      `${colors.bgYellow}${colors.black} SCROLL ${colors.reset}`,
      `Direction: ${colors.bright}${direction}${colors.reset}`
    )
  };
  
  // Экспорт для использования в других файлах
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = log;
  } else {
    window.log = log;
  }
  
  // Автоматическое логирование основных событий из вашего кода
  document.addEventListener('DOMContentLoaded', () => {
    log.success('DOM fully loaded and parsed');
    
    // Перехват событий курсора
    const originalCursorMove = document.addEventListener('mousemove', (e) => {
      log.cursor(e.clientX, e.clientY);
    }, { once: true });
    
    // Логирование IntersectionObserver
    const originalObserver = IntersectionObserver.prototype.observe;
    IntersectionObserver.prototype.observe = function(target) {
      log.event('Element observed', target);
      originalObserver.call(this, target);
    };
  });
  
  // Пример использования:
  // log.info('This is an info message');
  // log.success('Operation completed!');
  // log.warning('This is a warning');
  // log.error('Something went wrong!');
  // log.debug('Debugging information');