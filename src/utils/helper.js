// “恒等映射”，也就是将输入原封不动的返回
export function identity(x) {
  return x;
}

// 函数复合,当没有参数传入的时候,会返回一个 identity 函数
export function compose(...fns) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}

// 函数柯里化，当不传入参数的时候，需要等价于传入了 undefined 参数
export function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    // 如果没有传入参数就把参数列表设置为 [undefined]
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
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
// 该函数主要是为了解决在浮点数运算中产生的精度问题，通过将数字乘以一个很大的数（1e12），再进行四舍五入，最后再除以这个数，得到一个保留小数点后指定位数的精度结果
export function round(n) {
  // 将数字 n 乘以 1e12（即 10 的 12 次方），然后使用 Math.round() 函数进行四舍五入
  // 再将结果除以 1e12，得到精度为小数点后 12 位的四舍五入结果
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
