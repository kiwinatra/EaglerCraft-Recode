
package org.teavm.browserrunner;

import java.util.Collection;

public class BrowserRunDescriptor {
    private final String name;
    private final String testPath;
    private final boolean module;
    private final Collection<String> additionalFiles;
    private final String argument;
    private final boolean cached;

    public BrowserRunDescriptor(String name, String testPath, boolean module, Collection<String> additionalFiles,
            String argument, boolean cached) {
        this.name = name;
        this.testPath = testPath;
        this.module = module;
        this.additionalFiles = additionalFiles;
        this.argument = argument;
        this.cached = cached;
    }

    public String getName() {
        return name;
    }

    public String getTestPath() {
        return testPath;
    }

    public boolean isModule() {
        return module;
    }

    public Collection<String> getAdditionalFiles() {
        return additionalFiles;
    }

    public String getArgument() {
        return argument;
    }

    public boolean isCached() {
        return cached;
    }
}
