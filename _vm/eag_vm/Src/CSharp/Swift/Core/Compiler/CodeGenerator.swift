import Foundation

class JSParser: Parser {
    private var nestingOfFunction: Int = 0

    init(compilerEnv: CompilerEnvirons, errorReporter: ErrorReporter) {
        super.init(compilerEnv: compilerEnv, errorReporter: errorReporter)
    }

    convenience init(compilerEnv: Any) {
        self.init(compilerEnv: compilerEnv as! CompilerEnvirons, errorReporter: ErrorReporter())
    }

    convenience init(compilerEnv: CompilerEnvirons) {
        self.init(compilerEnv: compilerEnv, errorReporter: ErrorReporter())
    }

    func enterFunction() {
        nestingOfFunction += 1
    }

    func exitFunction() {
        nestingOfFunction -= 1
    }

    func parseAsObject(sourceReader: Reader, sourceURI: String, lineno: Int) throws -> Any {
        return try parse(sourceReader: sourceReader, sourceURI: sourceURI, lineno: lineno)
    }
}