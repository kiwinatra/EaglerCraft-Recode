
package org.teavm.ast;

public class GotoPartStatement extends Statement {
    private int part;

    public int getPart() {
        return part;
    }

    public void setPart(int part) {
        this.part = part;
    }

    @Override
    public void acceptVisitor(StatementVisitor visitor) {
        visitor.visit(this);
    }
}
