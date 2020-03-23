import styled from 'styled-components/native'
import { purple, white } from '../../components/common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const Container = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainer: {
        flexGrow: 1
    }
})``

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
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
    padding-top: ${heightPercentageToDP('3%')};
`

export const ViewContainerSignup = styled.View`    
    flex: 1;
    padding-top: ${heightPercentageToDP('3%')};
`

export const TextLogoTipo = styled.Text`
    margin-top: ${heightPercentageToDP('5%')};
    width: 100%;
    text-align: center;
    font-size: 72px;
    color: ${white};
`

export const ImgLogoTipo = styled.Image`
    margin-top: ${heightPercentageToDP('7%')};
    align-self: center;
`