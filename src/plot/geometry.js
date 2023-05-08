import { compose, indexOf } from '../utils';
import { inferEncodings, valueOf } from './encoding';
import { create } from './create';

// 这是获取每个几何图形通道值的地方
export function initialize({
  data,
  type,
  encodings: E = {},
  statistics: statisticsOptions = [],
  transforms: transformsOptions = [],
  styles,
}) {
  // apply transform
  // 执行 transform
  // 把所有的 transform 都合成一个函数
  const transform = compose(...transformsOptions.map(create));
  const transformedData = transform(data);
  const index = indexOf(transformedData);

  // apply valueOf
  // 执行 valueOf
  // 从表格数据里面提取各个通道的值
  const encodings = inferEncodings(type, transformedData, E);
  const constants = {};
  const values = {};
  for (const [key, e] of Object.entries(encodings)) {
    if (e) {
      const { type, value } = e;
      if (type === 'constant') constants[key] = value;
      else values[key] = valueOf(transformedData, e);
    }
  }

  // apply statistics
  // 执行 statistics
  // 把所有的 statistics 都合成一个函数
  const statistic = compose(...statisticsOptions.map(create));
  const { values: transformedValues, index: I } = statistic({ index, values });

  // create channels
  // 创建通道
  const geometry = create({ type });
  const channels = {};
  for (const [key, channel] of Object.entries(geometry.channels())) {
    const values = transformedValues[key];
    const { optional } = channel;
    if (values) {
      channels[key] = createChannel(channel, values, encodings[key]);
    } else if (!optional) {
      throw new Error(`Missing values for channel: ${key}`);
    }
  }

  // 返回处理好的数据
  return { index: I, geometry, channels, styles: { ...styles, ...constants } };
}

function createChannel(channel, values, encoding = {}) {
  const { type, value } = encoding;
  return {
    ...channel,
    ...(type === 'field' && { field: value }),
    values,
  };
}
