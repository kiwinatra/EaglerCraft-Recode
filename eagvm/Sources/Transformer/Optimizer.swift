import Foundation

public final class Optimizer {
    private var context: OptimizationContext
    
    public init(context: OptimizationContext = OptimizationContext()) {
        self.context = context
    }
    
    public func optimize(ast: JSASTNode) -> JSASTNode {
        var optimizedAST = ast
        optimizedAST = applyConstantFolding(optimizedAST)
        optimizedAST = applyDeadCodeElimination(optimizedAST)
        optimizedAST = applyVariableHoisting(optimizedAST)
        return optimizedAST
    }
    
    private func applyConstantFolding(_ node: JSASTNode) -> JSASTNode {
        var newNode = node
        if case .binaryExpression(let op, let lhs, let rhs) = node.type {
            if case .literal(let lhsValue) = lhs.type, case .literal(let rhsValue) = rhs.type {
                if let result = evaluateConstantExpression(op: op, lhs: lhsValue, rhs: rhsValue) {
                    newNode = JSASTNode(type: .literal(value: result), children: [])
                }
            }
        }
        
        var optimizedChildren = [JSASTNode]()
        for child in node.children {
            optimizedChildren.append(applyConstantFolding(child))
        }
        newNode.children = optimizedChildren
        return newNode
    }
    
    private func evaluateConstantExpression(op: BinaryOperator, lhs: String, rhs: String) -> String? {
        guard let lhsNum = Double(lhs), let rhsNum = Double(rhs) else { return nil }
        
        switch op {
        case .plus: return String(lhsNum + rhsNum)
        case .minus: return String(lhsNum - rhsNum)
        case .multiply: return String(lhsNum * rhsNum)
        case .divide: return rhsNum != 0 ? String(lhsNum / rhsNum) : nil
        default: return nil
        }
    }
    
    private func applyDeadCodeElimination(_ node: JSASTNode) -> JSASTNode {
        var newNode = node
        if case .ifStatement(let condition, _, _) = node.type {
            if case .literal(let value) = condition.type {
                if value == "false" {
                    newNode = JSASTNode(type: .emptyStatement, children: [])
                }
            }
        }
        
        var optimizedChildren = [JSASTNode]()
        for child in node.children {
            optimizedChildren.append(applyDeadCodeElimination(child))
        }
        newNode.children = optimizedChildren
        return newNode
    }
    
    private func applyVariableHoisting(_ node: JSASTNode) -> JSASTNode {
        var declarations = [JSASTNode]()
        var otherNodes = [JSASTNode]()
        
        for child in node.children {
            if case .variableDeclaration = child.type {
                declarations.append(child)
            } else {
                otherNodes.append(applyVariableHoisting(child))
            }
        }
        
        var newNode = node
        newNode.children = declarations + otherNodes
        return newNode
    }
}

public struct OptimizationContext {
    public var options: OptimizationOptions = .default
    public init() {}
}

public struct OptimizationOptions {
    public var enableConstantFolding: Bool = true
    public var enableDeadCodeElimination: Bool = true
    public var enableVariableHoisting: Bool = true
    
    public static let `default` = OptimizationOptions()
}

extension JSASTNode {
    public enum NodeType {
        case binaryExpression(op: BinaryOperator, lhs: JSASTNode, rhs: JSASTNode)
        case ifStatement(condition: JSASTNode, thenBranch: JSASTNode, elseBranch: JSASTNode?)
        case variableDeclaration(name: String, value: JSASTNode?)
        case literal(value: String)
        case emptyStatement
        case unknown
    }
    
    public enum BinaryOperator: String {
        case plus = "+"
        case minus = "-"
        case multiply = "*"
        case divide = "/"
        case equal = "=="
        case notEqual = "!="
    }
}

in INNERHTML_loader = {
    {
        .req_query init(1)

        {
            "<div>
                <h1>
                Wait until we finish.
                    <span>
                    
                    </span>
                </h1>
            </div>"
    }
}
}