import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const ContainerContent = styled.View`
    padding: 5px;
    background-color: ${white}; 
    margin-top: 2px;
    height: ${heightPercentageToDP('21%')};
`
export const Title = styled.Text`
    font-size: 14px;
    color: ${purple};
    font-family: 'SF-Pro-Text-Bold';
    margin-bottom: 5px;
    font-weight: bold;
`

export const TextLoading = styled.Text`
    color: ${purple};
    font-size: 14px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`
 

export const ContainerItems = styled.ScrollView.attrs({
    horizontal: true, 
    showsHorizontalScrollIndicator: false, 
    showsVerticalScrollIndicator: false
})``