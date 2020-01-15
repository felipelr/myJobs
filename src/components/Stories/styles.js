import styled from 'styled-components'
import { purple } from '../../components/common/util/colors'

export const SvwContainerStories = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2, height: 173 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})` 
    flex-direction: row; 
`

export const VwContainerStorieItemEmpty = styled.TouchableOpacity`
    width:110;
    height: 170;
    background-color: ${purple};
    opacity:0.6;
    align-self: flex-end;
    margin-right: 5;
    margin-bottom: 4;
    align-items: center;
    justify-content: center;
    border-radius: 10;
`

export const VwContainerStorieItem = styled.TouchableOpacity`
    width: 110;
    height: 170;
    align-self: flex-end;
    margin-right: 5;
    margin-bottom: 4;
    align-items: center;
    justify-content: center;
    border-radius: 10;
`