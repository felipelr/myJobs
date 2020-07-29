import React, { memo } from 'react'

import {
    ViewChatItem,
    ViewChatText,
    TextMessage,
    TextTime,
    ViewRow
} from './styles'

function ChateItem(props) {
    const { mensagem } = props
    const { userType } = props

    const onPressChatText = (text) => {
        if (text.indexOf("#") === 0) {
            const indexCode = text.indexOf("#") + 1;
            const indexEnd = text.indexOf(" ");
            const callId = text.substring(indexCode, indexEnd);
            props.navigation.navigate('CallsList', {
                previewScreen: 'ProfessionalChat',
                callId: callId,
            })
        }
    }

    return (
        <ViewChatItem justifyContent={mensagem.msg_from === userType ? 'flex-end' : 'flex-start'}>
            <ViewChatText onPress={() => onPressChatText(mensagem.message)} backColor={mensagem.msg_from === userType ? '#D3D4FE' : '#EAEAEA'} >
                {mensagem.msg_from === userType &&
                    <ViewRow>
                        <TextTime marginRight={10} marginLeft={0}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                        <TextMessage decoration={mensagem.message.indexOf("#") === 0 ? 'underline' : 'none'}>
                            {mensagem.message}
                        </TextMessage>
                    </ViewRow>}
                {mensagem.msg_from !== userType &&
                    <ViewRow>
                        <TextMessage decoration={mensagem.message.indexOf("#") === 0 ? 'underline' : 'none'}>
                            {mensagem.message}
                        </TextMessage>
                        <TextTime marginRight={0} marginLeft={10}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                    </ViewRow>}
            </ViewChatText>
        </ViewChatItem>
    )
}

export default memo(ChateItem);