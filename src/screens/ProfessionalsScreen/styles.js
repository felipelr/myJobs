import styled from 'styled-components/native'
import { white, purple, green } from '../../components/common/util/colors'

export const ContainerProfessionals = styled.View`
    flex: 1;
    background-color: lightgray;
`

export const ContainerList = styled.View`
    flex: 3;
    background-color: ${white};
    margin-top: 2px;
`

export const TextLoading = styled.Text`
    color: ${purple};
    font-size: 16px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold; 
`

export const ButtonContainer = styled.View`  
    background-color: ${white}; 
    align-items:center;
    margin-top: 2px;
`

export const ButtonOrcamento = styled.TouchableOpacity`
    background-color: ${purple}; 
    height: 60px;
    margin-top:5px;
    margin-bottom:5px;
    align-items:center;
    justify-content:center;
    flex-direction: column;
`

export const TextOrcamento = styled.Text`
    color: ${white};
    margin-left:10px;
    margin-right:10px;
    font-size: 14px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold; 
`
export const Title = styled.Text`
    font-size: 14px;
    color: ${purple};
    font-family: 'SF-Pro-Text-Bold';
    margin-bottom: 5px;
    font-weight: bold;
`