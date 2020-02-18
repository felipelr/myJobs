import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Animated, Dimensions } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'
import useGet from '../../services/restServices'

import {
    ScrollViewContainer,
    ViewContainer,
    TxtTitle,
} from './styles'

import { lightgray, purple, white, black } from '../common/util/colors'

import HeaderJobs from '../../components/HeaderJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import TextInputJobs from '../../components/TextInputJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

function SuggestService(props) {
    const [invalidField, setInvalidField] = useState('')
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [showForm, setShowForm] = useState(true)
    const [form, setForm] = useState({
        professional_id: props.professionalData.id,
        subcategory_id: 0,
        title: '',
        description: '',
    })
    const [newRequest, setNewRequest] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [categoriesForm, setCategoriesForm] = useState([])
    const [subcategoriesForm, setSubcategoriesForm] = useState([])

    const getCategories = useGet('/categories/all.json', props.token)
    const getSubcategories = useGet('', props.token)

    useEffect(() => {
        props.ownProps.changeVisiblityPerfilHeader(false)

        return () => {
            props.ownProps.changeVisiblityPerfilHeader(true)
        }
    }, [])

    useEffect(() => {
        if (getCategories.data) {
            if (getCategories.data.categories) {
                setCategoriesForm(getCategories.data.categories.map(item => {
                    return {
                        id: item.id,
                        name: item.description
                    }
                }))
            }
            else {
                setCategoriesForm([])
            }
        }
    }, [getCategories.data])

    useEffect(() => {
        if (getSubcategories.data) {
            if (getSubcategories.data.subcategories) {
                setSubcategoriesForm(getSubcategories.data.subcategories.map(item => {
                    return {
                        id: item.id,
                        name: item.description
                    }
                }))
                setForm({ ...form, subcategory_id: getSubcategories.data.subcategories[0].id })
            }
            else {
                setSubcategoriesForm([])
                setForm({ ...form, subcategory_id: 0 })
            }
        }
    }, [getSubcategories.data])

    useEffect(() => {
        if (selectedCategory > 0) {
            getSubcategories.refetch(`/subcategories/category/${selectedCategory}.json`)
        }
    }, [selectedCategory])

    useEffect(() => {
        if (newRequest && !props.loading) {
            if (props.error)
                setNewRequest(false)
            else {
                handleClickBack()
            }
        }
    }, [props.loading])

    const handleClickBack = () => {
        if (showForm) {
            props.onUpdate()
        }
        else {
            setShowForm(true)
            outAnimation()
        }
    }

    const handleConfirmPress = () => {
        if (invalidField === '') {
            setNewRequest(true)
            props.serviceNewSuggestion(props.token, form)
        }
    }

    const inAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: (Dimensions.get('screen').width * -1), y: 0 },
            delay: 0
        }).start()
    }

    const outAnimation = () => {
        Animated.spring(slideLeft, {
            toValue: { x: Dimensions.get('screen').width, y: 0 },
            delay: 0
        }).start()

        Animated.spring(slideRight, {
            toValue: { x: 0, y: 0 },
            delay: 0
        }).start()
    }

    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    const validateField = (field, value) => {
        switch (field) {
            case 'title':
            case 'description':
                if (value < 2)
                    return false
                break
            default:
                break
        }
        return true
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title='Sugerir Serviços'
                back={handleClickBack}
                confirm={handleConfirmPress}
            />
            <ViewContainer>
                <ScrollViewContainer>
                    <View style={{ flex: 1 }}>
                        {showForm &&
                            <Animated.View style={slideRight.getLayout()}>
                                {props.loading && <Loading size='large' color={purple} height='330' error={props.errorUpdating} />}

                                {!props.loading &&
                                    <React.Fragment>
                                        <TxtTitle>Categoria</TxtTitle>
                                        <PickerJobs
                                            selectedValue={selectedCategory}
                                            onValueChange={(item, index) => {
                                                if (item) {
                                                    setSelectedCategory(item)
                                                }
                                            }}
                                            itemsList={categoriesForm ? categoriesForm : []} />

                                        <TxtTitle>Subcategoria</TxtTitle>
                                        <PickerJobs
                                            selectedValue={form.subcategory_id}
                                            onValueChange={(item, index) => {
                                                if (item) {
                                                    setForm({ ...form, subcategory_id: item })
                                                }
                                            }}
                                            itemsList={subcategoriesForm ? subcategoriesForm : []} />

                                        <TextInputJobs
                                            name='title'
                                            onChangeText={handleOnChange}
                                            placeholder='Título'
                                            invalidValue={invalidField === 'title'} />

                                        <TextInputJobs
                                            name='description'
                                            onChangeText={handleOnChange}
                                            placeholder='Descrição'
                                            invalidValue={invalidField === 'description'} />
                                    </React.Fragment>}
                            </Animated.View>
                        }
                        {!showForm &&
                            <Animated.View style={slideLeft.getLayout()}>

                            </Animated.View>
                        }
                    </View>
                </ScrollViewContainer>
            </ViewContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        userType: state.auth.userType,
        loading: state.service.loading,
        error: state.service.error,
        errorMessage: state.service.errorMessage,
        professionalData: state.professional.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        serviceNewSuggestion: (token, suggestion) => dispatch(ActionCreators.serviceNewSuggestion(token, suggestion)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestService)