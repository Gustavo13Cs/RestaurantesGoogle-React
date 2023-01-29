import React,{useEffect} from "react";
import Portal from "./Portal";


import { Overlay, Dialog } from "./styles";

const Modal = ({children, open, onClose }) => {


    // fecha o modal apertando a tecla
    useEffect(() => {
        function onEsc(e) {
            if(e.keyCode == 27) onClose(); // 27 e o numero da tecla do teclado (isso e padrão, e tem em tabelas)
        }
        window.addEventListener('keydown', onEsc);

        return () =>{
            window.removeEventListener('keydown',onEsc);
        }
    },[onClose]);

    if(!open) return null;

    // quando clickar fora do modal, ele fecha com essa function
    function onOverlayClick() {
        onClose();
    }

    function onDiaLogClick(e) {
        e.stopPropagation();
    }
    return (
        <Portal>
         <Overlay onClick={onOverlayClick}>
            <Dialog onClick={onDiaLogClick }>{children}</Dialog>
         </Overlay>
        </Portal>
    );
}

export default Modal;