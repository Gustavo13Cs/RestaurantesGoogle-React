import React from "react";
import Portal from "./Portal";

import { Overlay, Dialog } from "./styles";

const Modal = ({children, open, onClose }) => {

    if(!open) return null;

    // quando clickar fora do modal, ele fecha com essa function
    function onOverlayClick() {
        onClose();
    }

    function onDiaLogClick() {

    }

    return (
        <Portal>
         <Overlay onClick={onOverlayClick}>
            <Dialog>{children}</Dialog>
         </Overlay>
        </Portal>
    );
}

export default Modal;