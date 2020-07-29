import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { black } from '../../components/common/util/colors'
const { height, width } = Dimensions.get('window')

/////////
export const ViewChatItem = styled.View`
    margin-top: 1px;
    margin-bottom: 1px;
    width: 100%;
    flex-direction: row;
    justify-content: ${props => `${props.justifyContent}`};
`

export const ViewChatText = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 5px;
    background-color: ${props => `${props.backColor}`};
    margin-bottom: 5px;
    elevation: 1;    
`

export const ViewRow = styled.View`
    flex-direction: row; 
`

export const TextMessage = styled.Text`
    font-size: 12px;
    color: ${black};
    max-width: ${width - 85};
    text-decoration-line: ${props => props.decoration};
`

export const TextTime = styled.Text`
    font-size: 9px;
    font-weight: bold;
    color: ${black};
    align-self: center;
    margin-left: ${props => `${props.marginLeft}`};
    margin-right: ${props => `${props.marginRight}`};
`