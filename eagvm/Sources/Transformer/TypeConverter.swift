import Foundation

public final class TypeConverter {
    private var context: ConversionContext
    
    public init(context: ConversionContext = ConversionContext()) {
        self.context = context
    }
    
    public func convert(type: JavaType) -> JSType {
        switch type {
        case .int, .short, .byte, .long:
            return .number
        case .float, .double:
            return .number
        case .boolean:
            return .boolean
        case .char:
            return .string
        case .string:
            return .string
        case .object(let name):
            return .custom(name)
        case .array(let elementType):
            return .array(of: convert(type: elementType))
        case .void:
            return .void
        case .unknown:
            return .any
        }
    }
    
    public func convertDefaultValue(type: JavaType) -> String {
        switch type {
        case .int, .short, .byte, .long, .float, .double:
            return "0"
        case .boolean:
            return "false"
        case .char, .string:
            return "''"
        case .array:
            return "[]"
        case .object:
            return "null"
        case .void:
            return ""
        case .unknown:
            return "undefined"
        }
    }
    
    public func convertMethodSignature(name: String, parameters: [JavaParameter], returnType: JavaType) -> JSFunctionSignature {
        let jsParams = parameters.map {
            JSParameter(name: $0.name, type: convert(type: $0.type))
        }
        return JSFunctionSignature(
            name: name,
            parameters: jsParams,
            returnType: convert(type: returnType)
        )
    }
    
    public func needsTypeChecking(from: JavaType, to: JavaType) -> Bool {
        let jsFrom = convert(type: from)
        let jsTo = convert(type: to)
        
        if case .number = jsFrom, case .string = jsTo {
            return true
        }
        
        if case .string = jsFrom, case .number = jsTo {
            return true
        }
        
        return false
    }
}

public struct ConversionContext {
    public var options: ConversionOptions = .default
    public var typeMappings: [String: JSType] = [:]
    
    public init() {}
    
    public mutating func addTypeMapping(javaType: String, jsType: JSType) {
        typeMappings[javaType] = jsType
    }
}

public struct ConversionOptions {
    public var strictTypeChecking: Bool = false
    public var implicitTypeConversion: Bool = true
    
    public static let `default` = ConversionOptions()
}

public enum JavaType {
    case int
    case short
    case byte
    case long
    case float
    case double
    case boolean
    case char
    case string
    case object(name: String)
    case array(of: JavaType)
    case void
    case unknown
}

public enum JSType {
    case number
    case boolean
    case string
    case array(of: JSType)
    case `any`
    case void
    case custom(String)
}

public struct JavaParameter {
    public let name: String
    public let type: JavaType
}

public struct JSFunctionSignature {
    public let name: String
    public let parameters: [JSParameter]
    public let returnType: JSType
}

public struct JSParameter {
    public let name: String
    public let type: JSType
}