import styled from 'styled-components/native'
import { purple, white, yellow, lightgray, gray } from '../common/util/colors'
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
`

export const BodyItem = styled.View`
    flex: 1;
    flex-direction: row;    
`

export const TitleItem = styled.Text`
    font-size: ${heightPercentageToDP('2%')};
    color: ${gray};
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
    margin-bottom: 5px;
`
export const DescriptionItem = styled.Text`
    font-size: ${heightPercentageToDP('1.7%')};
    font-family: 'SF-Pro-Text-Regular';
    color: ${gray};
    flex: 1;
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
    color: ${purple}; 
    flex-direction:row;
` 



