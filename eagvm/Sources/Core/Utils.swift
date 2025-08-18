import Foundation
struct U {
    // Strings
    static func t(_ s:String)->String{return s.trimmingCharacters(in:.whitespacesAndNewlines)}
    static func l(_ s:String)->[String]{return s.components(separatedBy:.newlines)}
    static func b(_ s:String)->Bool{return t(s).isEmpty}
    
    // Files
    static func r(_ p:String)throws->String{return try String(contentsOfFile:p,encoding:.utf8)}
    static func w(_ p:String,_ c:String)throws{try c.write(toFile:p,atomically:true,encoding:.utf8)}
    
    // Arrays
    static func g<T>(_ a:[T],_ i:Int)->T?{return i>=0&&i<a.count ?a[i]:nil}
    static func u<T:Hashable>(_ a:[T])->[T]{return Array(Set(a))}
    
    // Performance
    static func m(_ b:()->Void)->TimeInterval{let s=Date();b();return Date().timeIntervalSince(s)}
}