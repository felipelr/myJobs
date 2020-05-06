import React, { useState, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'

import useGet from '../../services/restServices'
import ActionCreators from '../../store/actionCreators'

import ProgressBarMyJobs from '../ProgressBarMyJobs'

import {
    ViewContainer,
    ViewContainerAbsolute,
    ImageItem,
} from './styles'

function StoriesCarousel(props) {
    const [professionalData] = useState(props.professionalSelected.id ? props.professionalSelected : props.professionalData)
    const [imageUri, setImagesUri] = useState(props.ownProps.firstImage.uri)
    const [firstIndex, setFirstIndex] = useState(props.ownProps.firstImage.index)
    const [progressValue, setProgressValue] = useState(10)
    const [movePresentation, setMovePresentation] = useState('')
    const moveRef = useRef()
    const presentationRef = useRef()
    const pageRef = useRef()

    const getStories = useGet(`/stories/viewSingle/${professionalData.id}.json?limit=5&page=${props.stories.selfPage}`, props.token)

    useEffect(() => {

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
        if (getStories.data && getStories.data.stories) {
            if (getStories.data.stories.length > 0) {
                console.log('playPresentation => fisrt ID ', getStories.data.stories[0].id)
                playPresentation()
            }
            else {
                console.log('No data ')
                props.onFinishPresentation()
            }
        }
    }, [getStories.data])

    const playPresentation = () => {
        let time = 0
        let percTime = 0
        let pos = firstIndex !== 0 ? firstIndex : 0
        const size = getStories.data.stories.length

        setFirstIndex(0)

        if (pos < size) {
            const firstItem = getStories.data.stories[pos]
            setImagesUri(firstItem.photo)
        }

        presentationRef.current = setInterval(() => {
            if (pos >= size) {
                console.log('storiesNextSelfPage')
                props.storiesNextSelfPage()
                clearInterval(presentationRef.current)
                clearInterval(pageRef.current)
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
                                const item = getStories.data.stories[pos]
                                setImagesUri(item.photo)
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
                                const item = getStories.data.stories[pos]
                                setImagesUri(item.photo)
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
                                const item = getStories.data.stories[pos]
                                setImagesUri(item.photo)
                            }
                            clearInterval(pageRef.current)
                        }
                        else {
                            time += 500
                            percTime = (time * 100) / 5000
                            setProgressValue(percTime)
                        }
                    }, 500)
                }
            }
        }, 500)
    }

    const onSingleTap = (evt) => {
        const screenWidth = Math.round(Dimensions.get('window').width)
        const positionX = Math.round(evt.nativeEvent.locationX)
        if (positionX < screenWidth / 2) {
            setMovePresentation('LEFT')
        }
        else {
            setMovePresentation('RIGHT')
        }
    }

    return (
        <ViewContainer onStartShouldSetResponder={(evt) => onSingleTap(evt)}>
            {imageUri !== '' &&
                <ImageItem
                    source={{ uri: imageUri }}
                    resizeMode='cover' />
            }
            <ViewContainerAbsolute>
                <ProgressBarMyJobs percentage={progressValue} />
            </ViewContainerAbsolute>
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        professionalData: state.professional.professional,
        professionalSelected: state.professional.selected,
        stories: state.stories,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storiesNextSelfPage: () => dispatch(ActionCreators.storiesNextSelfPage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoriesCarousel)