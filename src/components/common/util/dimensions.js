import { Dimensions, PixelRatio } from 'react-native'
const { height, width } = Dimensions.get('window')

const actualDimensions = {
    height: (height < width) ? width : height,
    width: (width > height) ? height : width
}

export const widthPercentageToDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
}
export const heightPercentageToDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
}

export default actualDimensions