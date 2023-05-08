/**
 * 创建几何图形的函数
 * @param {Object} channels 表示所有通道信息的对象，其中包含每个通道的比例尺类型和是否必选等信息
 * @param {Function} render 用于渲染几何图形的函数
 * @return {Function} 返回一个创建对应几何图形的函数 geometry
 */
export function createGeometry(channels, render) {
  /**
 * @param {Renderer} renderer 渲染引擎
 * @param {number []} I 索引数组
 * @param {[key:string] Scale} scales 每个通道用到的 scale
 * @param {[key:string]: number[]} values 每个通道需要渲染的值
 * @param {[key: string]: string} directStyles 图形的和通道无关的样式
 * @param {Coordinate} coordinate 使用的坐标系
 * @returns 渲染的 SVG 元素
 */
  const geometry = (renderer, I, scales, values, styles, coordinate) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      // 只有必选的通道才会被检查
      if (!optional) {
        // 如果没有提供对应的值就抛出异常
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        // 目前只用判断一下 band 比例尺
        if (scale === 'band' && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render(renderer, I, scales, values, styles, coordinate);
  };

  // 将需要的通道返回
  geometry.channels = () => channels;

  return geometry;
}
