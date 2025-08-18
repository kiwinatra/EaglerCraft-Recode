import Foundation

final class Tokenizer {
    private let source: String
    private var index: Int = 0
    
    init(_ source: String) {
        self.source = source
    }
    
    func tokenize() throws -> [Token] {
        var tokens = [Token]()
        
        while index < source.count {
            let char = source[index]
            
            switch char {
            case " ", "\n", "\t": 
                index += 1 // Пропускаем пробелы
                
            case "{": 
                tokens.append(.curlyOpen)
                index += 1
                
            case "}": 
                tokens.append(.curlyClose) 
                index += 1
                
            case "(": 
                tokens.append(.parenOpen)
                index += 1
                
            case ")": 
                tokens.append(.parenClose)
                index += 1
                
            case ";": 
                tokens.append(.semicolon)
                index += 1
                
            case ",": 
                tokens.append(.comma)
                index += 1
                
            case "=": 
                tokens.append(.operator("="))
                index += 1
                
            case "+", "-", "*", "/":
                tokens.append(.operator(String(char)))
                index += 1
                
            case "0"..."9": // Числа
                var num = ""
                while index < source.count && source[index].isNumber {
                    num.append(source[index])
                    index += 1
                }
                tokens.append(.number(Int(num)!))
                
            case "a"..."z", "A"..."Z", "_": // Идентификаторы/ключевые слова
                var id = ""
                while index < source.count && (source[index].isLetter || source[index].isNumber || source[index] == "_") {
                    id.append(source[index])
                    index += 1
                }
                
                switch id {
                case "class", "func", "if", "else", "for", "let", "var":
                    tokens.append(.keyword(Keyword(rawValue: id)!))
                default:
                    tokens.append(.identifier(id))
                }
                
            default:
                throw TokenError.illegalCharacter(char)
            }
        }
        
        return tokens
    }
}