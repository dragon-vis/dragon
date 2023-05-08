import { group } from '../utils';

export function createNormalizeY() {
  return ({ index, values }) => {
    const { x: X } = values;

    // 按照 x 通道分组
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];

    // 生成定义了的 y 方向的通道值
    const newValues = Object.fromEntries(
      ['y1', 'y']
        .filter((key) => values[key])
        .map((key) => [key, new Array(index.length)]),
    );

    // 处理每一个分组
    for (const I of series) {
      // 找到该分组最大的 y
      const Y = I.flatMap((i) => Object.keys(newValues).map((key) => values[key][i]));
      const n = Math.max(...Y);

      // 归一化每一条数据的每一个 y 方向通道的值
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = values[key][i] / n;
        }
      }
    }
    return {
      index,
      values: {
        ...values,
        ...newValues,
      },
    };
  };
}
