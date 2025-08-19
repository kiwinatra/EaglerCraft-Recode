
package org.teavm.jso.ajax;

import org.teavm.jso.JSProperty;
import org.teavm.jso.dom.events.Event;

public interface ProgressEvent extends Event {
    @JSProperty
    boolean isLengthComputable();

    @JSProperty
    int getLoaded();

    @JSProperty
    int getTotal();
}
