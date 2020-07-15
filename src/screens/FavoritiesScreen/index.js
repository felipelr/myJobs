import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { BackHandler, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../../components/common/util/colors'

import {
    ScrollViewContainer,
    ContainerLista,
    TitleProfessional,
    InfoProfessional,
} from './styles'

import HeaderJobs from '../../components/HeaderJobs/index'
import Footer from '../../components/Footer/index'
import RatingJobs from '../../components/RatingJobs/index'
import ListItem from '../../components/ListItem/index'

function FavoritiesScreen(props) {
    const [favoriteList, setFavoriteList] = useState([])

    const routeRef = useRef()

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        return () => {
            backHandler.remove()
        }
    }, [])

    useEffect(() => {
        setFavoriteList(props.favorities)
    }, [props.favorities])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    const handleBackPress = async () => {
        if (routeRef.current.params && routeRef.current.params.previewScreen) {
            if (routeRef.current.params.previewScreen === 'ProfessionalView') {
                props.navigation.navigate('CategoriesSearch', {
                    previewScreen: props.route.name,
                })
            }
            else {
                props.navigation.goBack()
            }
        }
        else {
            props.navigation.goBack()
        }

        return true
    }

    const onPressProfessional = (professional) => {
        props.professionalSetProfessionalView(professional);

        props.navigation.navigate('ProfessionalView', {
            previewScreen: props.route.name,
            viewProfile: true,
        });
    }

    return (
        <React.Fragment>
            <HeaderJobs
                title='Favoritos'
                back={handleBackPress} />
            <ScrollViewContainer>
                <ContainerLista>
                    {
                        favoriteList.map((item, i) => (
                            <ListItem
                                key={i}
                                itemOnPress={() => onPressProfessional(item.professional)}
                                leftContent={
                                    <Avatar
                                        containerStyle={{ alignSelf: 'center' }}
                                        size={55}
                                        source={{ uri: item.professional.photo, }}
                                    />
                                }
                                centerContent={
                                    <View style={{ marginLeft: 10 }}>
                                        <TitleProfessional>{item.professional.name}</TitleProfessional>
                                        <InfoProfessional>{item.professional.description}</InfoProfessional>
                                        <RatingJobs avaliacao={item.professional.rating} qtdeAvaliacoes={item.professional.amount_ratings} />
                                    </View>
                                }
                                rightContent={
                                    <Icon
                                        name="chevron-right"
                                        size={30}
                                        color={purple}
                                        style={{ alignSelf: 'center' }}
                                    />
                                }
                            />
                        ))
                    }
                </ContainerLista>
            </ScrollViewContainer>

            <Footer
                type={props.userType}
                selected={'favorite'}
                homeOnPress={() => props.navigation.navigate('CategoriesSearch', {
                    previewScreen: props.route.name,
                })}
                professionalProfileOnPress={() => props.navigation.navigate('ProfessionalHome', {
                    previewScreen: props.route.name,
                })}
                callsOnPress={() => props.navigation.navigate('CallsList', {
                    previewScreen: props.route.name,
                })}
                chatOnPress={() => props.navigation.navigate('ChatList', {
                    previewScreen: props.route.name,
                })}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        userType: state.auth.userType,
        user: state.auth.user,
        token: state.auth.token,
        favorities: state.favorite.favorities,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalSetProfessionalView: (professional) => dispatch(ActionCreators.professionalSetProfessionalView(professional)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritiesScreen)