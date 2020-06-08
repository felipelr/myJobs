import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import {
    ContainerItem,
    BodyItem,
    TitleItem,
    DescriptionItem,
    ContentInfo,
    TextoVazio,
    DescricaoVazia,
    styles
} from './styles'

import { white } from '../common/util/colors'

import { heightPercentageToDP } from '../../components/common/util/dimensions'
import RatingJobs from '../RatingJobs'

function ItemHighlight(props) {
    const { profissional } = props.ownProps
    const { navigation } = props.ownProps
    const { route } = props.ownProps

    useEffect(() => {
        return () => {
        }
    }, [])

    const handlePress = () => {
        if (profissional) {
            props.professionalSetProfessionalView(profissional)
            navigation.navigate('ProfessionalView', {
                previewScreen: route.name,
                viewProfile: true,
            })
        }
    }

    return (
        <ContainerItem gray={(profissional ? false : true)} onPress={() => handlePress()}>
            <BodyItem>
                {profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={heightPercentageToDP('10%')}
                        source={{
                            uri: profissional.photo,
                        }} />
                }
                {!profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={heightPercentageToDP('10%')} />
                }

                <ContentInfo>
                    {profissional && <TitleItem>{profissional.name}</TitleItem>}
                    {!profissional && <TextoVazio />}

                    {profissional && <DescriptionItem>{profissional.description}</DescriptionItem>}
                    {!profissional && <DescricaoVazia />}

                </ContentInfo>
                <Icon name="chevron-right" size={30} color={white} style={{ alignSelf: 'center' }} />
            </BodyItem>
            {
                profissional &&
                <RatingJobs backPurple={true} avaliacao={profissional.rating} qtdeAvaliacoes={profissional.amount_ratings} />
            }
        </ContainerItem>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        professionalSetProfessionalView: (professional) => dispatch(ActionCreators.professionalSetProfessionalView(professional)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemHighlight)