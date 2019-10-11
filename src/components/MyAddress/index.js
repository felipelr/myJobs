import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import {
    ViewContainer,
    ScrollViewContainer,
    ContainerLista
} from './styles'

import { lightgray, purple } from '../common/util/colors'

function MyAddress(props) {
    const [clientAddressList, setClientAddressList] = useState([
        {
            id: 1,
            client_id: 1,
            street: 'Rua Dr Souza Costa',
            street_number: 210,
            neighborhood: 'Vila Glória',
            city_id: 80,
            city: {
                id: 500,
                name: 'Assis',
                state_id: 26,
                state: {
                    id: 26,
                    name: 'São Paulo',
                    initials: 'SP'
                }
            }
        }
    ])

    useEffect(() => {

    }, [])

    const handleAddressClick = (addressId) => {

    }

    const handleNewAddressClick = () => {

    }

    return (
        <ViewContainer>
            <ScrollViewContainer>
                <View style={{ flex: 1 }}>
                    <ContainerLista>
                        {
                            clientAddressList.map((address) => (
                                <ListItem
                                    key={address.id}
                                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                                    title={address.street + ', ' + address.street_number}
                                    rightIcon={<Icon name="chevron-right" size={30} color={purple} />}
                                    onPress={() => handleAddressClick(address.id)}
                                />
                            ))
                        }
                        <ListItem
                            key={0}
                            containerStyle={{ borderBottomWidth: 1, borderBottomColor: lightgray }}
                            title={'Novo Endereço'}
                            rightIcon={<Icon name="add" size={30} color={purple} />}
                            onPress={() => handleNewAddressClick()}
                        />
                    </ContainerLista>
                </View>
            </ScrollViewContainer>
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
    }
}

export default connect(mapStateToProps, null)(MyAddress)