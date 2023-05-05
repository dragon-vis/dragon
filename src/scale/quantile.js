import { createThreshold } from './threshold';

// 和 Quantize 比例尺不同是，Quantile 比例尺采用了另外的分割值的策略： 根据数据的排名来计算分割值
export function createQuantile({ domain, range, ...rest }) {
  // 因为要将连续的 domain 值映射到 n 个离散的区间中，因此有 n-1 个分割点
  const n = range.length - 1;
  // 将定义域数组排序
  const sortedDomain = domain.sort((a, b) => a - b);
  // 计算步长
  const step = (sortedDomain.length - 1) / (n + 1);
  const quantileDomain = new Array(n).fill(0).map((_, index) => {
    // i 表示当前位置对应的分割点的位置
    const i = (index + 1) * step;
    // i0 和 i1 表示当前位置所属的两个区间的左右端点的位置
    const i0 = Math.floor(i);
    const i1 = i0 + 1;
    // v0 和 v1 表示左右端点对应的值
    const v0 = sortedDomain[i0];
    const v1 = sortedDomain[i1];
    // 返回对当前值的线性插值，用于计算当前值在两个区间中所占的比例，再根据比例将左右端点的值进行插值计算得到新的映射值
    return v0 * (i1 - i) + v1 * (i - i0);
  });
  return createThreshold({ domain: quantileDomain, range, ...rest });
}
