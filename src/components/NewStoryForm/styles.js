import styled from 'styled-components'
import { purple, white, lightgray, mediumgray, gray } from '../../components/common/util/colors'

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

export const ViewCenter = styled.View`
    margin-top: 10px;
    align-items: center;
`

export const ViewBottom = styled.View`
    margin-top: 10px;
    padding: 0px 10px 0px 10px;
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

export const TouchRow = styled.TouchableOpacity`
    flex-direction: row;
`

export const ViewSlider = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TxtSlider = styled.Text`
    font-size: 14;
    color: ${props => `${props.color}`};
    margin-bottom: 10px;
    margin-top: 6px;
    margin-right: 10px;
`

export const BarSlider = styled.View`
    height: 12px;
    width: 35px;
    background-color: ${mediumgray};
    border-radius: 15px;
`

export const ThumbSlider = styled.View`
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background-color: ${props => `${props.thumbColor}`};
    position: absolute;
    left: ${props => props.thumbValue === 0 ? -4 : 15};
`