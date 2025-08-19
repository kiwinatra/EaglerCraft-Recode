
package org.teavm.jso.browser;

import org.teavm.jso.JSObject;
import org.teavm.jso.JSProperty;

public interface Location extends JSObject {
    @JSProperty("href")
    String getFullURL();

    @JSProperty("href")
    void setFullURL(String url);

    @JSProperty
    String getProtocol();

    @JSProperty
    void setProtocol(String protocol);

    @JSProperty
    String getHost();

    @JSProperty
    void setHost(String host);

    @JSProperty("hostname")
    String getHostName();

    @JSProperty("hostname")
    void setHostName(String hostName);

    @JSProperty
    String getPort();

    @JSProperty
    void setPort(String port);

    @JSProperty("pathname")
    String getPathName();

    @JSProperty("pathname")
    void setPathName(String pathName);

    @JSProperty
    String getSearch();

    @JSProperty
    void setSearch(String search);

    @JSProperty
    String getHash();

    @JSProperty
    void setHash(String hash);

    void assign(String url);

    void reload();

    void reload(boolean force);

    void replace(String url);

    static Location current() {
        return Window.current().getLocation();
    }
}
