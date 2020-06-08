import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Animated, Dimensions } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'
import useGet from '../../services/restServices'

import {
    ViewContainer,
    ScrollViewContainer,
    ViewContainerCategory,
    ViewTitleCategory,
    TxtCategory,
    TxtTileCategory,
    BtnEditServices,
    TxtEditServices,
    ViewContainerSubcategory,
    TxtTileSubcategory,
    ScrollViewSubcategory,
    TouchTabSubcategory,
    TxtTabSubcategory,
    ViewTabEmpty
} from './styles'

import { lightgray, purple, white, black } from '../common/util/colors'

import HeaderJobs from '../../components/HeaderJobs/index'
import PickerJobs from '../../components/PickerJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'
import ButtonPurple from '../ButtonPurple'

function MyServices(props) {
    const [slideLeft] = useState(new Animated.ValueXY({ x: Dimensions.get('screen').width, y: 0 }))
    const [slideRight] = useState(new Animated.ValueXY())
    const [services, setServices] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [categoriesForm, setCategoriesForm] = useState([])
    const [subcategoriesForm, setSubcategoriesForm] = useState([])
    const [servicesForm, setServicesForm] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({
        professional_id: 0,
        category_id: 0,
        services: []
    })
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const [selectedSubcategory, setSelectedSubcategory] = useState(-1)
    const [newRequest, setNewRequest] = useState(false)

    const getProfessionalServices = useGet(`/professionalServices/services/${props.professionalData.id}.json?type=1`, props.token)
    const getCategories = useGet('', props.token)
    const getSubcategories = useGet('', props.token)
    const getServices = useGet('', props.token)

    useEffect(() => {
        props.ownProps.changeVisiblityPerfilHeader(true)

        return () => {

        }
    }, [])

    useEffect(() => {
        if (getProfessionalServices.data) {
            if (getProfessionalServices.data.professionalServices) {
                const array = getProfessionalServices.data.professionalServices.map(item => {
                    return {
                        ...item.service
                    }
                })
                const arraySubcategories = getProfessionalServices.data.professionalServices.map(item => {
                    return {
                        ...item.service.subcategory
                    }
                })
                const arrayNew = arraySubcategories.filter((item, index) => arraySubcategories.findIndex(item_ => item_.id === item.id) === index);

                setServices(array)
                setSubcategories(arrayNew)
            }
        }
    }, [getProfessionalServices.data])

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
                setSelectedSubcategory(getSubcategories.data.subcategories[0].id)
            }
            else {
                setSubcategoriesForm([])
                setSelectedSubcategory(0)
            }
        }
    }, [getSubcategories.data])

    useEffect(() => {
        if (getServices.data) {
            if (getServices.data.services) {
                setServicesForm(getServices.data.services)
            }
            else {
                setServicesForm([])
            }
        }
    }, [getServices.data])

    useEffect(() => {
        if (selectedCategory > 0) {
            getSubcategories.refetch(`/subcategories/category/${selectedCategory}.json`)
        }
    }, [selectedCategory])

    useEffect(() => {
        if (selectedSubcategory > 0) {
            getServices.refetch(`/services/subcategory/${selectedSubcategory}.json`)
        }
    }, [selectedSubcategory])

    useEffect(() => {
        if (newRequest && !props.loading) {
            if (props.error)
                setNewRequest(false)
            else {
                if (props.newServicesConfig) {
                    const array = props.newServicesConfig.map(item => {
                        return {
                            ...item.service
                        }
                    })
                    const arraySubcategories = props.newServicesConfig.map(item => {
                        return {
                            ...item.service.subcategory
                        }
                    })
                    const arrayNew = arraySubcategories.filter((item, index) => arraySubcategories.findIndex(item_ => item_.id === item.id) === index);

                    setServices(array)
                    setSubcategories(arrayNew)
                }
                handleClickBack()
            }
        }
    }, [props.loading])

    const handleClickBack = () => {
        props.ownProps.changeVisiblityPerfilHeader(true)
        setShowForm(false)
        outAnimation()
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

    const renderIconService = (id) => {
        if (form.services.some(item => item.id === id))
            return <Icon name="check-box" size={30} color={purple} />
        else
            return <Icon name="check-box-outline-blank" size={30} color={purple} />
    }

    const handleEditCategory = () => {
        setForm({
            professional_id: props.professionalData.id,
            category_id: services.length > 0 ? services[0].subcategory.category.id : 0,
            services: services
        })
        setSelectedCategory(services.length > 0 ? services[0].subcategory.category.id : 0)

        props.ownProps.changeVisiblityPerfilHeader(false)
        setShowForm(true)
        inAnimation()
        if (categoriesForm.length == 0)
            getCategories.refetch(`/categories/all.json`)
    }

    const handleClickService = (service) => {
        if (service) {
            if (form.services.some(item => item.id === service.id)) {
                setForm({
                    ...form,
                    services: form.services.filter(item => item.id !== service.id),
                })
            }
            else {
                setForm({
                    ...form,
                    services: [...form.services, service]
                })
            }
        }
    }

    const handleConfirmPress = () => {
        if (selectedCategory > 0) {
            setNewRequest(true)
            setForm({
                ...form,
                professional_id: props.professionalData.id,
                category_id: selectedCategory
            })

            props.professionalConfigCategory(props.token, form)
        }
    }

    return (
        <React.Fragment>
            {showForm &&
                <HeaderJobs
                    title='Configurar Categoria'
                    back={handleClickBack}
                />}
            <ViewContainer>
                <ScrollViewContainer>
                    <View style={{ flex: 1 }}>
                        {!showForm &&
                            <Animated.View style={slideRight.getLayout()}>
                                <ViewContainerCategory>
                                    <ViewTitleCategory>
                                        <TxtCategory>Categoria</TxtCategory>
                                        <TxtTileCategory>
                                            {services.length > 0 ? services[0].subcategory.category.description : 'Não configurado'}
                                        </TxtTileCategory>
                                    </ViewTitleCategory>
                                    <BtnEditServices onPress={() => handleEditCategory()}>
                                        <TxtEditServices>Configurar</TxtEditServices>
                                    </BtnEditServices>
                                </ViewContainerCategory>
                                {subcategories.length > 0 && (
                                    <ViewTitleCategory>
                                        {
                                            subcategories.map(subcategory => (
                                                <React.Fragment key={'sub' + subcategory.id}>
                                                    <TxtCategory>Subcategoria</TxtCategory>
                                                    <ScrollViewSubcategory>
                                                        <TxtTileSubcategory>{subcategory.description}</TxtTileSubcategory>
                                                    </ScrollViewSubcategory>
                                                    <TxtCategory>Serviços</TxtCategory>
                                                    <ViewContainerSubcategory>
                                                        {
                                                            services.filter(item => item.subcategory.id === subcategory.id).map((service) => <TxtTileCategory key={'s' + service.id}>{service.title}</TxtTileCategory>)
                                                        }
                                                    </ViewContainerSubcategory>
                                                </React.Fragment>
                                            ))
                                        }

                                    </ViewTitleCategory>
                                )}
                            </Animated.View>
                        }
                        {showForm &&
                            <Animated.View style={slideLeft.getLayout()}>
                                {props.loading && <Loading size='large' color={purple} height='330' error={props.errorUpdating} />}

                                {!props.loading &&
                                    <React.Fragment>
                                        {props.error && <TextError>{props.errorMessage}</TextError>}
                                        <TxtCategory>Categoria</TxtCategory>
                                        <PickerJobs
                                            selectedValue={selectedCategory}
                                            onValueChange={(item, index) => {
                                                if (item) {
                                                    setSelectedCategory(item)
                                                }
                                            }}
                                            itemsList={categoriesForm ? categoriesForm : []} />

                                        <TxtCategory>Subcategorias</TxtCategory>
                                        <ScrollViewSubcategory>
                                            {(!getSubcategories.loading && subcategoriesForm.length > 0) && subcategoriesForm.map(item =>
                                                <TouchTabSubcategory
                                                    key={'sub' + item.id}
                                                    onPress={() => setSelectedSubcategory(item.id)}
                                                    backgroundColor={item.id === selectedSubcategory ? purple : lightgray} >
                                                    <TxtTabSubcategory
                                                        color={item.id === selectedSubcategory ? white : black} >
                                                        {item.name}
                                                    </TxtTabSubcategory>
                                                </TouchTabSubcategory>)
                                            }
                                            {getSubcategories.loading && <ViewTabEmpty />}
                                        </ScrollViewSubcategory>

                                        <TxtCategory>Serviços</TxtCategory>
                                        <View style={{ flex: 1 }}>
                                            {
                                                !getServices.loading && servicesForm.map(item =>
                                                    <ListItem
                                                        key={'s' + item.id}
                                                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                                        title={item.title}
                                                        rightIcon={renderIconService(item.id)}
                                                        onPress={() => handleClickService(item)}
                                                    />)
                                            }
                                        </View>
                                        <View style={{ width: 170, alignSelf: 'center', marginTop: 20 }}>
                                            <ButtonPurple onPress={handleConfirmPress} icon="check">Confirmar</ButtonPurple>
                                        </View>
                                    </React.Fragment>
                                }
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
        professionalData: state.professional.professional,
        loading: state.professional.loading,
        error: state.professional.error,
        errorMessage: state.professional.errorMessage,
        newServicesConfig: state.professional.newServicesConfig,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalConfigCategory: (token, config) => dispatch(ActionCreators.professionalConfigCategory(token, config)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyServices)