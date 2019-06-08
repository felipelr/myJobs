import styled from 'styled-components'
import { white, purple, lightpurple, black } from '../../components/common/util/colors'

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

///////
export const ScrollViewContainerMessages = styled.ScrollView.attrs({
    horizontal: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 }
})`
    flex: 1;
`


/////////////
export const ViewChatDate = styled.View`
    width: 100%;
    padding: 2px;
    justify-content: space-evenly;
    align-items: center;
`

export const TextChatDate = styled.Text`
    border-radius: 2px;
    padding-top: 3px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 3px;
    background-color: ${lightpurple};
    color: ${white};
    font-size: 12px;
    text-align: center;
    elevation: 1;
`

/////////
export const ViewChatItem = styled.View`
    padding: 2px;
    width: 100%;
    flex-direction: row;
    justify-content: ${props => `${props.justifyContent}`};
`

export const ViewChatText = styled.View`
    padding: 8px;
    border-radius: 5px;
    background-color: ${props => `${props.backColor}`};
    margin-left: ${props => `${props.marginLeft}`};
    margin-right: ${props => `${props.marginRight}`};
    margin-bottom: 5px;
    elevation: 1;
`

export const TextMessage = styled.Text`
    font-size: 12px;
    color: ${black};
`