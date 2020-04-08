import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const ContainerContent = styled.View`
    padding: 5px; 
    height: ${heightPercentageToDP('16%')};
    background-color: white;
    margin-top: 2px; 
`
export const ContainerItems = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})` 
    flex-direction: row;
`

export const TextLoading = styled.Text`
    color: ${purple};
    font-size: 14px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`
 