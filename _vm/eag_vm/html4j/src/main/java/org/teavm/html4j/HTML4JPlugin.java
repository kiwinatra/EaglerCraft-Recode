
package org.teavm.html4j;

import org.teavm.backend.javascript.TeaVMJavaScriptHost;
import org.teavm.vm.spi.TeaVMHost;
import org.teavm.vm.spi.TeaVMPlugin;

public class HTML4JPlugin implements TeaVMPlugin {
    @Override
    public void install(TeaVMHost host) {
        TeaVMJavaScriptHost jsHost = host.getExtension(TeaVMJavaScriptHost.class);
        if (jsHost == null) {
            return;
        }

        JavaScriptBodyDependency bodyDependency = new JavaScriptBodyDependency();
        host.add(bodyDependency);
        host.add(new JavaScriptBodyTransformer());
        host.add(new JCLHacks());

        jsHost.add(new JavaScriptResourceInterceptor());
        jsHost.add(new JavaScriptObjectEnhancer(bodyDependency));
        jsHost.addVirtualMethods(new JavaScriptBodyVirtualSupplier(bodyDependency));
    }
}
