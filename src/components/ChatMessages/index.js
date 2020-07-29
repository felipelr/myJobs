import React, { useRef, useState } from 'react'

///////ChatMessages
import { ScrollViewContainerMessages } from './styles'

import ChateItem from '../ChaItem'
import ChatTextDate from '../ChatTextDate'

function ChatMessages(props) {
    const [loaded, setLoaded] = useState(true)
    const { messages } = props
    const { userType } = props

    const scrollViewRef = useRef()

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        if (loaded) {
            scrollViewRef.current.scrollTo({ x: 0, y: contentHeight, animated: true })
        }
        else {
            setLoaded(true)
            scrollViewRef.current.scrollTo({ x: 0, y: 5, animated: true })
        }
    }

    const onScrollView = async (event) => {
        if (event.nativeEvent.contentOffset.y == 0) {
            setLoaded(false)
            props.onScroll(event)
        }
    }

    return (
        <React.Fragment>
            <ScrollViewContainerMessages
                ref={(c) => scrollViewRef.current = c}
                onContentSizeChange={handleContentSizeChange}
                onScroll={onScrollView}>
                {
                    messages && messages.map((item, index) => {
                        if (index === 0) {
                            return (
                                <React.Fragment key={index} >
                                    <ChatTextDate mensagem={item} />
                                    <ChateItem navigation={props.navigation} mensagem={item} userType={userType} />
                                </React.Fragment>
                            )
                        }
                        else {
                            const previousItem = messages[index - 1]
                            if (previousItem.date != item.date) {
                                return (
                                    <React.Fragment key={index} >
                                        <ChatTextDate mensagem={item} />
                                        <ChateItem navigation={props.navigation} mensagem={item} userType={userType} />
                                    </React.Fragment>
                                )
                            }
                            else {
                                return <ChateItem navigation={props.navigation} key={index} mensagem={item} userType={userType} />
                            }
                        }
                    })
                }
            </ScrollViewContainerMessages>
        </React.Fragment>
    )
}

export default ChatMessages;