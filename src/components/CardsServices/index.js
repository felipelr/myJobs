import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../store/actionCreators'

import {
    VwContainerServices,
    VwContainerCard,
    VwSubTitle,
    VwTitleCard,
    VwEmpty,
    VwEmpty2,
    VwEmptyTitle
} from './styles'

import CardService from '../../components/CardService/index'

function CardsServices({ services, loading, selectedService, ...props }) {
    return (
        <VwContainerServices>
            {
                !loading && services.map((item) => (
                    <CardService
                        key={item.id}
                        select={item.id === selectedService ? true : false}
                        service={item}
                        onPress={() => props.professionalHomeSetSelectedService(item)} />
                ))
            }
            {
                (!loading && !services.length) && <React.Fragment>
                    <VwContainerCard>
                        <VwTitleCard>
                            <VwEmptyTitle />
                        </VwTitleCard>
                        <VwSubTitle>
                            <VwEmpty />
                            <VwEmpty2 />
                        </VwSubTitle>
                    </VwContainerCard>
                </React.Fragment>
            }
            {
                loading && (
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

const mapDispatchToProps = dispatch => {
    return {
        professionalHomeSetSelectedService: (service) => dispatch(ActionCreators.professionalHomeSetSelectedService(service))
    }
}

export default connect(null, mapDispatchToProps)(CardsServices)