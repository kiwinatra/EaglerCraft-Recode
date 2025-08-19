
package org.teavm.html4j;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import net.java.html.js.JavaScriptResource;
import org.apache.commons.io.IOUtils;
import org.teavm.backend.javascript.rendering.RenderingManager;
import org.teavm.model.AnnotationReader;
import org.teavm.model.ClassReader;
import org.teavm.vm.BuildTarget;
import org.teavm.vm.RenderingException;
import org.teavm.vm.spi.AbstractRendererListener;

public class JavaScriptResourceInterceptor extends AbstractRendererListener {
    @Override
    public void begin(RenderingManager manager, BuildTarget buildTarget) throws IOException {
        boolean hasOneResource = false;
        for (String className : manager.getClassSource().getClassNames()) {
            ClassReader cls = manager.getClassSource().get(className);
            AnnotationReader annot = cls.getAnnotations().get(JavaScriptResource.class.getName());
            if (annot == null) {
                continue;
            }
            String path = annot.getValue("value").getString();
            int packageIndex = className.lastIndexOf('.');
            String packageName = packageIndex >= 0 ? className.substring(0, packageIndex) : "";
            String resourceName = packageName.isEmpty() ? path : packageName.replace('.', '/') + "/" + path;
            try (InputStream input = manager.getClassLoader().getResourceAsStream(resourceName)) {
                if (input == null) {
                    throw new RenderingException("Error processing JavaScriptResource annotation on class "
                            + className + ". Resource not found: " + resourceName);
                }
                StringWriter writer = new StringWriter();
                IOUtils.copy(input, writer);
                writer.close();
                manager.getWriter().append("// Resource " + path + " included by " + className).newLine();
                manager.getWriter().append(writer.toString()).newLine().newLine();
            }
            hasOneResource = true;
        }
        if (hasOneResource) {
            manager.getWriter().append("// TeaVM generated classes").newLine();
        }
    }
}
