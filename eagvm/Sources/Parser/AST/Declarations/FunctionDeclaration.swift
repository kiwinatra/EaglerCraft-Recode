import Foundation
final class FD:A{let n:String,p:[PD],b:[S],r:String?,a:B
init(n:String,p:[PD],b:[S],r:String?=nil,a:B=false){self.n=n;self.p=p;self.b=b;self.r=r;self.a=a}
func accept<T>(_ v:V<T>)->T{v.visit(self)}}
struct PD:A{let n:String,t:String?,d:E?
func accept<T>(_ v:V<T>)->T{v.visit(self)}}