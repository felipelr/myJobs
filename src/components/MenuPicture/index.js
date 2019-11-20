import React from 'react'

import {
    ViewContainerMenu,
    ViewContainerButtonsMenu,
    ButtonMenu,
    ButtonMenuText,
    ViewContainerMenuOpacity,
} from './styles'

function MenuPicture({ onCameraPress, onGaleryPress, onCancelPress }, ...props) {

    return (
        <ViewContainerMenu>
            <ViewContainerMenuOpacity />
            <ViewContainerButtonsMenu>
                <ButtonMenu onPress={onCameraPress}>
                    <ButtonMenuText>Tirar Foto</ButtonMenuText>
                </ButtonMenu>
                <ButtonMenu onPress={onGaleryPress}>
                    <ButtonMenuText>Galeria</ButtonMenuText>
                </ButtonMenu>
                <ButtonMenu onPress={onCancelPress}>
                    <ButtonMenuText>Cancelar</ButtonMenuText>
                </ButtonMenu>
            </ViewContainerButtonsMenu>
        </ViewContainerMenu>
    )
}

export default MenuPicture