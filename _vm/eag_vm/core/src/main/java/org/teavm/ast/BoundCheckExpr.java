
package org.teavm.ast;

import java.util.Map;

public class BoundCheckExpr extends Expr {
    private Expr index;
    private Expr array;
    private boolean lower;

    public Expr getIndex() {
        return index;
    }

    public void setIndex(Expr index) {
        this.index = index;
    }

    public Expr getArray() {
        return array;
    }

    public void setArray(Expr array) {
        this.array = array;
    }

    public boolean isLower() {
        return lower;
    }

    public void setLower(boolean lower) {
        this.lower = lower;
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
        BoundCheckExpr copy = new BoundCheckExpr();
        cache.put(this, copy);
        copy.setIndex(index.clone(cache));
        copy.setArray(array != null ? array.clone(cache) : null);
        copy.setLower(lower);
        return copy;
    }
}
