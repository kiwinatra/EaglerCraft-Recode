
package org.teavm.ast;

import java.util.ArrayList;
import java.util.List;

public class BlockStatement extends IdentifiedStatement {
    private List<Statement> body = new ArrayList<>();

    public List<Statement> getBody() {
        return body;
    }

    @Override
    public void acceptVisitor(StatementVisitor visitor) {
        visitor.visit(this);
    }
}
