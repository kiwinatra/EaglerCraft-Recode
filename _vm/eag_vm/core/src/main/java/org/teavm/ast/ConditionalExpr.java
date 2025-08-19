
package org.teavm.ast;

import java.util.Map;

public class ConditionalExpr extends Expr {
    private Expr condition;
    private Expr consequent;
    private Expr alternative;

    public Expr getCondition() {
        return condition;
    }

    public void setCondition(Expr condition) {
        this.condition = condition;
    }

    public Expr getConsequent() {
        return consequent;
    }

    public void setConsequent(Expr consequent) {
        this.consequent = consequent;
    }

    public Expr getAlternative() {
        return alternative;
    }

    public void setAlternative(Expr alternative) {
        this.alternative = alternative;
    }

    @Override
    public void acceptVisitor(ExprVisitor visitor) {
        visitor.visit(this);
    }

    @Override
    protected Expr clone(Map<Expr, Expr> cache) {
        Expr known = cache.get(this);
        if (known != null) {
            return known;
        }
        ConditionalExpr copy = new ConditionalExpr();
        cache.put(this, copy);
        copy.setCondition(condition != null ? condition.clone(cache) : null);
        copy.setConsequent(consequent != null ? consequent.clone(cache) : null);
        copy.setAlternative(alternative != null ? alternative.clone(cache) : null);
        return copy;
    }
}
