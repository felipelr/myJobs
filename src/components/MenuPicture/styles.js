import styled from 'styled-components'
import {  gray, white } from '../../components/common/util/colors'

export const ViewContainerMenu = styled.View`
    flex-direction: column;
    flex: 1;
    background-color: transparent;
    justify-content: center;
    align-items: center;
`

export const ViewContainerMenuOpacity = styled.View`
    background-color: black;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const ViewContainerButtonsMenu = styled.View`
    flex-direction: column;
    background-color: ${white};
    width: 80%;
    border-radius: 15px;
    padding: 7px;
`

export const ButtonMenu = styled.TouchableHighlight`
    background-color: ${white};
    padding: 16px;
    height: 50px;
`

export const ButtonMenuText = styled.Text`
    color: ${gray};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
`