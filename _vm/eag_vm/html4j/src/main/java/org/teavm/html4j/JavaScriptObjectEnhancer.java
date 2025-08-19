
package org.teavm.html4j;

import java.io.IOException;
import org.teavm.backend.javascript.codegen.SourceWriter;
import org.teavm.backend.javascript.rendering.RenderingManager;
import org.teavm.model.ClassReaderSource;
import org.teavm.model.MethodReference;
import org.teavm.model.ValueType;
import org.teavm.vm.BuildTarget;
import org.teavm.vm.spi.RendererListener;

public class JavaScriptObjectEnhancer implements RendererListener {
    private ClassReaderSource classSource;
    private SourceWriter writer;
    private JavaScriptBodyDependency dependencyListener;

    public JavaScriptObjectEnhancer(JavaScriptBodyDependency dependencyListener) {
        this.dependencyListener = dependencyListener;
    }

    @Override
    public void begin(RenderingManager context, BuildTarget buildTarget) {
        classSource = context.getClassSource();
        writer = context.getWriter();
    }

    @Override
    public void complete() throws IOException {
        for (String className : dependencyListener.getClassesPassedToJavaScript()) {
            if (classSource.isSuperType("java.lang.Enum", className).orElse(false)) {
                MethodReference toStringMethod = new MethodReference(className, "toString",
                        ValueType.parse(String.class));
                writer.appendClass(className).append(".prototype.toString").ws().append("=").ws()
                        .append("function()").ws().append("{").indent().newLine();
                writer.append("return $rt_ustr(").appendMethodBody(toStringMethod).append("(this));").softNewLine();
                writer.outdent().append("};").softNewLine();
            }
        }
    }
}
