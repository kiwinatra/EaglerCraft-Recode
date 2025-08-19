
package org.teavm.ast;

import java.util.Map;
import org.teavm.model.ValueType;

public class CastExpr extends Expr {
    private Expr value;
    private ValueType target;
    private boolean weak;

    public Expr getValue() {
        return value;
    }

    public void setValue(Expr value) {
        this.value = value;
    }

    public ValueType getTarget() {
        return target;
    }

    public void setTarget(ValueType target) {
        this.target = target;
    }

    public boolean isWeak() {
        return weak;
    }

    public void setWeak(boolean weak) {
        this.weak = weak;
    }

    @Override
    public void acceptVisitor(ExprVisitor visitor) {
        visitor.visit(this);
    }

    @Override
    protected Expr clone(Map<Expr, Expr> cache) {
        CastExpr copy = new CastExpr();
        copy.value = value.clone(cache);
        copy.target = target;
        copy.weak = weak;
        return copy;
    }
}
