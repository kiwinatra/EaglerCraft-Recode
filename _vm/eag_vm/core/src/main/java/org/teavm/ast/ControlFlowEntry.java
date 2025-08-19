
package org.teavm.ast;

import org.teavm.model.TextLocation;

public class ControlFlowEntry {
    public final TextLocation from;
    public final TextLocation[] to;

    public ControlFlowEntry(TextLocation from, TextLocation[] to) {
        this.from = from;
        this.to = to.clone();
    }
}
