import Foundation
struct S{private var m="",s=[String](),n=[String](),l=(0,0,0,0)
mutating func g(js:String,f:[String],n:[String]=[])->String{
self.s=f;self.n=n;var x=1,y=0
for(i,c)in js.enumerated(){
if c=="\n"{x+=1;y=0;m+=";"}else{
y+=1;if i%10==0{a(x,y,x,y,0,nil)}}}
return """
{"version":3,"sources":\(j(s)),"names":\(j(n)),
"mappings":"\(m)","file":"output.js"}
"""
}
private mutating func a(_ g:Int,_ h:Int,_ o:Int,_ p:Int,_ q:Int?,_ r:Int?){
let v=[String(g-l.0),String(h-l.1),String((q ?? -1)-l.2),
String(o-l.0),String(p-l.1),r != nil ?String(r!-l.3):""].joined(separator:",")
m+=(m.last==";" ?"":",")+v;l=(g,h,q ?? -1,r ?? -1)}
private func j(_ v:Any)->String{
(try? JSONSerialization.data(withJSONObject:v))
.flatMap{String(data:$0,encoding:.utf8)}??"[]"}}