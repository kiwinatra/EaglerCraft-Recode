// Настройки
const langConfig = {
    defaultLang: 'ru', // язык по умолчанию
    availableLangs: ['ru', 'eng'] // доступные языки
  };
  
  // Загружаем переводы и обновляем страницу
  async function loadLanguage(lang = langConfig.defaultLang) {
    try {
      // Проверяем, доступен ли выбранный язык
      if (!langConfig.availableLangs.includes(lang)) {
        console.warn(`Язык "${lang}" не поддерживается. Используется язык по умолчанию.`);
        lang = langConfig.defaultLang;
      }
  
      // Загружаем языковой файл
      const response = await fetch(`lang/${lang}.txt`);
      if (!response.ok) throw new Error('Языковой файл не найден');
      
      const textData = await response.text();
      const translations = parseTranslations(textData);
      
      // Обновляем текст на странице
      applyTranslations(translations);
      
      // Сохраняем выбранный язык (например, в localStorage)
      localStorage.setItem('userLang', lang);
      console.log(`Язык изменен на: ${lang}`);
      
    } catch (error) {
      console.error('Ошибка загрузки языка:', error);
      // Можно загрузить язык по умолчанию при ошибке
      if (lang !== langConfig.defaultLang) {
        loadLanguage(langConfig.defaultLang);
      }
    }
  }
  
  // Парсим файл с переводами
  function parseTranslations(text) {
    const translations = {};
    const lines = text.split('\n');
    
    lines.forEach(line => {
      if (!line.trim() || line.startsWith('#')) return; // пропускаем пустые строки и комментарии
      
      const match = line.match(/^"(.+?)"\s*-\s*"(.+?)"$/);
      if (match) {
        const [_, key, value] = match;
        translations[key.trim()] = value.trim();
      }
    });
    
    return translations;
  }
  
  // Заменяем плейсхолдеры в HTML
  function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
    
    // Также обрабатываем {ключи} в обычном тексте
    document.body.innerHTML = document.body.innerHTML.replace(
      /\{([^}]+)\}/g, 
      (match, key) => translations[key] || match
    );
  }
  
  // Инициализация
  document.addEventListener('DOMContentLoaded', () => {
    // Пробуем загрузить сохраненный язык, иначе - язык по умолчанию
    const savedLang = localStorage.getItem('userLang');
    loadLanguage(savedLang || langConfig.defaultLang);
    
    // document.getElementById('lang-ru').addEventListener('click', () => loadLanguage('ru'));
    // document.getElementById('lang-eng').addEventListener('click', () => loadLanguage('eng'));
  });