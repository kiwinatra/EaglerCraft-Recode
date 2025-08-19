
package org.teavm.jso.browser;

import org.teavm.jso.JSProperty;

/**
 *
 * @author Junji Takakura
 */
public interface StorageProvider {
    @JSProperty
    Storage getSessionStorage();

    @JSProperty
    Storage getLocalStorage();
}
