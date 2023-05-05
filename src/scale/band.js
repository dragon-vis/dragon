import { createOrdinal } from './ordinal';

// Band 比例尺主要用于将离散的序数属性映射为连续的数值属性，往往用于条形图中确定某个条的位置
export function createBand(options) {
  const { bandRange, bandWidth, step } = band(options); // 调用 band 函数得到带间距的信息
  const scale = createOrdinal({ ...options, range: bandRange }); // 创建带有序数域的序数比例尺

  scale.bandWidth = () => bandWidth; // 比例尺有一个 bandWidth 方法，返回宽度
  scale.step = () => step; // 比例尺有一个 step 方法，返回步长

  return scale; // 返回带有间距的序数比例尺
}

// 带有间距的比例尺的宽度和步长信息计算
function band({
  domain, range, padding, margin = padding,
}) {
  const [r0, r1] = range; // 将范围 range 数组解构为 r0 和 r1
  const n = domain.length; // 获取 domain 的长度
  const step = (r1 - r0) / (margin * 2 + n - padding); // 计算步长
  const bandWidth = step * (1 - padding); // 计算宽度
  const x = (_, i) => r0 + margin * step + step * i; // x 函数，计算序数的映射值
  return {
    step, // 返回步长
    bandWidth, // 返回宽度
    bandRange: new Array(n).fill(0).map(x), // 返回包含所有序数的数组
  };
}
