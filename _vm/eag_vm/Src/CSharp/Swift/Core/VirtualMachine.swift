import Foundation

class MethodBodyRenderer: MethodNodeVisitor, GeneratorContext {
    private var context: RenderingContext
    private var diagnostics: Diagnostics
    private var minifying: Bool
    private var async: Bool
    private var asyncMethods: Set<MethodReference>
    private var writer: SourceWriter
    private var statementRenderer: StatementRenderer
    private var threadLibraryUsed: Bool

    init(context: RenderingContext, diagnostics: Diagnostics, minifying: Bool,
         asyncMethods: Set<MethodReference>, writer: SourceWriter, variableNameGenerator: VariableNameGenerator) {
        self.context = context
        self.diagnostics = diagnostics
        self.minifying = minifying
        self.asyncMethods = asyncMethods
        self.writer = writer
        self.statementRenderer = StatementRenderer(context: context, writer: writer, variableNameGenerator: variableNameGenerator)
    }

    func setCurrentMethod(node: MethodNode) {
        statementRenderer.setCurrentMethod(node: node)
    }

    func isThreadLibraryUsed() -> Bool {
        return threadLibraryUsed
    }

    func getDependency() -> DependencyInfo {
        return context.getDependencyInfo()
    }

    func renderNative(generator: Generator, async: Bool, reference: MethodReference) {
        threadLibraryUsed = false
        self.async = async
        statementRenderer.setAsync(async: async)
        generator.generate(context: self, writer: writer, reference: reference)
    }

    func render(node: MethodNode, async: Bool) {
        threadLibraryUsed = false
        self.async = async
        statementRenderer.setAsync(async: async)
        prepareVariables(method: node)
        node.acceptVisitor(visitor: self)
        statementRenderer.clear()
    }

    private func prepareVariables(method: MethodNode) {
        for i in 0..<method.getVariables().count {
            writer.emitVariables(names: [method.getVariables()[i].getName()], variableName: statementRenderer.variableName(index: i))
        }
    }

    func renderParameters(reference: MethodReference, modifiers: Set<ElementModifier>) {
        renderParameters(reference: reference, modifiers: modifiers, forceParentheses: false)
    }

    func renderParameters(reference: MethodReference, modifiers: Set<ElementModifier>, forceParentheses: Bool) {
        var startParam = 0
        if modifiers.contains(.static) {
            startParam = 1
        }
        let count = reference.parameterCount() - startParam + 1
        if count != 1 || forceParentheses {
            writer.append("(")
        }
        for i in startParam...reference.parameterCount() {
            if i > startParam {
                writer.append(",").ws()
            }
            writer.append(statementRenderer.variableName(index: i))
        }
        if count != 1 || forceParentheses {
            writer.append(")")
        }
    }

}