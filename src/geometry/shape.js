import { dist, sub, equal } from '../utils';
import { contour, ring } from './primitive';
import { line as pathLine, area as pathArea, sector as pathSector } from './d';

export function rect(renderer, coordinate, { x1, y1, x2, y2, ...styles }) {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];

  // 如果坐标系转置了，改变顶点的顺序
  const vs = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps = vs.map(coordinate);
  const [p0, p1, p2, p3] = ps;

  // 笛卡尔坐标系绘制矩形
  if (!coordinate.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles });
  }

  // 获得圆心的位置
  const center = coordinate.center();
  const [cx, cy] = center;

  // 如果角度小于360度
  // 判断的方法是顶点是否重合
  // 绘制扇形
  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: pathSector([center, ...ps]), ...styles });
  }

  // 如果角度等于360度，绘制圆环
  const r1 = dist(center, p2); // 内半径
  const r2 = dist(center, p0); // 外半径
  return ring(renderer, { cx, cy, r1, r2, ...styles });
}

// 绘制不同坐标系下面的圆
// 绘制圆的函数和渲染器里面绘制圆的区别在于
// 这里需要考虑坐标系
export function circle(renderer, coordinate, { cx, cy, r, ...styles }) {
  // 对圆心进行坐标系变换
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
}

// 每一条线是一条 path，这条 path 的点由直线的点构成
export function line(renderer, coordinate, { X, Y, I: I0, ...styles }) {
  // 在极坐标系下这条线需要闭合，所以需要将第一个点加入到最后
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  // 根据坐标系将数据点转换为实际坐标点
  const points = I.map((i) => coordinate([X[i], Y[i]]));
  // 根据点的集合生成 SVG 的 path 字符串
  const d = pathLine(points);
  // 调用渲染器的 path 方法绘制折线图，并将样式应用到图形上
  return renderer.path({ d, ...styles });
}

// 绘制每一个区域的时候我们也需要针对不同的坐标系使用不同的绘制方式。和线一样，在极坐标系下我们也需要把区域的首尾连接起来
export function area(renderer, coordinate, { X1, Y1, X2, Y2, I: I0, ...styles }) {
  // 连接首尾
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  // 将点按照顺时针方向排列
  const points = [
    ...I.map((i) => [X1[i], Y1[i]]),
    ...I.map((i) => [X2[i], Y2[i]]).reverse(),
  ].map(coordinate);

  // 如果是在极坐标系下，绘制等高线
  if (coordinate.isPolar()) {
    return contour(renderer, { points, ...styles });
  }
  // 否则直接绘制区域
  return renderer.path({ d: pathArea(points), ...styles });
}

// 绘制文本的函数
export function text(renderer, coordinate, { x, y, rotate, text, ...styles }) {
  // 将传入的坐标进行转换
  const [px, py] = coordinate([x, y]);
  // 保存画布状态
  renderer.save();
  // 平移画布到目标坐标位置
  renderer.translate(px, py);
  // 旋转画布
  renderer.rotate(rotate);
  // 使用传入的样式参数绘制文本
  const textElement = renderer.text({ text, x: 0, y: 0, ...styles });
  // 恢复画布状态
  renderer.restore();
  // 返回绘制的文本元素
  return textElement;
}

// 将起始点 (x1, y1) 和终止点 (x2, y2) 经过坐标变换后，用指定的样式绘制一条线段
export function link(renderer, coordinate, { x1, y1, x2, y2, ...styles }) {
  // 将起始点和终止点经过坐标变换后得到新的点
  const [p0, p1] = [[x1, y1], [x2, y2]].map(coordinate);
  // 使用渲染器绘制一条线段，起始点和终止点分别为新的点的坐标
  return renderer.line({ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles });
}

export function path(renderer, coordinate, attributes) {
  return renderer.path(attributes);
}
