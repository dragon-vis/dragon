// 创建 Ordinal 序数比例尺，值域和定义域都是序数，主要用于将序数属性映射为同为序数属性的视觉属性，比如颜色，形状等
export function createOrdinal({ domain, range }) {
  // 通过对象序列化转化为字符串，以便作为 Map 对象中的键
  const key = JSON.stringify;
  // 定义域元素值 => 对应索引
  // 通过哈希表将查找 index 的时间复杂度降低到 O(1)
  const indexMap = new Map(domain.map((d, i) => [key(d), i]));
  return (x) => {
    // 首先从定义域中找到输入对应的索引，然后返回值域中对应索引的元素
    const index = indexMap.get(key(x));
    // 取模的目的是为了应对 domain.length > range.length 的情况
    return range[index % range.length];
  };
}
