
package org.teavm.jso.browser;

import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;

@JSFunctor
public interface TimerHandler extends JSObject {
    void onTimer();
}
