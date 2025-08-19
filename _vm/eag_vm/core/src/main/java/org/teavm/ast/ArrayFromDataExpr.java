
package org.teavm.ast;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.teavm.model.ValueType;

public class ArrayFromDataExpr extends Expr {
    private ValueType type;
    private final List<Expr> data = new ArrayList<>();

    public ValueType getType() {
        return type;
    }

    public void setType(ValueType type) {
        this.type = type;
    }

    public List<Expr> getData() {
        return data;
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
        ArrayFromDataExpr copy = new ArrayFromDataExpr();
        cache.put(this, copy);
        copy.setType(type);
        for (Expr elem : data) {
            copy.data.add(elem.clone(cache));
        }
        return copy;
    }
}
