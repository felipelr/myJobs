import styled from 'styled-components'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const ViewContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`

export const ViewItem = styled.TouchableHighlight`
    width: ${widthPercentageToDP('32,5%')};
    height: ${widthPercentageToDP('32,5%')};
    margin-bottom:  ${widthPercentageToDP('1,25%')};
    margin-right: ${widthPercentageToDP('1,25%')};
`

export const ViewItemLast = styled.TouchableHighlight`
    width: ${widthPercentageToDP('32,5%')};
    height: ${widthPercentageToDP('32,5%')};
    margin-bottom:  ${widthPercentageToDP('1,25%')};
`

export const ImageItem = styled.Image`
    flex: 1;
`