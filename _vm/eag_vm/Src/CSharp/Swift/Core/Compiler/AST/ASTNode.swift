enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}

func canThrowErrors() throws -> String


func cannotThrowErrors() -> String

struct Item {
    var price: Int
    var count: Int
}


class VendingMachine {
    


    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }


        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }


        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }


        coinsDeposited -= item.price


        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem


        print("Dispensing \(name)")
    }
}