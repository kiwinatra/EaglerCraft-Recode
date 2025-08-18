struct Config {
    static let jsTarget = "ES6"
    static let indent = 2
    static let minify = false
    static let preserveSemantics = true
    static let debugMode = false
    static func validate() -> Bool { return true }
}