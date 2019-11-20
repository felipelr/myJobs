import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    ViewBottom,
    ViewTop,
    ViewHeader,
    ViewContainerImage,
    ButtonSend,
    TextView
} from './styles'

import TextInputJobs from '../TextInputJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

const NewStoryForm = ({ image, onSuccess, ...props }) => {
    const [form, setForm] = useState({
        professional_id: props.professionalData.id,
        description: '',
        image: image.base64,
    })
    const [newRequest, setNewRequest] = useState(false)

    useEffect(() => {
        props.storiesClearError()

        ImageResizer.createResizedImage(image.uri, 600, 600, 'JPEG', 100)
            .then(({ uri }) => {
                RNFetchBlob.fs.readFile(uri, 'base64')
                    .then(data => {
                        setForm({
                            ...form,
                            image: data
                        })
                    })
                    .catch(err => {

                    })
            }).catch((err) => {

            })
    }, [])

    useEffect(() => {
        if (newRequest && !props.stories.loading) {
            setNewRequest(false)
            if (!props.stories.error) {
                onSuccess()
            }
        }
    }, [props.stories.loading])

    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })
    }

    handleClickShare = () => {
        setNewRequest(true)
        props.storiesSaveRequest(props.token, form)
    }

    return (
        <ScrollViewContainer>
            <View style={{ flex: 1 }}>
                <ViewHeader>
                    <ButtonSend onPress={handleClickShare}>
                        <TextView>Compartilhar</TextView>
                    </ButtonSend>
                </ViewHeader>
                <ViewTop>
                    <ViewContainerImage
                        source={{ uri: image.uri }}
                        resizeMode='center' />

                    <TextInputJobs
                        value={form.description}
                        name='description'
                        onChangeText={handleOnChange}
                        placeholder='Descrição'
                        multiline={true}
                        numberOfLines={3}
                        style={{ textAlignVertical: true, flex: 1 }} />
                </ViewTop>
                <ViewBottom>
                    {props.stories.loading && <Loading size='large' color={purple} height='330' error={props.stories.error} />}

                    {props.stories.error && <TextError>{props.stories.errorMessage}</TextError>}
                </ViewBottom>
            </View>
        </ScrollViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        stories: state.stories,
        professionalData: state.professional.professional,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storiesSaveRequest: (token, story) => dispatch(ActionCreators.storiesSaveRequest(token, story)),
        storiesClearError: () => dispatch(ActionCreators.storiesClearError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewStoryForm)