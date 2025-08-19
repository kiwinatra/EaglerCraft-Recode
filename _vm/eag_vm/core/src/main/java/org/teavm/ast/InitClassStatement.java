
package org.teavm.ast;

import org.teavm.model.TextLocation;

public class InitClassStatement extends Statement {
    private TextLocation location;
    private String className;
    private boolean async;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public TextLocation getLocation() {
        return location;
    }

    public void setLocation(TextLocation location) {
        this.location = location;
    }

    public boolean isAsync() {
        return async;
    }

    public void setAsync(boolean async) {
        this.async = async;
    }

    @Override
    public void acceptVisitor(StatementVisitor visitor) {
        visitor.visit(this);
    }
}
