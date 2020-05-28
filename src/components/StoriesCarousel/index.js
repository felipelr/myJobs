import React, { useState, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import ProgressBarMyJobs from '../ProgressBarMyJobs'

import { purple } from '../common/util/colors'

import {
    ViewContainer,
    ViewContainerAbsolute,
    ImageItem,
    TextItem,
    ViewInfo,
    TextInfo,
} from './styles'

function StoriesCarousel(props) {
    const [imageUri, setImagesUri] = useState(props.ownProps.firstItem.photo.uri)
    const [text, setText] = useState(props.ownProps.firstItem.description)
    const [professional] = useState(props.professional)
    const [progressValue, setProgressValue] = useState(10)
    const [movePresentation, setMovePresentation] = useState('')

    const moveRef = useRef()
    const presentationRef = useRef()
    const pageRef = useRef()
    const startTimeStampRef = useRef()
    const stopPresentationRef = useRef()
    const finishPresentationRef = useRef()

    useEffect(() => {
        const newArray = props.storiesMyJobs.concat(props.storiesInstagram)
        const arrayOrdered = newArray.sort((a, b) => a.created.getTime() > b.created.getTime() ? -1 : a.created.getTime() < b.created.getTime() ? 1 : 0)

        console.log('arrayOrdered => ', JSON.stringify(arrayOrdered))

        playPresentation(arrayOrdered)

        return () => {
            if (presentationRef.current)
                clearInterval(presentationRef.current)

            if (pageRef.current)
                clearInterval(pageRef.current)
        }
    }, [])

    useEffect(() => {
        moveRef.current = movePresentation
    }, [movePresentation])

    useEffect(() => {
        finishPresentationRef.current = props.finishPresentarion
        console.log('finishPresentarion => ', props.finishPresentarion)
    }, [props.finishPresentarion])

    const playPresentation = (arrayCarousel) => {
        let time = 0
        let percTime = 0
        let pos = 0
        const firstIndex = arrayCarousel.indexOf(props.ownProps.firstItem)

        if (firstIndex !== 0)
            pos = firstIndex

        const size = arrayCarousel.length

        console.log('playPresentation => size: ', size, 'pos: ', pos)

        if (pos < size) {
            const firstItem = arrayCarousel[pos]
            setImagesUri(firstItem.photo)
            setText(firstItem.description)
        }

        presentationRef.current = setInterval(() => {
            if (pos >= size || finishPresentationRef.current) {
                console.log('finishPresentation => pos: ', pos, ' size: ', size)
                clearInterval(presentationRef.current)
                clearInterval(pageRef.current)

                props.onFinishPresentation()
            }

            if (pos < size) {
                if (time === 0) {
                    time = 1
                    pageRef.current = setInterval(() => {
                        if (moveRef.current === 'LEFT') {
                            setMovePresentation('')
                            time = 0
                            percTime = 0
                            pos--

                            if (pos < 0)
                                pos = 0

                            setProgressValue(percTime)

                            if (pos < size) {
                                const item = arrayCarousel[pos]
                                setImagesUri(item.photo)
                                setText(item.description)
                            }
                            clearInterval(pageRef.current)
                            return
                        }

                        if (moveRef.current === 'RIGHT') {
                            setMovePresentation('')
                            time = 0
                            percTime = 0
                            pos++
                            setProgressValue(percTime)

                            if (pos < size) {
                                const item = arrayCarousel[pos]
                                setImagesUri(item.photo)
                                setText(item.description)
                            }
                            clearInterval(pageRef.current)
                            return
                        }

                        if (time >= 5000) {
                            time = 0
                            percTime = 0
                            pos++
                            setProgressValue(percTime)

                            if (pos < size) {
                                const item = arrayCarousel[pos]
                                setImagesUri(item.photo)
                                setText(item.description)
                            }
                            clearInterval(pageRef.current)
                        }
                        else {
                            if (stopPresentationRef.current != 1) {
                                time += 500
                                percTime = (time * 100) / 5000
                                setProgressValue(percTime)
                            }
                        }
                    }, 500)
                }
            }
        }, 500)
    }

    const onStartPress = (evt) => {
        stopPresentationRef.current = 1
        startTimeStampRef.current = evt.timeStamp
        return true
    }

    const onEndPress = (evt) => {
        console.log('onEndPress => STOP')
        stopPresentationRef.current = 0
        const duration = evt.timeStamp - startTimeStampRef.current
        if (duration < 250) {
            const screenWidth = Math.round(Dimensions.get('window').width)
            const positionX = Math.round(evt.nativeEvent.locationX)
            if (positionX < screenWidth / 2) {
                setMovePresentation('LEFT')
            }
            else {
                setMovePresentation('RIGHT')
            }
        }
    }

    return (
        <ViewContainer onStartShouldSetResponder={(evt) => onStartPress(evt)} onResponderRelease={(evt) => onEndPress(evt)}>
            <ViewContainerAbsolute>
                <ProgressBarMyJobs percentage={progressValue} color={purple} />
            </ViewContainerAbsolute>
            <ViewContainer>
                <ViewInfo>
                    <Avatar
                        containerStyle={{ alignSelf: 'center' }}
                        size={50}
                        source={{ uri: professional.photo, }}
                        rounded={true}
                    />
                    <TextInfo>{professional.name}</TextInfo>
                </ViewInfo>
                {imageUri !== '' &&
                    <ImageItem
                        source={{ uri: imageUri }}
                        resizeMode='cover' />
                }
                <TextItem>{text}</TextItem>
            </ViewContainer>
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        stories: state.stories,
        ownProps: ownProps,
        finishPresentation: state.stories.finishPresentation,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoriesCarousel)