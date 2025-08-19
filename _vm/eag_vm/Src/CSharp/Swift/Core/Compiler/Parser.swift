import Foundation

class RuntimeRenderer {
    private var runtimeAstParts: [AstRoot] = []
    private var epilogueAstParts: [AstRoot] = []
    private let removablePartsFinder = RemovablePartsFinder()
    private let classSource: ClassReaderSource
    private let writer: SourceWriter
    private let classInitializerInfo: ClassInitializerInfo
    private var topLevelNames: Set<String> = []

    init(classSource: ClassReaderSource, writer: SourceWriter, classInitializerInfo: ClassInitializerInfo) {
        self.classSource = classSource
        self.writer = writer
        self.classInitializerInfo = classInitializerInfo
    }

    func prepareAstParts(threadLibraryUsed: Bool) {
        runtimeAstParts.append(prepareAstPart(name: "runtime.js"))
        runtimeAstParts.append(prepareAstPart(name: "primitive.js"))
        runtimeAstParts.append(prepareAstPart(name: "numeric.js"))
        runtimeAstParts.append(prepareAstPart(name: "long.js"))
        runtimeAstParts.append(prepareAstPart(name: "array.js"))
        runtimeAstParts.append(prepareAstPart(name: "string.js"))
        runtimeAstParts.append(prepareAstPart(name: "reflection.js"))
        runtimeAstParts.append(prepareAstPart(name: "exception.js"))
        runtimeAstParts.append(prepareAstPart(name: "check.js"))
        runtimeAstParts.append(prepareAstPart(name: "console.js"))
        runtimeAstParts.append(prepareAstPart(name: "metadata.js"))
        runtimeAstParts.append(prepareAstPart(name: threadLibraryUsed ? "thread.js" : "simpleThread.js"))
        epilogueAstParts.append(prepareAstPart(name: "types.js"))
    }

    func renderRuntime() {
        for ast in runtimeAstParts {
            renderRuntimePart(ast: ast)
        }
    }

    func renderEpilogue() {
        for ast in epilogueAstParts {
            renderRuntimePart(ast: ast)
        }
    }

    private func prepareAstPart(name: String) -> AstRoot {
        var ast = parseRuntime(name: name)
        ast.visit(visitor: StringConstantElimination())
        TemplatingAstTransformer(classSource: classSource).visit(ast: ast)
        removablePartsFinder.visit(ast: ast)
        topLevelNames.formUnion(ast.symbolTable.keys)
        return ast
    }

    private func renderRuntimePart(ast: AstRoot) {
        let astWriter = TemplatingAstWriter(writer: writer, classInitializerInfo: classInitializerInfo, true)
        for name in topLevelNames {
            astWriter.declareNameEmitter(name: name) { (w, prec) in
                w.appendFunction(name: name)
            }
        }
        astWriter.print(ast: ast)
    }

    private func parseRuntime(name: String) -> AstRoot {
        let env = CompilerEnvirons()
        env.recoverFromErrors = true
        env.languageVersion = Context.VERSION_1_8
        let factory = JSParser(env: env)

        let loader = RuntimeRenderer.self
        guard let input = loader.getResourceAsStream("org/eag/backend/javascript/\(name)") else {
            fatalError("Resource not found")
        }
        
    }
}