import styled from 'styled-components'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const ViewContainer = styled.View`
    flex: 1;
`

export const ViewContainerAbsolute = styled.View`
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    flex: 1;
    width: 100%;
`

export const ImageItem = styled.Image`
    flex: 1;
`