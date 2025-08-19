
package org.teavm.ast;

public abstract class IdentifiedStatement extends Statement {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
