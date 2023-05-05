// “恒等映射”，也就是将输入原封不动的返回
export function createIdentity() {
  return (x) => x;
}
