import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import { purple } from '../../../components/common/util/colors'
import { TitleSubcategory, InfoSubcategory, styles } from './styles'
import ActionCreators from '../../../store/actionCreators'

function ListSubcategory(props) {
    const { subcategory } = props

    const onPress = (subcategoryItem) => {
        props.selectSubcategory(subcategoryItem)
        props.itemOnPress()
    }

    return (
        <ListItem
            itemOnPress={() => onPress(subcategory)}
            leftContent={
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    containerStyle={{ alignSelf: 'center' }}
                    icon={{ name: subcategory.icon, type: 'material-icons', color: purple }}
                    size={55}
                />
            }
            centerContent={
                <View>
                    <TitleSubcategory>{subcategory.description}</TitleSubcategory>
                    <InfoSubcategory>{subcategory.countServices} {subcategory.countServices !== 1 ? 'Serviços' : 'Serviço'}</InfoSubcategory>
                    <InfoSubcategory>{subcategory.countProfessionals} {subcategory.countProfessionals !== 1 ? 'Profissionais' : 'Profissional'}</InfoSubcategory>
                </View>
            }
            rightContent={
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Icon
                        name="chevron-right"
                        size={30}
                        color={purple}
                        style={{ alignSelf: 'center' }}
                    />
                </View>
            }
        />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        selectSubcategory: (subcategory) => dispatch(ActionCreators.subcategoriesSelected(subcategory))
    }
}

export default connect(null, mapDispatchToProps)(ListSubcategory)