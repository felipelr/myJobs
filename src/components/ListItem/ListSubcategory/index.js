import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import { purple } from '../../../components/common/util/colors'
import { TitleSubcategory, InfoSubcategory, styles } from './styles'
import ActionCreators from '../../../store/actionCreators'

function ListItemService(props){
    const { subcategory } = props

    onPress = (navigate) => {
        props.selectSubcategory(props.subcategory)
        navigate()
    }

    return (
        <ListItem
            itemOnPress={() => onPress(props.itemOnPress)}
            leftContent={
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    containerStyle={{ alignSelf: 'center' }}
                    icon={{ name: subcategory.icon, type: 'material-icons' }}
                    size={60}
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
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
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
        selectSubcategory: (subcategory) => dispatch(ActionCreators.subcategoriesSelected(subcategory))    }
}
 
export default connect(null, mapDispatchToProps)(ListItemService)