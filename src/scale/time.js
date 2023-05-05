import { createLinear } from './linear'; // 导入线性比例尺的模块

// 创建一个时间比例尺的函数
export function createTime({ domain, ...rest }) {
  const transform = (x) => x.getTime(); // 将输入值转换为时间戳
  const transformedDomain = domain.map(transform); // 转换输入域
  const linear = createLinear({ domain: transformedDomain, ...rest }); // 创建线性比例尺
  const scale = (x) => linear(transform(x)); // 创建比例尺函数，将输入值转换为时间戳后使用线性比例尺映射到输出域

  // Time 比例尺获得合适刻度间隔的算法相对更复杂一点
  // 所以这里就复用 Linear 比例尺的 ticks 算法
  // 复用线性比例尺的刻度算法，调整比例尺的域以便输出好的刻度
  scale.nice = (tickCount) => linear.nice(tickCount);
  // 复用线性比例尺的刻度算法，将时间戳刻度转换为 Date 对象
  scale.ticks = (tickCount) => linear.ticks(tickCount).map((d) => new Date(d));

  return scale; // 返回时间比例尺函数
}
