import { curry } from '../utils';
import { scale, translate } from './transform';

// 笛卡尔坐标系变换的实现如下,将统计学上的点线性转换成画布上的点
function coordinate(transformOptions, canvasOptions) {
  const { x, y, width, height } = canvasOptions;
  return [
    scale(width, height), // 将画布的宽和高应用到x和y坐标上
    translate(x, y), // 将起点坐标应用到x和y坐标上
  ];
}

// 通过函数柯里化延迟函数的执行，只有当 transformOptions 和 canvasOptions 都被传入的时候才执行该函数
export const cartesian = curry(coordinate);
