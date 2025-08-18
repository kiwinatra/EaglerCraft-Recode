import Foundation

protocol ASTNode {
    var range: Range<String.Index> { get }
    func accept<T>(_ visitor: Visitor<T>) -> T
}

protocol Visitor<T> {
    associatedtype T
    func visit(_ node: FunctionDeclaration) -> T
    func visit(_ node: VariableDeclaration) -> T
    func visit(_ node: BinaryExpression) -> T
    func visit(_ node: UnaryExpression) -> T
    func visit(_ node: LiteralExpression) -> T
    func visit(_ node: BlockStatement) -> T
    func visit(_ node: IfStatement) -> T
    func visit(_ node: ForStatement) -> T
}


import Foundation

struct TeaVM {
    static var wasmHandler = WasmHandler()
    
    struct WasmHandler {
        var modules: [String: Any] = [:]
        
        mutating func registerModule(_ name: String, _ module: Any) {
            modules[name] = module
        }
        
        func instantiate(_ name: String, _ url: String, _ imports: [String: Any]) -> Promise<WasmInstance> {
            return Promise<WasmInstance> { resolve, reject in
                let url = URL(string: url)!
                let task = URLSession.shared.dataTask(with: url) { data, response, error in
                    if let error = error {
                        reject(NSError(domain: "Network error", code: 0, userInfo: [NSLocalizedDescriptionKey: error.localizedDescription]))
                        return
                    }
                    
                    guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200, let data = data else {
                        reject(NSError(domain: "WASM load failed", code: 0, userInfo: nil))
                        return
                    }
                    
                    let env = self.getDefaultEnv(imports: imports)
                    WebAssembly.instantiate(data, env).then { instance in
                        resolve(instance)
                    }.catch { error in
                        reject(error)
                    }
                }
                task.resume()
            }
        }
        
        func getDefaultEnv(imports: [String: Any]) -> [String: Any] {
            return [
                "memory": WebAssembly.Memory(initial: 256),
                "table": WebAssembly.Table(initial: 256, element: "anyfunc"),
                "abort": { (message: String) in
                    fatalError("Abort: \(message)")
                }
            ].merging(imports) { (_, new) in new }
        }
    }
}
