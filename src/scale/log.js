import { createLinear } from './linear';
import { ticks, nice, log } from '../utils';

// 创建对数比例尺
// 对数比例尺通常用于处理数据量级较大的情况，可以将数据值做对数运算后进行映射，避免值域过大导致映射不均匀的情况
export function createLog({ domain, base = Math.E, ...rest }) {
  // 转换函数，将数据值做对数运算
  const transform = (x) => Math.log(x);
  // 创建一个线性比例尺，将对数转换后的域当做定义域
  let linear = createLinear({ domain: domain.map(transform), ...rest });
  // 定义最终的对数比例尺，将输入的值先做对数运算，再通过线性比例尺进行映射
  const scale = (x) => linear(transform(x));

  // 定义ticks方法，用于计算刻度值
  scale.ticks = (tickCount = 5) => {
    // 对数比例尺的刻度线密集度不均匀，需要先计算对数域的最小值和最大值
    const [min, max] = domain.map((x) => log(x, base));
    // 通过线性比例尺计算对数域内的刻度值
    return ticks(min, max, tickCount).map((x) => base ** x);
  };

  // 定义nice方法，用于调整域的范围
  scale.nice = () => {
    // 调用utils中的nice函数，调整域的范围
    domain = nice(domain, {
      // 调整下限
      floor: (x) => base ** Math.floor(log(x, base)),
      // 调整上限
      ceil: (x) => base ** Math.ceil(log(x, base)),
    });
    // 更新线性比例尺
    linear = createLinear({ domain: domain.map(transform), ...rest });
  };

  // 返回对数比例尺
  return scale;
}
