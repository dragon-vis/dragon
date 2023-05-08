import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { circle } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  r: createChannel({ name: 'r' }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  // 默认的一些属性
  const defaults = {
    r: 3,
    fill: 'none',
  };
  // 获取每一个通道经过比例尺映射的值
  const { x: X, y: Y, r: R = [] } = values;

  // 通过索引去获得每一条数据各个通道的值
  return Array.from(I, (i) => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate, {
      ...restDefaults,
      // 元素的样式由直接指定的样式和通过通道指定的样式决定
      // 经过通道指定的样式就是和数据相关的样式
      // 后者的优先级更高
      ...directStyles,
      ...channelStyles(i, values),
      // 圆心的位置
      cx: X[i],
      cy: Y[i],
      r,
    });
  });
}

export const point = createGeometry(channels, render);
