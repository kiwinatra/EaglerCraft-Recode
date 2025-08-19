
package org.teavm.ast;

import java.util.Map;
import org.teavm.model.ValueType;

public class InstanceOfExpr extends Expr {
    private ValueType type;
    private Expr expr;

    public ValueType getType() {
        return type;
    }

    public void setType(ValueType type) {
        this.type = type;
    }

    public Expr getExpr() {
        return expr;
    }

    public void setExpr(Expr expr) {
        this.expr = expr;
    }

    @Override
    public void acceptVisitor(ExprVisitor visitor) {
        visitor.visit(this);
    }

    @Override
    protected Expr clone(Map<Expr, Expr> cache) {
        InstanceOfExpr copy = new InstanceOfExpr();
        copy.type = type;
        copy.expr = expr != null ? expr.clone() : null;
        return copy;
    }
}
