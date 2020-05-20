import React, { useState, useEffect } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share'

import ActionCreators from '../../store/actionCreators'

import { purple, black, mediumgray, gray } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    ViewBottom,
    ViewTop,
    ViewHeader,
    ViewContainerImage,
    ButtonSend,
    TextView,
    ViewSlider,
    TxtSlider,
    BarSlider,
    ThumbSlider,
    TouchRow,
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
    const [instagram, setInstagram] = useState(0)

    useEffect(() => {
        console.log('image_path => ', image.uri)
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

    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })
    }

    const handleClickShare = () => {
        if (instagram == 1) {
            Share.isPackageInstalled('com.instagram.android')
                .then(({ isInstalled }) => {
                    if (isInstalled) {
                        const localImageBase64 = image.base64
                        const localImagePath = `data:image/jpeg;base64,${localImageBase64}`;
                        Share.shareSingle({
                            title: 'Share to',
                            url: localImagePath,
                            social: Share.Social.INSTAGRAM,
                            forceDialog: true,
                        }).then(result => {
                            console.log('Share Instagram => ', result)
                            if (result.message) {
                                setNewRequest(true)
                                props.storiesSaveRequest(props.token, form)
                            }
                        }).catch(err => {
                            console.log('Share Instagram Error => ', err)
                        })
                    }
                    else {
                        Alert.alert(
                            "Atenção",
                            "O aplicativo Instagram não está instalado.",
                            [
                                { text: "OK", onPress: () => props.logoutRequest() }
                            ],
                            { cancelable: false }
                        );
                    }
                })
        }
        else {
            setNewRequest(true)
            props.storiesSaveRequest(props.token, form)
        }
    }

    const hadleUserTypePress = () => {
        if (instagram === 0)
            setInstagram(1)
        else
            setInstagram(0)
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

                    <TouchRow
                        activeOpacity={1}
                        onPress={() => hadleUserTypePress()}>
                        <TxtSlider color={black}>Compartilhar no Instagram</TxtSlider>
                        <ViewSlider>
                            <BarSlider />
                            <ThumbSlider
                                thumbColor={instagram === 0 ? gray : purple}
                                thumbValue={instagram} />
                        </ViewSlider>
                    </TouchRow>
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