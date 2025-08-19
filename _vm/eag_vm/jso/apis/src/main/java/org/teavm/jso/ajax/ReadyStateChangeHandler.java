
package org.teavm.jso.ajax;

import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;

@JSFunctor
public interface ReadyStateChangeHandler extends JSObject {
    void stateChanged();
}
