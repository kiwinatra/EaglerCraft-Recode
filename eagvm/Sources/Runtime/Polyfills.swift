import Foundation

struct Polyfills {
    /// Приведение к Int
    static func int(_ value: Any) -> Int {
        return Int("\(value)") ?? 0
    }
    
    /// Приведение к Double
    static func float(_ value: Any) -> Double {
        return Double("\(value)") ?? 0
    }
    
    /// Приведение к String
    static func string(_ value: Any) -> String {
        return "\(value)"
    }
    
    /// Приведение к Bool
    static func bool(_ value: Any) -> Bool {
        let str = "\(value)".lowercased()
        return str == "true" || str == "1"
    }
    
    /// Доступ к свойствам объекта
    static func access(_ object: Any, _ key: Any) -> Any? {
        return (object as? [String: Any])?[string(key)]
    }
    
    /// Определение типа
    static func type(_ value: Any) -> String {
        switch value {
        case is Int, is Double: return "number"
        case is String: return "string"
        case is Bool: return "boolean"
        default: return "object"
        }
    }
}