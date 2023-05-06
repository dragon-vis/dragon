import { curry } from '../utils';
import { reflectX, translate, transpose as transposeT } from './transform';

// 转置坐标系变换
// eslint-disable-next-line no-unused-vars
function coordinate(transformOptions, canvasOptions) {
  return [
    transposeT(), // 按照 y = x 这条直线对称
    translate(-0.5, -0.5), // 左上方平移50%
    reflectX(), // 相对 x 轴进行反射，即将 y 轴翻转
    translate(0.5, 0.5), // 右下方平移50%
  ];
}

export const transpose = curry(coordinate);
