
package org.teavm.browserrunner;

import java.util.Collection;

public class BrowserCleanupDescriptor {
    private final String testPath;
    private final boolean module;
    private final Collection<String> additionalFiles;

    public BrowserCleanupDescriptor(String testPath, boolean module, Collection<String> additionalFiles) {
        this.testPath = testPath;
        this.module = module;
        this.additionalFiles = additionalFiles;
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
}
