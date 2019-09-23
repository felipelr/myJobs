import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { purple } from '../../../components/common/util/colors'
import { TitleService, InfoService } from './styles'

export default function ListItemService(props) {
    const { servico } = props
    return (
        <ListItem
            itemOnPress={props.itemOnPress}
            leftContent={
                <Avatar
                    rounded
                    containerStyle={{ alignSelf: 'center' }}
                    size={40} 
                />
            }
            centerContent={
                <View>
                    <TitleService>{servico.title}</TitleService>
                    <InfoService>{servico.description}</InfoService>
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