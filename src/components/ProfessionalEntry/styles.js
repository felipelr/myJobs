import styled from 'styled-components'
import { purple, gray, black } from '../../components/common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 0, paddingRight: 0, flexGrow: 1 },
    showHorizontalScrollIndicator: false
})``

export const ViewContainerButton = styled.View`
    width: 170px;
    align-self: center;
    padding-bottom: 16px;
`

export const ModalContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`

export const TakePictureButtonContainer = styled.TouchableOpacity`
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

export const CameraButtonContainer = styled.TouchableOpacity`
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
    position: absolute; 
    top: ${heightPercentageToDP('3%')};;
    left: 0;
    width: 100%;
`

export const ImageCapa = styled.Image`
    width: 100%;
    height: 100%;
`

export const ViewCapa = styled.TouchableOpacity`
    width: 100%;
    height: ${heightPercentageToDP('18%')};
    margin-bottom: 20px;
`

export const ViewIcon = styled.View`
    position: absolute; 
    top: ${heightPercentageToDP('3%')};;
    left: 5;
    top: 20;
    width: 40px;
    height: 40px;
    background-color: ${purple};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
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