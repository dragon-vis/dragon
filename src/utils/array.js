import { identity, round } from './helper';

export function group(array, key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}

// @see https://github.com/d3/d3-array/blob/main/src/ticks.js#L46
// step0 是生成指定数量的刻度的间隔
// step1 是最后生成的刻度的间隔
// 我们希望 step1 满足两个条件：
// 1. step1 = 10 ^ n * b (其中 b=1,2,5)
// 2. step0 和 step1 的误差尽量的小
export function tickStep(min, max, count) {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(max - min) / Math.max(0, count);
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 m - n >= 0.85 = log(e10) 的时候，step1 * 10
  // 可以减少log(10) = 1 的误差
  if (error >= e10) step1 *= 10;
  // 2. 当 0.85 > m - n >= 0.5 = log(e5) 的时候，step1 * 5
  // 可以减少 log(5) = 0.7 的误差
  else if (error >= e5) step1 *= 5;
  // 3. 当 0.5 > m - n >= 0.15 = log(e2) 的时候，step1 * 2
  // 那么可以减少 log(2) = 0.3 的误差
  else if (error >= e2) step1 *= 2;
  // 4. 当 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
}

export function ticks(min, max, count) {
  const step = tickStep(min, max, count);
  // 让 start 和 stop 都是 step 的整数倍
  // 这样生成的 ticks 都是 step 的整数倍
  // 可以让可读性更强
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  // n 不一定等于 count，所以生成的 ticks 的数量可能和指定的不一样
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

// bisect 函数用来查找 array 中第一个大于或等于 x 的元素的索引，并返回该索引
// 使用二分查找算法
export function bisect(array, x, lo = 0, hi = array.length, accessor = identity) {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}

export function lastOf(array) {
  return array[array.length - 1];
}

export function firstOf(array) {
  return array[0];
}

export function indexOf(array) {
  return array.map((_, i) => i);
}

export function min(array, accessor) {
  return Math.min(...array.map(accessor));
}

export function max(array, accessor) {
  return Math.max(...array.map(accessor));
}

export function mean(array, accessor = identity) {
  return array
    .map(accessor)
    .reduce((sum, v) => sum + v) / array.length;
}

export function median(array, accessor = identity) {
  const sortedValues = [...array].map(accessor).sort();
  const i = (sortedValues.length - 1) / 2;
  const a = sortedValues[Math.floor(i)];
  const b = sortedValues[Math.ceil(i)];
  return (a + b) / 2;
}

// eslint-disable-next-line no-unused-vars
export function count(array, accessor = identity) {
  return array.length;
}

export function sum(array, accessor = identity) {
  return array.map(accessor).reduce((sum, v) => sum + v);
}
