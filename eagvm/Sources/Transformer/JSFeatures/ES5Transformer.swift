import Foundation

public final class ES5Transformer {
    private var context: ES5TransformationContext
    
    public init(context: ES5TransformationContext = ES5TransformationContext()) {
        self.context = context
    }
    
    public func transform(es6AST: JSASTNode) -> JSASTNode {
        var transformedNode = es6AST
        
        // Применяем трансформации в порядке их важности
        transformedNode = transformClasses(transformedNode)
        transformedNode = transformArrowFunctions(transformedNode)
        transformedNode = transformLetConst(transformedNode)
        transformedNode = transformTemplateLiterals(transformedNode)
        transformedNode = transformDefaultParameters(transformedNode)
        
        return transformedNode
    }
    
    // MARK: - Class Transformation
    
    private func transformClasses(_ node: JSASTNode) -> JSASTNode {
        guard case .classDeclaration(let className, let heritage, let body) = node.type else {
            return transformChildren(node, using: transformClasses)
        }
        
        // Преобразуем класс в функцию-конструктор ES5
        var constructor: JSASTNode?
        var methods = [JSASTNode]()
        var properties = [JSASTNode]()
        
        for child in body.children {
            if case .methodDefinition(kind: .constructor, _, let params, let body) = child.type {
                constructor = child
            } else if case .methodDefinition(_, let methodName, let params, let body) = child.type {
                methods.append(createES5Method(className: className, 
                                             methodName: methodName,
                                             params: params,
                                             body: body))
            } else if case .propertyDefinition(let propName, _) = child.type {
                properties.append(createES5Property(className: className, propName: propName))
            }
        }
        
        let classVarDeclaration = JSASTNode(type: .variableDeclaration(
            kind: .var,
            declarations: [
                .init(
                    id: .identifier(className),
                    init: createConstructorFunction(className: className,
                                                 heritage: heritage,
                                                 constructor: constructor,
                                                 methods: methods,
                                                 properties: properties)
                )
            ]
        ), children: [])
        
        return classVarDeclaration
    }
    
    private func createConstructorFunction(className: String,
                                         heritage: String?,
                                         constructor: JSASTNode?,
                                         methods: [JSASTNode],
                                         properties: [JSASTNode]) -> JSASTNode {
        // Реализация преобразования класса в функцию-конструктор
        // ...
        return JSASTNode(type: .functionExpression, children: [])
    }
    
    // MARK: - Arrow Functions
    
    private func transformArrowFunctions(_ node: JSASTNode) -> JSASTNode {
        guard case .arrowFunctionExpression(let params, let body, let isExpression) = node.type else {
            return transformChildren(node, using: transformArrowFunctions)
        }
        
        let functionType: JSASTNode.NodeType = .functionExpression(
            id: nil,
            params: params,
            body: isExpression ? 
                .init(type: .blockStatement([.init(type: .returnStatement(body))]), children: []) :
                body
        )
        
        return JSASTNode(type: functionType, children: [])
    }
    
    // MARK: - Let/Const to Var
    
    private func transformLetConst(_ node: JSASTNode) -> JSASTNode {
        guard case .variableDeclaration(let kind, let declarations) = node.type,
              kind != .var else {
            return transformChildren(node, using: transformLetConst)
        }
        
        return JSASTNode(
            type: .variableDeclaration(kind: .var, declarations: declarations),
            children: []
        )
    }
    
    // MARK: - Template Literals
    
