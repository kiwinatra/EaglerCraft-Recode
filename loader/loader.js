class PreferenceManager {
    static #DB_NAME = 'EaglerCraftPrefs';
    static #DB_VERSION = 1;
    static #STORE_NAME = 'preferences';
    static #PREF_KEY = 'skipVersionSelect';
    static getPrefKey() {
    return this.#PREF_KEY;
}
    
    static #ALLOWED_TARGETS = {
        full: 'wasm/index.html',
        lite: 'm/index.html',
        servers: 'servers/index.html'
    };
    
    static #db = null;
    
    static async #openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.#DB_NAME, this.#DB_VERSION);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.#db = request.result;
                resolve(this.#db);
            };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.#STORE_NAME)) {
                    db.createObjectStore(this.#STORE_NAME);
                }
            };
        });
    }
    
    static async #getDatabase() {
        if (!this.#db) {
            await this.#openDatabase();
        }
        return this.#db;
    }
    
    static async get(key) {
        try {
            const db = await this.#getDatabase();
            return new Promise((resolve) => {
                const transaction = db.transaction(this.#STORE_NAME, 'readonly');
                const store = transaction.objectStore(this.#STORE_NAME);
                const request = store.get(key);
                
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve(null);
            });
        } catch (error) {
            console.error('Failed to get preference:', error);
            return null;
        }
    }
    
    static async set(key, value) {
        try {
            const db = await this.#getDatabase();
            return new Promise((resolve) => {
                const transaction = db.transaction(this.#STORE_NAME, 'readwrite');
                const store = transaction.objectStore(this.#STORE_NAME);
                const request = store.put(value, key);
                
                request.onsuccess = () => resolve(true);
                request.onerror = () => resolve(false);
            });
        } catch (error) {
            console.error('Failed to set preference:', error);
            return false;
        }
    }
    
    static async shouldSkipVersionSelect() {
        return await this.get(this.#PREF_KEY);
    }
    
    static async handleAutoRedirect() {
    const shouldSkip = await this.shouldSkipVersionSelect();
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('to');
    
    if (shouldSkip && target) {
        const targetUrl = this.getAllowedTargets()[target] || this.getAllowedTargets().full;
        window.location.href = targetUrl;
    }
}
}

class VersionSelectorUI {
    static init() {
        this.#initCheckbox();
        this.#addEventListeners();
    }
    
    static #initCheckbox() {
        const checkbox = document.getElementById('rememberCheckbox');
        const container = document.getElementById('rememberContainer');
        
        // Восстановление состояния при загрузке
        PreferenceManager.shouldSkipVersionSelect().then(checked => {
            checkbox.classList.toggle('checked', checked);
        });
    }
    
    static #addEventListeners() {
        const checkbox = document.getElementById('rememberCheckbox');
        const container = document.getElementById('rememberContainer');
        
        container.addEventListener('click', async () => {
            const isChecked = checkbox.classList.toggle('checked');
            await PreferenceManager.set(PreferenceManager.getPrefKey(), isChecked);
            
            // Анимация переключения
            if (isChecked) {
                checkbox.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], { duration: 300 });
            }
        });
        
        // Анимация при наведении
        container.addEventListener('mouseenter', () => {
            checkbox.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' }
            ], { duration: 200, fill: 'forwards' });
        });
        
        container.addEventListener('mouseleave', () => {
            checkbox.animate([
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], { duration: 200, fill: 'forwards' });
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await PreferenceManager.handleAutoRedirect();
        VersionSelectorUI.init();
        
        // Плавное появление интерфейса
        document.body.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], { duration: 500, fill: 'forwards' });
    } catch (error) {
        console.error('Initialization error:', error);
    }
});