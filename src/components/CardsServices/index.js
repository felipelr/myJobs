import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../store/actionCreators'

import {
    VwContainerServices,
    VwContainerCard,
    VwSubTitle,
    VwTitleCard,
    VwEmpty,
    VwEmpty2,
    TextInfo,
} from './styles'

import CardService from '../../components/CardService/index'

function CardsServices(props) {

    useEffect(() => {
        console.log('props.selectedService => ', props)
    }, [])

    return (
        <VwContainerServices>
            {
                !props.loading && props.services.map((item) => (
                    <CardService
                        key={item.id}
                        select={item.id === props.selectedService.id ? true : false}
                        service={item}
                        onPress={() => props.professionalHomeSetSelectedService(item)} />
                ))
            }
            {
                (!props.loading && !props.services.length) && 
                <TextInfo>Não há serviços...</TextInfo>
            }
            {
                props.loading && (
                    <VwContainerCard>
                        <VwTitleCard>
                            <VwEmpty />
                        </VwTitleCard>
                        <VwSubTitle>
                            <VwEmpty />
                            <VwEmpty2 />
                        </VwSubTitle>
                    </VwContainerCard>
                )
            }
        </VwContainerServices>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        selectedService: state.professionalHome.selectedService,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsServices)