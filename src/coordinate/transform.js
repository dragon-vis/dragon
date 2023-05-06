// 此文件为基本变换,本质上是一个函数，输入是变换前点的坐标，输入是变换后点的坐标
// 同时该变换函数有 type 方法返回自己的变换类型

// 转置变换就是交换一个点的两个维度，可以理解为按照 y = x 这条直线对称
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

// 平移变换,用于将图形沿x轴和y轴平移
// 将输入的点(px,py)转换成[px+tx,py+ty]格式
export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

// 缩放变换,用于将图形按照x轴和y轴缩放
// sx和sy是可选参数，表示x和y轴的缩放比例，默认值为1
export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

// 反射变换是一种特殊的缩放变换，它在两个维度的放缩比例都是 -1
// 用于将图形相对于原点进行对称
export function reflect() {
  return transform('reflect', scale(-1, -1));
}

// 用于将图形相对于x轴进行对称,沿y轴翻折
export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

// 用于将图形相对于y轴进行对称,沿x轴翻折
export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

// 极坐标变换，它会将极坐标系下的点转换到笛卡尔坐标系
// 极坐标变换可以把条形图转换成玫瑰图
export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为 radius
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}

// 封装变换函数，同时在返回函数上增加 type 属性，用于记录该函数的变换类型
// 函数在代码中被其他函数调用，以便对图形进行变换
function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}