    private func transformTemplateLiterals(_ node: JSASTNode) -> JSASTNode {
        guard case .templateLiteral(let quasis, let expressions) = node.type else {
            return transformChildren(node, using: transformTemplateLiterals)
        }
        
        // Преобразуем шаблонные строки в конкатенацию
        var concatExpression: JSASTNode?
        
        for (i, quasi) in quasis.enumerated() {
            let stringLiteral = JSASTNode(type: .literal(quasi), children: [])
            
            if i < expressions.count {
                let expr = expressions[i]
                if concatExpression == nil {
                    concatExpression = stringLiteral
                } else {
                    concatExpression = JSASTNode(
                        type: .binaryExpression(
                            operator: "+",
                            left: concatExpression!,
                            right: stringLiteral
                        ),
                        children: []
                    )
                }
                
                concatExpression = JSASTNode(
                    type: .binaryExpression(
                        operator: "+",
                        left: concatExpression!,
                        right: expr
                    ),
                    children: []
                )
            } else if concatExpression == nil {
                concatExpression = stringLiteral
            }
        }
        
        return concatExpression ?? JSASTNode(type: .literal(""), children: [])
    }

    
    private func transformDefaultParameters(_ node: JSASTNode) -> JSASTNode {
        guard case .functionDeclaration(let id, let params, let body) = node.type,
              params.contains(where: { $0.defaultValue != nil }) else {
            return transformChildren(node, using: transformDefaultParameters)
        }
        
        var newBody = body
        let checks = params.compactMap { param -> JSASTNode? in
            guard let defaultValue = param.defaultValue else { return nil }
            
            return JSASTNode(
                type: .ifStatement(
                    test: JSASTNode(
                        type: .binaryExpression(
                            operator: "===",
                            left: JSASTNode(type: .identifier(param.name), children: []),
                            right: JSASTNode(type: .literal("undefined"), children: [])
                        ),
                        children: []
                    ),
                    consequent: JSASTNode(
                        type: .expressionStatement(
                            JSASTNode(
                                type: .assignmentExpression(
                                    operator: "=",
                                    left: JSASTNode(type: .identifier(param.name), children: []),
                                    right: defaultValue
                                ),
                                children: []
                            )
                        ),
                        children: []
                    ),
                    alternate: nil
                ),
                children: []
            )
        }
        
        if !checks.isEmpty {
            newBody.children.insert(contentsOf: checks, at: 0)
        }
        
        return JSASTNode(
            type: .functionDeclaration(
                id: id,
                params: params.map { param in
                    JSParameter(
                        name: param.name,
                        defaultValue: nil
                    )
                },
                body: newBody
            ),
            children: []
        )
    }
    
    // MARK: - Helper Methods
    
    private func transformChildren(_ node: JSASTNode, using transform: (JSASTNode) -> JSASTNode) -> JSASTNode {
        var newNode = node
        newNode.children = node.children.map { transform($0) }
        return newNode
    }
}

public struct ES5TransformationContext {
    public var options: ES5TransformationOptions = .default
    public init() {}
}

public struct ES5TransformationOptions {
    public var transformClasses: Bool = true
    public var transformArrowFunctions: Bool = true
    public var transformLetConst: Bool = true
    public var transformTemplateLiterals: Bool = true
    public var transformDefaultParameters: Bool = true
    
    public static let `default` = ES5TransformationOptions()
}
extension JSASTNode {
    public enum NodeType {
        case classDeclaration(name: String, heritage: String?, body: JSASTNode)
        case methodDefinition(kind: MethodDefinitionKind, name: String, params: [JSParameter], body: JSASTNode)
        case propertyDefinition(name: String, value: JSASTNode?)
        case arrowFunctionExpression(params: [JSParameter], body: JSASTNode, isExpression: Bool)
        case templateLiteral(quasis: [String], expressions: [JSASTNode])
        case functionDeclaration(id: String?, params: [JSParameter], body: JSASTNode)
        case functionExpression(id: String?, params: [JSParameter], body: JSASTNode)
        case variableDeclaration(kind: VariableKind, declarations: [VariableDeclarator])
        case literal(String)
        case identifier(String)
        case binaryExpression(operator: String, left: JSASTNode, right: JSASTNode)
        case ifStatement(test: JSASTNode, consequent: JSASTNode, alternate: JSASTNode?)
        case expressionStatement(JSASTNode)
        case assignmentExpression(operator: String, left: JSASTNode, right: JSASTNode)
        case returnStatement(JSASTNode?)
        case blockStatement([JSASTNode])
    }
    
    public enum MethodDefinitionKind {
        case constructor
        case method
        case get
        case set
    }
    
    public enum VariableKind {
        case var
        case let
        case const
    }
    
    public struct VariableDeclarator {
        public let id: JSASTNode
        public let init: JSASTNode?
    }
}

public struct JSParameter {
    public let name: String
    public let defaultValue: JSASTNode?
}