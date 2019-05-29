import React from 'react'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { purple } from '../../../components/common/util/colors';
import CenterContentProfessional from './CenterContentProfessional/index'

export default function ListItemProfessional(props) {
    const { profissional } = props
    return (
        <ListItem
            itemOnPress={props.itemOnPress}
            leftContent={
                <Avatar
                    rounded
                    containerStyle={{ alignSelf: 'center' }}
                    size={40}
                    source={{ uri: profissional.imagem, }}
                />
            }
            centerContent={
                <CenterContentProfessional
                    titulo={profissional.nome}
                    descricao={profissional.info}
                    avaliacao={profissional.avaliacao}
                    qtdeAvaliacoes={profissional.qtdeAvaliacoes}
                />
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