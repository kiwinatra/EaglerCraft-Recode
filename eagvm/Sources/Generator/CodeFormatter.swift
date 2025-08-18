import Foundation  
struct F{private static let i=" ",m=120  
static func f(_ s:String,_ n:Int=0)->String{var r="",c=0,l=false,o=false,d=0  
for k in s{switch k{case "{":if !l&&!o{r+="{\n"+String(repeating:i,count:c+n);c+=n;d=0}else{r.append(k)}  
case "}":if !l&&!o{c=max(0,c-n);r+="\n"+String(repeating:i,count:c)+"}";d=0}else{r.append(k)}  
case"\"","'":l.toggle();r.append(k)  
case"/":if !l&&s[s.index(after:s.startIndex)]=="*"{o=true};r.append(k)  
case"*":if !l&&o&&s[s.index(after:s.startIndex)]=="/"{o=false};r.append(k)  
case"\n":r.append(k);r+=String(repeating:i,count:c);d=0  
default:if d>=m&&!l&&!o{r+="\n"+String(repeating:i,count:c);d=0};r.append(k);d+=1}}  
return r}}  