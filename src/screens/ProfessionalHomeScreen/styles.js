import styled from 'styled-components'
import { purple, gray, lightgray, white } from '../../components/common/util/colors'
import { heightPercentageToDP, widthPercentageToDP } from '../../components/common/util/dimensions'
import { StyleSheet } from 'react-native'

export const Capa = styled.Image.attrs(props => ({
    source: props.imagem
}))`
    width: 100%;
    height: ${heightPercentageToDP('18%')};
`

export const VwContainerTitle = styled.View` 
    background-color: white;
    border-radius: 10;
    align-items: center;
    justify-content: flex-end;
    margin:0;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: bold;
`

export const VwContainerRating = styled.View`
    flex: 1;
    align-self: flex-start;
    margin-top: 5% ;
`

export const VwContainerContent = styled.View`
    flex: 3;
    background-color: ${lightgray};
`

export const VwContainerServices = styled.View`
    height: ${heightPercentageToDP('22%')};
    background-color: ${white};
    margin-top: 2;
    padding: 5px; 
`

export const VwContainerStories = styled.View`
    background-color: ${white};
    margin-top: 2;
    padding: 5px; 
`

export const VwContainerRatingComentario = styled.View`
    height:${heightPercentageToDP('15%')};
    justify-content:flex-end;
    margin-left:5; 
`

export const ContainerAvatar = styled.View`
    flex: 1;
    position: absolute; 
    right: 0;  
    left: 0;
    align-items: center;
    top: ${heightPercentageToDP('6%')};
`

export const ContentComentarios = styled.View` 
    background-color: ${white};
    margin-top: 2;
    justify-content: flex-end; 
    padding: 5px; 
`

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

export const ModalContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`

export const TakePictureButtonContainer = styled.TouchableHighlight`
    position: absolute;
    align-self: center;
    bottom: 20;
    width: 60px;
    height: 60px;
    background-color: #FFF;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`

export const TakePictureButtonLabel = styled.View`
    width: 52px;
    height: 52px;
    border-radius: 26px;
    background-color: ${purple};
`

export const ModalButtons = styled.View`
    padding: 10px 10px 5px 5px;
    flex-direction: row;
    justify-content: space-between;
`

export const CameraButtonContainer = styled.TouchableHighlight`
    padding: 20px 20px 40px 40px;
`

export const CancelButtonText = styled.Text`
    color: ${gray};
    font-size: 18px;
    font-weight: bold;
`

export const ContinueButtonText = styled.Text`
    color: ${purple};
    font-size: 18px;
    font-weight: bold;
`

export const ViewImageListItem = styled.TouchableHighlight`
    width: ${widthPercentageToDP('33.33%')};
    height: ${widthPercentageToDP('33.33%')};
`

export const ImageItem = styled.Image`
    flex: 1;
`
export const ImageNewStory = styled.Image`
    width: ${widthPercentageToDP('100%')};
    height: ${heightPercentageToDP('100%')};
    position: absolute;
    align-self: center;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
`

export const styles = StyleSheet.create({
    elevation: 2
})