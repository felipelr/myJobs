import React from 'react'
import { View } from 'react-native'
import ListItem from '../index'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import { purple } from '../../../components/common/util/colors'
import { TitleProfessional, InfoProfessional } from './styles'
import RatingJobs from '../../RatingJobs/index'

import ActionCreators from '../../../store/actionCreators'

function ListItemProfessional(props) {
    const { profissional } = props

    const onPress = (profissionalItem) => {  
        props.professionalSelected(profissionalItem) 
        props.itemOnPress()
    }

    return (
        <ListItem
            itemOnPress={() => onPress(profissional)}
            leftContent={
                <Avatar 
                    containerStyle={{ alignSelf: 'center' }}
                    size={60}
                    source={{ uri: profissional.imagem, }}
                />
            }
            centerContent={
                <View style={{marginLeft:10}}>
                    <TitleProfessional>{profissional.nome}</TitleProfessional>
                    <InfoProfessional>{profissional.info}</InfoProfessional>
                    <RatingJobs avaliacao={parseFloat(profissional.avaliacao)} qtdeAvaliacoes={profissional.qtdeAvaliacoes} />
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
        professionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemProfessional)