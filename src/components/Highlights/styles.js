import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'

export const ContainerContent = styled.View`
    padding: 5px;
    background-color: ${white}; 
    margin-top: 2px;
    height: 150; 
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
    font-size: 16px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`
 

export const ContainerItems = styled.ScrollView.attrs({
    horizontal: true, 
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``