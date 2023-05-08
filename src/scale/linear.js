import {
  normalize, tickStep, ticks, nice, floor, ceil,
} from '../utils';
import { interpolateNumber } from './interpolate';

export function createLinear({
  domain: [d0, d1], // 定义域
  range: [r0, r1], // 值域
  interpolate = interpolateNumber, // 数值插值器，默认为线性插值器
}) {
  // 创建线性比例尺
  const scale = (x) => {
    const t = normalize(x, d0, d1); // 计算当前值在定义域上的比例
    // 计算当前值在值域上的插值
    return interpolate(t, r0, r1);
  };

  // 定义比例尺的刻度计算方法
  scale.ticks = (tickCount = 10) => ticks(d0, d1, tickCount);

  // 定义比例尺的定义域范围的优化方法
  scale.nice = (tickCount = 10) => {
    if (d0 === d1) return;
    // the first time
    const step = tickStep(d0, d1, tickCount); // 计算步长
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step), // 向下取整
      ceil: (x) => ceil(x, step), // 向上取整
    });
  };

  return scale; // 返回比例尺函数
}
