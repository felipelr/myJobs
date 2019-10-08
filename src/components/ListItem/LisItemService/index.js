import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { purple } from '../../../components/common/util/colors'
import { TitleService, InfoService, styles, Services } from './styles'

export default function ListItemService(props) {
    const { servico } = props

    onPress = (navigate, servicoItem) => { 
        navigate()
    }

    return (
        <ListItem
            itemOnPress={() => onPress(props.itemOnPress,servico)}
            leftContent={
                <Avatar
                    containerStyle={styles.containerStyle}
                    overlayContainerStyle={styles.overlayContainerStyle}
                    containerStyle={{ alignSelf: 'center' }} 
                    size={60}
                    title={servico.title.substring(0,1)}
                />
            }
            centerContent={
                <View>
                    <TitleService>{servico.title}</TitleService>
                    <InfoService>{servico.description}</InfoService>
                    <Services>
                    {servico.Profissionais}{servico.Profissionais != 1 ? ' profissionais registrados': ' profissional registrado'}   
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