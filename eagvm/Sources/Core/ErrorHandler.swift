import Foundation
enum E:Error,CustomStringConvertible{
    case s(Int,String),t(String,String),u(String),o(String,[String]),i(String)
    var description:String{
        switch self{
        case .s(let l,let m):return "[S]L\(l):\(m)"
        case .t(let e,let a):return "[T]Need \(e),got \(a)"
        case .u(let n):return "[R]Undef:\(n)"
        case .o(let o,let t):return "[O]Bad \(o) for \(t.joined())"
        case .i(let r):return "[I]\(r)"}}
struct H{
    static var s=false
    static func h(_ e:E,_ f:Bool=true)->Never?{
        let m="\(e)"
        if f{FileHandle.standardError.write(Data(m.utf8));exit(1)}
        else if !s{FileHandle.standardError.write(Data("W:\(m)".utf8))}
        return nil}}