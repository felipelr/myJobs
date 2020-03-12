import styled from 'styled-components'
import { white, purple, black, lightgray } from '../common/util/colors'

export const ViewContainer = styled.View`
    flex: 1;
    padding: 8px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})`
`

export const TxtTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
    margin-top: 6px;
`

export const TxtDescription = styled.Text`
    font-size: 14px;
    padding-left: 6px;
`
export const ViewContainerButton = styled.View`
    width: 200px;
    align-self: center;
    margin-top: 32px;
    margin-bottom: 16px;
`

export const ViewContainerOverlay = styled.View`
    flex: 1;
    justify-content: center;
`

export const ViewContainerButtonOverlay = styled.View`
    align-self: center;
    margin-top: 32px;
    margin-bottom: 16px;
    width: 250px;
    flex-direction: row;
    justify-content: space-around;
`

export const TouchButtton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    background-color: ${props => `${props.backColor}`};
    padding: 6px;
    flex: 1;
    border-radius: 2px;
`
export const TxtButtton = styled.Text`
    font-size: 14px;
    color: ${props => `${props.color}`};
    text-align: center;
`

export const TxtOverlay = styled.Text`
    font-size: 16px;
    text-align: center;
    padding: 6px;
`