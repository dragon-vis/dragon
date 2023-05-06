import { compose } from '../utils';

// 创建一个坐标系,将视觉元素的位置属性映射为在画布上的坐标,本质上也是一个函数
// 会将我们输入的点进行一系列坐标变换，然后得到该点在画布上的坐标
export function createCoordinate({
  transforms: coordinates = [],
  ...canvasOptions
}) {
  // coordinates 是坐标系变换函数
  // 它们是已经接受了 transformOptions 的柯里化函数
  // 它们还需要我们传入 canvasOptions
  // 它们返回一个由基本变换构成的数组，所以在复合前需要通过 flat 把数组拍平
  // [[transpose, reflect], [transpose, reflect]]
  // -> [transpose, reflect, transpose, reflect]
  // flatMap() 方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组
  const transforms = coordinates.flatMap((coordinate) => coordinate(canvasOptions));

  // 某些场景需要获得坐标系的种类信息
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms); // 函数复合
  const { x, y, width, height } = canvasOptions;

  // 判断是否是极坐标系
  output.isPolar = () => types.indexOf('polar') !== -1;

  // 判断是否转置
  // 只有是奇数个 'transpose' 的时候才是转置
  // 这里使用了异或：a ^ b， 只有当 a 和 b 值不相同的时候才为 true，否者为 false
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);

  // 获得坐标系画布的中心
  output.center = () => [x + width / 2, y + height / 2];

  return output;
}
