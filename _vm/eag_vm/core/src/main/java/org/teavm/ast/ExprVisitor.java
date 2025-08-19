
package org.teavm.ast;

public interface ExprVisitor {
    void visit(BinaryExpr expr);

    void visit(UnaryExpr expr);

    void visit(ConditionalExpr expr);

    void visit(ConstantExpr expr);

    void visit(VariableExpr expr);

    void visit(SubscriptExpr expr);

    void visit(UnwrapArrayExpr expr);

    void visit(InvocationExpr expr);

    void visit(QualificationExpr expr);

    void visit(NewExpr expr);

    void visit(NewArrayExpr expr);

    void visit(NewMultiArrayExpr expr);

    void visit(ArrayFromDataExpr expr);

    void visit(InstanceOfExpr expr);

    void visit(CastExpr expr);

    void visit(PrimitiveCastExpr expr);

    void visit(BoundCheckExpr expr);
}
