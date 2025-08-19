

plugins {
    `java-library`
    `teavm-publish`
}

description = "Set of JavaScript API wrappers for JSO"

configurations {
    val teavm = create("teavm")
    teavm.extendsFrom(compileClasspath.get())
}

dependencies {
    api(project(":jso:core"))
    api(project(":interop:core"))
}

teavmPublish {
    artifactId = "teavm-jso-apis"
}

tasks.withType<Jar> {
    manifest {
        attributes["Automatic-Module-Name"] = "org.teavm.jso.apis"
    }
}
