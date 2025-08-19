
package org.teavm.ast;

import java.util.ArrayList;
import java.util.List;
import org.teavm.model.MethodReference;

public class AsyncMethodNode extends MethodNode {
    private List<AsyncMethodPart> body = new ArrayList<>();
    private List<VariableNode> variables = new ArrayList<>();

    public AsyncMethodNode(MethodReference reference) {
        super(reference);
    }

    public List<AsyncMethodPart> getBody() {
        return body;
    }

    @Override
    public List<VariableNode> getVariables() {
        return variables;
    }

    @Override
    public void acceptVisitor(MethodNodeVisitor visitor) {
        visitor.visit(this);
    }

    @Override
    public boolean isAsync() {
        return true;
    }
}
