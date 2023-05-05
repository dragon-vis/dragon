import { createSVGElement, mount } from './utils';

// 创建上下文
export function createContext(width, height) {
  // 创建画布 svg 节点，并且设置宽高，视口大小
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // 创建挂载 g 节点，并且把该 g 节点挂载到 svg 节点上
  const g = createSVGElement('g');
  mount(svg, g);

  // 返回画布节点和挂载节点
  return {
    node: svg,
    group: g,
  };
}
