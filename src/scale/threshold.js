import { bisect } from '../utils';

// 创建一个 Threshold 阈值比例尺，它的定义域是连续的，并且会被指定的分割值分成不同的组，用于将连续的数值映射到离散的颜色或类别
export function createThreshold({ domain, range }) {
  // 首先确定映射的目标数量，即range数组的长度减1与domain数组长度的较小值
  const n = Math.min(domain.length, range.length - 1);
  const scale = (x) => {
    // 使用二分查找找出定义域中第一个大于或等于 x 的元素的索引并返回
    const index = bisect(domain, x);
    // 返回值域中对应索引的值
    return range[index === -1 ? n : index];
  };

  scale.thresholds = () => domain;
  return scale;
}
