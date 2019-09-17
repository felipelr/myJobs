import styled from 'styled-components/native'
import { purple, white ,yellow} from '../common/util/colors' 

export const ContainerItem = styled.TouchableOpacity`
    background-color: ${purple};
    border-radius: 2px;
    padding: 8px 0px 4px 8px;
    margin-right: 10px;
    flex: 1;
    width: 300px;
    elevation: 1;
`

export const ContentInfo = styled.View`
    flex: 1;
    padding: 8px;
`

export const BodyItem = styled.View`
    flex: 1;
    flex-direction: row;    
`

export const TitleItem = styled.Text`
    font-size: 18px;
    color: ${white};
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
    margin-bottom: 5px;
`
export const DescriptionItem = styled.Text`
    font-size: 14px;
    font-family: 'SF-Pro-Text-Regular';
    color: ${white};
    flex: 1;
`

export const Services = styled.Text`
    font-size: 10px;
    font-family: 'SF-Pro-Text-Regular';
    color: ${yellow}; 
    flex-direction:row;
`
export const ServicesAmount = styled.Text`
    font-size: 11px;
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
    color: ${yellow}; 
    flex-direction:row;
`