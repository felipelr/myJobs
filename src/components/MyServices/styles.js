import styled from 'styled-components'
import { white, purple, black, lightgray } from '../common/util/colors'

export const ViewContainer = styled.View`
    padding: 8px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``

export const ContainerLista = styled.View`
    background-color: ${white};
    flex: 1;
`

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
    padding: 16px 0px 16px 0px;
`

export const ViewContainerCategory = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: ${lightgray};
`

export const ViewContainerSubcategory = styled.View`
    flex-direction: column;
    border-bottom-width: 1px;
    border-bottom-color: ${lightgray};
    margin: 0px 0px 4px 8px;
`

export const ViewTitleCategory = styled.View`
    padding: 0px 2px 8px 2px;
    flex-direction: column;
    flex: 1;
`

export const TxtCategory = styled.Text`
    font-size: 14px;
    color: ${black};
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
    margin: 8px 0px 4px 0px;
`

export const TxtTileCategory = styled.Text`
    font-size: 16px;
    color: ${black};
    font-family: 'SF-Pro-Text-Regular';
    padding: 0px 0px 8px 16px; 
`

export const TxtTileSubcategory = styled.Text`
    background-color: ${purple};
    color: ${white};
    padding: 10px 16px 10px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`

export const BtnEditServices = styled.TouchableOpacity`
    padding: 0px 8px 0px 8px;
    align-self: center;
`
export const TxtEditServices = styled.Text`
    font-size: 14px;
    color: ${purple};
    font-family: 'SF-Pro-Text-Regular';
`

export const ScrollViewSubcategory = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})`
    margin: 5px 0px 16px 0px;
`

export const TouchTabSubcategory = styled.TouchableOpacity`
    padding: 10px 16px 10px 16px;
    background-color: ${props => `${props.backgroundColor}`};
    border-radius: 20px;
    margin: 0px 4px 0px 0px;
`
export const TxtTabSubcategory = styled.Text`
    font-size: 16px;
    color: ${props => `${props.color}`};
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`

export const ViewTabEmpty = styled.View`
    padding: 10px 16px 10px 16px;
    background-color: ${lightgray};
    border-radius: 20px;
    width: 150px;
    height: 40px;
`