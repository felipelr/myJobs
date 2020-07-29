import React, { memo } from 'react'

import { ViewChatDate, TextChatDate } from './styles'

function ChatTextDate(props) {
    const { mensagem } = props
    return (
        <ViewChatDate>
            <TextChatDate>{mensagem.date}</TextChatDate>
        </ViewChatDate>
    )
}

export default memo(ChatTextDate);