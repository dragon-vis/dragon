// 创建一个通道，返回一个包含该通道信息的对象
export function createChannel({
  name, // 属性的名字
  optional = true, // values 里面是否需要该属性对应的值
  ...rest
}) {
  return { name, optional, ...rest };
}

// 对于一个标准的几何元素来说，都具有以下的通道
export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }), // x 坐标
    y: createChannel({ name: 'y', optional: false }), // y 坐标
    stroke: createChannel({ name: 'stroke' }), // 边框颜色
    fill: createChannel({ name: 'fill' }), // 填充颜色
    ...options,
  };
}
