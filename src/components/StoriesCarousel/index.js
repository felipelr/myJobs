import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
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
    const [imageUri, setImagesUri] = useState(props.ownProps.firstImage.uri)
    const [indexClicked, setIndexClicked] = useState(props.ownProps.firstImage.index)
    const [progressValue, setProgressValue] = useState(0)

    const getStories = useGet(`/stories/viewSingle/${props.professionalData.id}.json?limit=5&page=${props.stories.selfPage}`, props.token)

    var time = 0
    var percTime = 0

    useEffect(() => {
        console.log('fisrt')
        /* if (!getStories.loading)
            getStories.refetch(`/stories/viewSingle/${props.professionalData.id}.json?limit=5&page=${props.stories.selfPage}`) */
    }, [props.stories.selfPage])

    useEffect(() => {
        console.log('second')
        if (!getStories.loading && getStories.data && getStories.data.stories) {
            playPresentation()
        }
    }, [getStories.loading])

    playPresentation = () => {
        if (getStories.data.stories.length > 0) {
            const size = getStories.data.stories.length
            let pos = indexClicked !== 0 ? indexClicked : 0
            setIndexClicked(0)

            const presentationInterval = setInterval(() => {
                if (pos >= size) {
                    props.storiesNextSelfPage()
                    clearInterval(presentationInterval)
                }

                if (pos < size) {
                    if (time === 0) {
                        time = 1
                        const pageInterval = setInterval(() => {
                            if (time >= 5000) {
                                time = 0
                                percTime = 0
                                pos++
                                setProgressValue(percTime)

                                if (pos < size) {
                                    const item = getStories.data.stories[pos]
                                    setImagesUri(item.photo)
                                }
                                clearInterval(pageInterval)
                            }
                            else {
                                time += 500
                                percTime = (time * 100) / 5000
                                setProgressValue(percTime)

                                console.log('time => ', time)
                                console.log('percTime => ', percTime)
                                console.log('pos => ', pos)
                                console.log('size => ', size)
                            }
                        }, 500)
                    }
                }
            }, 500)
        }
        else {
            console.log('No data ')
            props.onFinishPresentation()
        }
    }

    return (
        <ViewContainer>
            {imageUri !== '' &&
                <ImageItem
                    source={{ uri: imageUri }}
                    resizeMode='cover' />}

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