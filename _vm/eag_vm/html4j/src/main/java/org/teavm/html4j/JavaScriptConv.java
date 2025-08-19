
package org.teavm.html4j;

import org.teavm.backend.javascript.spi.GeneratedBy;

public final class JavaScriptConv {
    private JavaScriptConv() {
    }

    @GeneratedBy(JavaScriptConvGenerator.class)
    public static native Object toJavaScript(Object obj);

    @GeneratedBy(JavaScriptConvGenerator.class)
    public static native Object fromJavaScript(Object obj, Object cls);
}
