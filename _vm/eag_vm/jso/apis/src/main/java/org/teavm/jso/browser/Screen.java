
package org.teavm.jso.browser;

import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public interface Screen extends JSObject {
    @JSProperty
    int getWidth();

    @JSProperty
    int getHeight();

    @JSProperty
    int getAvailWidth();

    @JSProperty
    int getAvailHeight();

    @JSProperty
    int getColorDepth();

    static Screen current() {
        return Window.current().getScreen();
    }
}
