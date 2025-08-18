
import Foundation;final class LE:A{let v:Any;init(_ v:Any){self.v=v}func accept<T>(_ v:V<T>)->T{v.visit(self)}}