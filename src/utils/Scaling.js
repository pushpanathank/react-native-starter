import { winWidth, winHeight } from './Device';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => winWidth / guidelineBaseWidth * size;
export const verticalScale = size => winHeight / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;


export { winWidth, winHeight };