import React from 'react'
import { View, Text } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import { purple } from '../../../components/common/util/colors'
import { TitleService, InfoService, styles, Services } from './styles'
import ActionCreators from '../../../store/actionCreators'

function ListItemService(props) {
    const { servico } = props

    const onPress = (servicoItem) => {
        props.serviceSelected(servicoItem)
        props.itemOnPress()
    }

    return (
        <ListItem
            itemOnPress={() => onPress(servico)}
            leftContent={
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    containerStyle={{ alignSelf: 'center' }}
                    size={55}
                    title={servico.title.substring(0, 1)}
                    titleStyle={{ color: purple }}
                />
            }
            centerContent={
                <View>
                    <TitleService>{servico.title}</TitleService>
                    <InfoService>{servico.description}</InfoService>
                    <Services>
                        {servico.Profissionais}{servico.Profissionais != 1 ? ' profissionais registrados' : ' profissional registrado'}
                    </Services>
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
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        ownProps: ownProps
    }
};

const mapDispatchToProps = dispatch => {
    return {
        serviceSelected: (service) => dispatch(ActionCreators.serviceSelected(service))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemService)