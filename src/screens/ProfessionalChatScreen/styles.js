import styled from 'styled-components'
import { white, purple, lightpurple, black, lightgray } from '../../components/common/util/colors'


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
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2, flexGrow: 1 },
    keyboardShouldPersistTaps: 'always'
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
    margin: 2px;
    width: 100%;
    flex-direction: row;
    justify-content: ${props => `${props.justifyContent}`};
`

export const ViewChatText = styled.View`
    flex-direction: row;
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

export const TextTime = styled.Text`
    font-size: 9px;
    font-weight: bold;
    color: ${black};
    align-self: center;
    margin-left: ${props => `${props.marginLeft}`};
    margin-right: ${props => `${props.marginRight}`};
`

export const ViewLoading = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
`

export const TxtAddressTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${black};    
    align-self: center;
    padding-left: 10px;
`

export const TxtAddress = styled.Text`
    font-size: 12px;
    color: ${black};
    align-self: center;
    padding-left: 10px;
`

export const TouchAddress = styled.TouchableOpacity`
    padding: 20px 0px 20px 0px;
    border-top-color: ${lightgray};
    border-top-width: 1px;
    flex-direction: row;
`

export const ViewTitleAddress = styled.View`
    flex-direction: row;    
    margin-bottom: 15px;
`