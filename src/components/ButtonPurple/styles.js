import styled from 'styled-components/native'
import { purple, white } from '../../components/common/util/colors'

export const Button = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${purple};
    border-radius: 5px;
    justify-content: space-evenly;
`
export const TextButton = styled.Text`
    color: ${white};
    font-family: 'SF-Pro-Text-Regular';
    font-size: 16px;
    text-align: center;
` 