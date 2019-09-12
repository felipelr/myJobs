import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { purple } from '../../../components/common/util/colors'
import { TitleSubcategory, InfoSubcategory, styles } from './styles'

export default function ListItemService(props) {
    const { subcategory } = props
    console.log('teste' + JSON.stringify(subcategory))
    return (
        <ListItem
            itemOnPress={props.itemOnPress}
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