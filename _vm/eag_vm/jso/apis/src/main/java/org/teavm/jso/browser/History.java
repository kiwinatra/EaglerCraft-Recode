
package org.teavm.jso.browser;

import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public interface History extends JSObject {
    @JSProperty
    int getLength();

    @JSProperty
    JSObject getState();

    void back();

    void forward();

    void go(int delta);

    void pushState(JSObject data, String title);

    void pushState(JSObject data, String title, String url);

    void replaceState(JSObject data, String title);

    void replaceState(JSObject data, String title, String url);

    static History current() {
        return Window.current().getHistory();
    }
}
