module tea.vm.goms32;

import tea.vm.core;
import tea.vm.wasm;

// ээээ ааааа

extern (C) {
    enum WASM_PAGE_SIZE = 65536;
    enum INITIAL_MEMORY = 256 * 1024 * 1024; // 256MB для EaglerCraft
    enum MAX_MEMORY = 2 * 1024 * 1024 * 1024; // 2GB максимум
}


struct GCConfig {
    bool enabled = true;
    size_t initialHeapSize = 16 * 1024 * 1024; // 16MB
    size_t maxHeapSize = INITIAL_MEMORY;
}

export {
    void __wasm_init() {
        teaVM.wasm.initMemory(INITIAL_MEMORY, MAX_MEMORY);
        teaVM.gc.configure(GCConfig());
    }

    int __wasm_alloc(size_t size) {
        return teaVM.gc.alloc(size);
    }
}

extern (JavaScript) {
    void glActiveTexture(uint texture);
    void glBindTexture(uint target, uint texture);
    
}