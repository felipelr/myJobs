import styled from 'styled-components/native'
import { purple, white, yellow, lightgray, disabled } from '../common/util/colors'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../components/common/util/dimensions'

export const styles = StyleSheet.create({
    containerStyle: {
        alignSelf: 'center',
        borderColor: purple
    }
})

export const ContainerItem = styled.TouchableOpacity`
    background-color: ${props => props.gray ? lightgray : purple};
    border-radius: 2px;
    padding: 4px 0px 4px 4px;
    margin-right: 10px;
    flex: 1;
    width: ${widthPercentageToDP('80%')};
    elevation: 1;
`

export const ContentInfo = styled.View`
    flex: 1;
    padding: 4px 4px 4px 8px;
    justify-content: space-evenly;
`

export const BodyItem = styled.View`
    flex: 1;
    flex-direction: row;    
`

export const TitleItem = styled.Text`
    font-size: ${heightPercentageToDP('2%')};
    color: ${white};
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
`
export const DescriptionItem = styled.Text`
    font-size: ${heightPercentageToDP('1.7%')};
    font-family: 'SF-Pro-Text-Regular';
    color: ${white};
`

export const ContainerDescription = styled.ScrollView.attrs({
    horizontal: true,
    showHorizontalScrollIndicator: false
})` 
    flex-direction: column;
`

export const Services = styled.Text`
    font-size: ${heightPercentageToDP('1.5%')};
    font-family: 'SF-Pro-Text-Regular';
    color: ${yellow}; 
    flex-direction:row;
`
export const ServicesAmount = styled.Text`
    font-size: ${heightPercentageToDP('1.5%')};
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
    color: ${yellow}; 
    flex-direction:row;
`
export const TextoVazio = styled.View`
    background-color: ${disabled};
    height: 20;  
    border-radius: 5;
`

export const DescricaoVazia = styled.View`
    background-color: ${disabled};
    height: 35;  
    border-radius: 5;
    margin-top:10;
`




