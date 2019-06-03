import styled from 'styled-components'
import { white, purple } from '../../components/common/util/colors'

export const ViewContainerInfo = styled.View`
    padding: 5px;
    background-color: ${white};
    margin-bottom: 2px;
`

export const TextInfo = styled.Text`
    font-family: 'SF-Pro-Text-Bold';
    font-size: 14px;
    font-weight: bold;
    color: ${purple};
    margin: 2px;
`

export const ViewContainerChat = styled.View`
    flex: 1;
    padding: 5px;
    background-color: ${white};
`

export const ViewContainerNewMessage = styled.View`
    padding: 5px;
    background-color: ${white};
    margin-top: 2px;
    flex-direction: row;
`

export const TouchIcon = styled.TouchableOpacity`
    padding: 5px;
`