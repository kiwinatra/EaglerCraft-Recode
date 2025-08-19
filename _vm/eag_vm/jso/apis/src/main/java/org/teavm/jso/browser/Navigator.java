
package org.teavm.jso.browser;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSClass;
import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;
import org.teavm.jso.gamepad.Gamepad;
import org.teavm.jso.geolocation.Geolocation;

@JSClass(name = "navigator")
public final class Navigator implements JSObject {
    private Navigator() {
    }

    @JSProperty("onLine")
    public static native boolean isOnline();

    @JSProperty
    public static native Geolocation getGeolocation();

    @JSBody(script = "return (\"geolocation\" in navigator);")
    public static native boolean isGeolocationAvailable();

    @JSProperty
    public static native String getLanguage();

    @JSProperty
    public static native String[] getLanguages();
    
    public static native Gamepad[] getGamepads();

    @JSBody(script = "return navigator.hardwareConcurrency")
    public static native int hardwareConcurrency();

    public static native boolean sendBeacon(String url);

    public static native boolean sendBeacon(String url, String data);

    public static native boolean sendBeacon(String url, JSObject data);
}
