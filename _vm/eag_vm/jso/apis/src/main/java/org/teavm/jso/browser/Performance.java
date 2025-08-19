
package org.teavm.jso.browser;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSClass;
import org.teavm.jso.JSObject;

@JSClass(name = "performance")
public final class Performance implements JSObject {
    private Performance() {
    }

    public static native double now();

    @JSBody(script = "return typeof(performance) !== 'undefined';")
    public static native boolean isSupported();
}
