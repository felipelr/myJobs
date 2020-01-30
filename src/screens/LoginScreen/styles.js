import styled from 'styled-components/native'
import { purple, white } from '../../components/common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const Container = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    flex: 1;
`

export const SocialMidiaText = styled.Text`
    padding: 4px;
    color: ${purple};
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
`

export const ViewContainerLogin = styled.View`    
    flex: 1;
    padding-top: ${heightPercentageToDP('5%')};
`

export const ViewContainerSignup = styled.View`    
    flex: 1;
    padding-top: ${heightPercentageToDP('5%')};
`

export const TextLogoTipo = styled.Text`
    margin-top: ${heightPercentageToDP('5%')};
    width: 100%;
    text-align: center;
    font-size: 72px;
    color: ${white};
`