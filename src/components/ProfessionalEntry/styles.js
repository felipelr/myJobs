import styled from 'styled-components'
import { purple, gray, white, black } from '../../components/common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2, flexGrow: 1 },
    showHorizontalScrollIndicator: false
})``

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
    padding-bottom: 16px;
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

export const ContainerAvatar = styled.View`
    padding-bottom: 10px;
    margin-bottom: 10px;
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

export const ViewImageListItem = styled.TouchableHighlight`
    width: ${widthPercentageToDP('33.33%')};
    height: ${widthPercentageToDP('33.33%')};
`

export const ImageItem = styled.Image`
    flex: 1
`