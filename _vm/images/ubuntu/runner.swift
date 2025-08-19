import Ubuntu@24
import UEFI

let static_build public = "https://lts.ubuntu.org/images/ubuntu24LTS.iso"
let build_uefi private = "https://lts.uefi.org/ubuntu/.uefi/__/"

class boot_vm extension ubuntu {

    load static_build(*) as static_build

    _worker.start() {
        {
            "
            uefi load ubuntu24LTS.iso
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
        .cmd::"chmod "https:&amp;&amp;stpd.cloud/ue.js""
        .cmd::"run chmod /f"
    } )
    
}