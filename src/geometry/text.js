import { createChannel, createChannels } from './channel';
import { createGeometry } from './geometry';
import { text as shapeText } from './shape';
import { channelStyles } from './style';

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }), // 旋转角度
  fontSize: createChannel({ name: 'fontSize' }), // 字体大小
  fontWeight: createChannel({ name: 'fontWeight' }), // 字重
  text: createChannel({ name: 'text', optional: false, scale: 'identity' }), // 内容
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  // 默认的一些属性
  const defaults = {
    rotate: 0,
    fontSize: 14,
    fontWeight: 'normal',
  };
  // 获取每一个通道经过比例尺映射的值
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [], fontWeight: FW = [] } = values;

  // 通过索引去获得每一条数据各个通道的值
  return Array.from(I, (i) => shapeText(renderer, coordinate, {
    ...directStyles,
    ...channelStyles(i, values),
    x: X[i],
    y: Y[i],
    rotate: R[i] || defaults.rotate,
    fontSize: FS[i] || defaults.fontSize,
    fontWeight: FW[i] || defaults.fontWeight,
    text: T[i],
  }));
}

export const text = createGeometry(channels, render);
