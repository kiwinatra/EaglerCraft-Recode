import Foundation;struct L{enum L:Int{case d=0,i,w,e,f};static var l:L=.i,v=false
private static let f:DateFormatter={let f=DateFormatter();f.dateFormat="HH:mm:ss.SSS";return f}()
static func g(_ l:L,_ m:String,_ f:String=#file,_ n:Int=#line){guard l.rawValue>=L.l.rawValue else{return}
let p=v ?"[\(f.string(from:Date()))][\(l)][\(f.split(separator:"/").last ?? ""):\(n)]":"[\(l)]"
print("\(p) \(m)");if l==.f{exit(1)}}
static func d(_ m:@autoclosure()->String){g(.d,m())}
static func i(_ m:String){g(.i,m)}
static func w(_ m:String){g(.w,m)}
static func e(_ m:String){g(.e,m)}
static func f(_ m:String)->Never{g(.f,m);exit(1)}}