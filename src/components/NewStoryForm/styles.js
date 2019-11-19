import styled from 'styled-components'
import { purple, white, lightgray } from '../../components/common/util/colors'

export const ScrollViewContainer = styled.ScrollView.attrs({
    showHorizontalScrollIndicator: false
})``

export const ViewHeader = styled.View`
    justify-content: flex-end;
    padding: 10px;
    background-color: ${purple};
    flex-direction: row;
`

export const ViewTop = styled.View`
    flex-direction: row;
`

export const ViewBottom = styled.View`
    margin-top: 10px;
    align-items: center;
`

export const ViewContainerImage = styled.Image`
    width: 80;
    height: 80;
    border-width: 1;
    border-color: ${lightgray};
    margin: 10px;
`

export const ButtonSend = styled.TouchableOpacity`
    background-color: ${purple};
    padding: 5px;
    justify-content: center;
`

export const TextView = styled.Text`
    color: ${white};
    font-weight: bold;
    font-size: 16;
`