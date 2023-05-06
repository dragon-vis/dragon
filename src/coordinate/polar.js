import {
  translate, // 平移
  scale, // 缩放
  reflectY, // 相对Y轴反射
  polar as polarT, // 极坐标变换
} from './transform';
import { curry } from '../utils/helper'; // 柯里化函数

// 极坐标系变换
function coordinate(transformOptions, canvasOptions) {
  const { width, height } = canvasOptions; // 获取画布的宽高
  const {
    innerRadius = 0, // 内半径，默认为0
    outerRadius = 1, // 外半径，默认为1
    startAngle = -Math.PI / 2, // 起始角度，默认为-π/2
    endAngle = (Math.PI / 2) * 3, // 终止角度，默认为3π/2
  } = transformOptions; // 获取坐标系变换参数

  // 保证最后经过 cartesian 变化之后是一个圆形
  // 需要根据画布宽高去调整
  const aspect = width / height; // 计算画布宽高比
  const sx = aspect > 1 ? 1 / aspect : 1; // 按比例调整X轴缩放比例
  const sy = aspect > 1 ? 1 : aspect; // 按比例调整Y轴缩放比例

  return [
    // 以画布中心沿着 y 方向翻转
    translate(0, -0.5), // 将坐标系向上平移0.5个单位
    reflectY(), // 相对Y轴反射
    translate(0, 0.5), // 将坐标系向下平移0.5个单位

    // 调整角度和半径的范围
    scale(endAngle - startAngle, outerRadius - innerRadius), // 缩放坐标系
    translate(startAngle, innerRadius), // 平移坐标系
    polarT(), // 极坐标变换

    // 改变大小内切画布
    scale(sx, sy), // 按比例缩放坐标系
    scale(0.5, 0.5), // 缩小坐标系

    // 移动到画布中心
    translate(0.5, 0.5), // 将坐标系向右平移0.5个单位
  ];
}

// 将 coordinate 函数柯里化，导出 polar 变量
export const polar = curry(coordinate);
