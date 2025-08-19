
package org.teavm.jso.ajax;

import org.teavm.jso.JSClass;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.html.HTMLFormElement;
import org.teavm.jso.file.Blob;

@JSClass
public class FormData implements JSObject {
    public FormData() {
    }

    public FormData(HTMLFormElement form) {
    }

    public FormData(HTMLFormElement form, HTMLElement submitter) {
    }

    public native void append(String name, String value);

    public native void append(String name, Blob value);

    public native void append(String name, String value, String fileName);

    public native void append(String name, Blob value, String fileName);

    public native void delete(String name);

    /**
     * Actual element is either {@link Blob} or {@link org.teavm.jso.core.JSString}
     */
    // TODO: update signature when union types supported in TeaVM
    public native JSObject get(String name);

    /**
     * Actual elements are {@link Blob} or {@link org.teavm.jso.core.JSString}
     */
    // TODO: update signature when union types supported in TeaVM
    public native JSArray<JSObject> getAll(String name);

    public native boolean has(String name);

    public native void set(String name, String value);

    public native void set(String name, Blob value);

    public native void set(String name, String value, String fileName);

    public native void set(String name, Blob value, String fileName);
}
