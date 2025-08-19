
package org.teavm.ast;

import java.util.Map;

public class BinaryExpr extends Expr {
    private BinaryOperation operation;
    private OperationType type;
    private Expr firstOperand;
    private Expr secondOperand;

    public BinaryOperation getOperation() {
        return operation;
    }

    public void setOperation(BinaryOperation operation) {
        this.operation = operation;
    }

    public Expr getFirstOperand() {
        return firstOperand;
    }

    public void setFirstOperand(Expr firstOperand) {
        this.firstOperand = firstOperand;
    }

    public Expr getSecondOperand() {
        return secondOperand;
    }

    public void setSecondOperand(Expr secondOperand) {
        this.secondOperand = secondOperand;
    }

    public OperationType getType() {
        return type;
    }

    public void setType(OperationType type) {
        this.type = type;
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
        BinaryExpr copy = new BinaryExpr();
        cache.put(this, copy);
        copy.setFirstOperand(firstOperand != null ? firstOperand.clone(cache) : null);
        copy.setSecondOperand(secondOperand != null ? secondOperand.clone(cache) : null);
        copy.setOperation(operation);
        copy.setType(type);
        return copy;
    }
}
