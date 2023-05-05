import { createThreshold } from './threshold';

// 相对于 Threshold 比例尺需要指定分割值，Quantize 比例尺会根据数据的范围帮我们选择分割值，从而把定义域分成间隔相同的组
export function createQuantize({ domain: [d0, d1], range, ...rest }) {
  // 计算分级数目 n
  const n = range.length - 1;
  // 计算每个分级的步长
  const step = (d1 - d0) / (n + 1);
  // 生成分级的定义域数组
  // 根据数据的范围选择分割值，从而把定义域分成间隔相同的组
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  // 得到分割值后调用 createThreshold 函数生成阈值比例尺函数，并返回
  return createThreshold({ domain: quantizeDomain, range, ...rest });
}
