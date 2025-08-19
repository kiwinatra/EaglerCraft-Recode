
package org.teavm.ast;

import java.util.ArrayList;
import java.util.List;

public class ConditionalStatement extends Statement {
    private Expr condition;
    private List<Statement> consequent = new ArrayList<>();
    private List<Statement> alternative = new ArrayList<>();

    public Expr getCondition() {
        return condition;
    }

    public void setCondition(Expr condition) {
        this.condition = condition;
    }

    public List<Statement> getConsequent() {
        return consequent;
    }

    public List<Statement> getAlternative() {
        return alternative;
    }

    @Override
    public void acceptVisitor(StatementVisitor visitor) {
        visitor.visit(this);
    }
}
