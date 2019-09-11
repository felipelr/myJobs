import styled from 'styled-components'
import { purple, gray, lightgray } from '../../components/common/util/colors'

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
    border-bottom-color: ${gray};
    border-bottom-width: 0.5;
    padding-bottom: 10px;
    margin-bottom: 10px;
`