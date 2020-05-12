import styled from 'styled-components'
import { purple, gray, lightgray, white, black } from '../../components/common/util/colors'
import { heightPercentageToDP, widthPercentageToDP } from '../../components/common/util/dimensions'
import { StyleSheet } from 'react-native'

export const Capa = styled.Image`
    width: 100%;
    height: ${heightPercentageToDP('20%')};
    position: absolute;
`

export const CapaEmpty = styled.View`
    width: 100%;
    height: ${heightPercentageToDP('20%')};
    background-color: ${lightgray};
    position: absolute;
`

export const VwContainerTitle = styled.View` 
    margin-top: ${heightPercentageToDP('18%')};
    background-color: white;
    border-top-left-radius: 20;
    border-top-right-radius: 20;
    align-items: center;
    justify-content: flex-end;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    padding-left: 5px;
`

export const VwContainerRating = styled.View`
    align-self: flex-start;
    margin-top: 25px;
    margin-left: 5px;
`

export const VwContainerContent = styled.View`
    flex: 3;
    background-color: ${lightgray};
`

export const VwContainerServices = styled.View`
    height: ${heightPercentageToDP('22%')};
    background-color: ${white};
    margin-top: 2;
    padding-top: 5px; 
    padding-bottom: 5px; 
`

export const VwContainerStories = styled.View`
    background-color: ${white};
    margin-top: 2;
    padding-top: 5px; 
    padding-bottom: 5px; 
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
    top: ${heightPercentageToDP('3%')};
`

export const ContentComentarios = styled.View` 
    background-color: ${lightgray};
    margin-top: 2;
    justify-content: flex-end; 
    padding-top: 5px; 
    padding-bottom: 5px; 
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
    background-color: ${white};
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

export const ImageNewStory = styled.Image`
    width: ${widthPercentageToDP('100%')};
    height: ${heightPercentageToDP('100%')};
    position: absolute;
    align-self: center;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: ${white};
`

export const FlipCameraButtonContainer = styled.TouchableOpacity`
    position: absolute;
    background-color: ${black};
    border-radius: 5px;
    bottom: 20;
    right: 20;
    width: 50px;
    height: 50px;
    padding: 2px;
    align-items: center;
    justify-content: center;
`

export const styles = StyleSheet.create({
    elevation: 2
})