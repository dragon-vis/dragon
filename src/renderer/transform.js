import { applyTransform, createSVGElement, mount } from '../utils';

// 定义一个 transform 函数，参数为变换种类 type，操作上下文 context，以及需要的变换参数 params
function transform(type, context, ...params) {
  // 获取操作上下文中的 group
  const { group } = context;
  // 调用 utils 中的 applyTransform 函数，给 group 应用相应的变换
  applyTransform(group, `${type}(${params.join(', ')})`);
}

// 定义 translate 函数，操作上下文为 context，移动的距离为 tx, ty
export function translate(context, tx, ty) {
  // 调用 transform 函数，变换种类为 translate，传入 tx 和 ty
  transform('translate', context, tx, ty);
}

// 定义 rotate 函数，操作上下文为 context，旋转的角度为 theta
export function rotate(context, theta) {
  // 调用 transform 函数，变换种类为 rotate，传入 theta
  transform('rotate', context, theta);
}

// 定义 scale 函数，操作上下文为 context，缩放的比例为 sx 和 sy
export function scale(context, sx, sy) {
  // 调用 transform 函数，变换种类为 scale，传入 sx 和 sy
  transform('scale', context, sx, sy);
}

// 定义 save 函数，用于保存操作上下文的当前状态
export function save(context) {
  // 获取操作上下文中的 group
  const { group } = context;
  // 创建一个新的 g 元素
  const newGroup = createSVGElement('g');
  // 将新的 g 元素挂载到当前的 group 中
  mount(group, newGroup);
  // 更新操作上下文中的 group
  context.group = newGroup;
}

// 定义 restore 函数，用于恢复操作上下文的状态
export function restore(context) {
  // 获取操作上下文中的 group
  const { group } = context;
  // 获取当前 group 的父元素
  const { parentNode } = group;
  // 更新操作上下文中的 group 为父元素
  context.group = parentNode;
}
