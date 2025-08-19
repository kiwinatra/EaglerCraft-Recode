
package org.teavm.html4j;

import org.teavm.backend.javascript.spi.VirtualMethodContributor;
import org.teavm.backend.javascript.spi.VirtualMethodContributorContext;
import org.teavm.model.MethodReference;

public class JavaScriptBodyVirtualSupplier implements VirtualMethodContributor {
    private JavaScriptBodyDependency dependency;

    public JavaScriptBodyVirtualSupplier(JavaScriptBodyDependency dependency) {
        this.dependency = dependency;
    }

    @Override
    public boolean isVirtual(VirtualMethodContributorContext context, MethodReference methodRef) {
        return dependency.virtualMethods.contains(methodRef);
    }
}
