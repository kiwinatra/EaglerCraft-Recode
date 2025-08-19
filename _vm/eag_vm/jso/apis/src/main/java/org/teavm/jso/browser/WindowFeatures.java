
package org.teavm.jso.browser;

public class WindowFeatures {
    StringBuilder sb = new StringBuilder();

    public WindowFeatures() {
    }

    public WindowFeatures left(int left) {
        return add("left=" + left);
    }

    public WindowFeatures top(int top) {
        return add("top=" + top);
    }

    public WindowFeatures width(int width) {
        return add("width=" + width);
    }

    public WindowFeatures height(int height) {
        return add("height=" + height);
    }

    public WindowFeatures menubar() {
        return add("menubar");
    }

    public WindowFeatures toolbar() {
        return add("toolbar");
    }

    public WindowFeatures location() {
        return add("location");
    }

    public WindowFeatures status() {
        return add("status");
    }

    public WindowFeatures resizable() {
        return add("resizable");
    }

    public WindowFeatures scrollbars() {
        return add("scrollbars");
    }

    private WindowFeatures add(String feature) {
        if (sb.length() > 0) {
            sb.append(',');
        }
        sb.append(feature);
        return this;
    }
}
