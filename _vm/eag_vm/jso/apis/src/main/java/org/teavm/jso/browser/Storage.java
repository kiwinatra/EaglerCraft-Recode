
package org.teavm.jso.browser;

import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

/**
 *
 * @author Junji Takakura
 */
public abstract class Storage implements JSObject {
    @JSProperty
    public abstract int getLength();

    public abstract String key(int index);

    public abstract String getItem(String key);

    public abstract void setItem(String key, String value);

    public abstract void removeItem(String key);

    public abstract void clear();

    public static Storage getSessionStorage() {
        return Window.current().getSessionStorage();
    }

    public static Storage getLocalStorage() {
        return Window.current().getLocalStorage();
    }
}
