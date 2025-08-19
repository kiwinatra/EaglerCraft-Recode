
package org.teavm.ast;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.teavm.model.MethodReference;

public class InvocationExpr extends Expr {
    private MethodReference method;
    private InvocationType type;
    private List<Expr> arguments = new ArrayList<>();

    public MethodReference getMethod() {
        return method;
    }

    public void setMethod(MethodReference method) {
        this.method = method;
    }

    public InvocationType getType() {
        return type;
    }

    public void setType(InvocationType type) {
        this.type = type;
    }

    public List<Expr> getArguments() {
        return arguments;
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
        InvocationExpr copy = new InvocationExpr();
        cache.put(this, copy);
        copy.setMethod(method);
        for (Expr arg : arguments) {
            copy.getArguments().add(arg.clone(cache));
        }
        return copy;
    }
}
