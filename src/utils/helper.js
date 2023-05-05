// “恒等映射”，也就是将输入原封不动的返回
export function identity(x) {
  return x;
}

// 返回最接近输入的 n 的比 base 小的整数
export function floor(n, base) {
  return base * Math.floor(n / base);
}

// 返回最接近输入的 n 的比 base 大的整数
export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

// 返回新的域范围，使其与给定的间隔对齐（即，域的最小值取整为 interval 的倍数，最大值取整为 interval 的倍数）
export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

// 简单解决 js 的精度问题：0.1 + 0.2 !== 0.3
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

// 计算出输入在定义域的位置（归一化）
export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

// 计算以 base 为底 n 的对数值
export function log(n, base) {
  return Math.log(n) / Math.log(base);
}

export function map(object, transform = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform(value, key);
    return obj;
  }, {});
}

export function assignDefined(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) target[key] = value;
  }
}

export function random(a = 0, b = 1) {
  return a + (b - a) * Math.random();
}

export function defined(d) {
  return d !== undefined && !Number.isNaN(d);
}
