import Foundation
class J{
private var o="",i=0,k="  "
func g(_ n:JSNode)->String{o="";e(n);return o}
private func e(_ n:JSNode?){
guard let n else{return}
switch n{
case let n as JSP:n.b.forEach{e($0)}
case let n as JSF:o+="\(t)function \(n.n)(";l(n.p);o+=") {\n";i+=1;n.b.forEach{e($0)};i-=1;o+="\(t)}\n\n"
case let n as JSV:o+="\(t)\(n.k) \(n.n)";if let v=n.v{o+=" = ";e(v)};o+=";\n"
case let n as JSE:o+=t;e(n.e);o+=";\n"
case let n as JSC:e(n.c);o+="(";l(n.a);o+=")"
case let n as JSI:o+=n.n
case let n as JSL:o+=n.r
case let n as JSR:o+="\(t)return";if let a=n.a{o+=" ";e(a)};o+=";\n"
default:o+="/* ? */"}}
private func l(_ n:[JSNode]){
for(i,n)in n.enumerated(){e(n);if i<n.count-1{o+=", "}}}
private var t:String{String(repeating:k,count:i)}}