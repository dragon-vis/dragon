// 在值域计算出相应的输出（插值）
export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}

// 给定 t 值（0 到 1 之间）、两个十六进制颜色值 d0 和 d1，返回在这两个颜色值之间插值后的十六进制颜色值
export function interpolateColor(t, d0, d1) {
  // 将十六进制颜色值转换为 RGB 数组
  const [r0, g0, b0] = hexToRgb(d0);
  const [r1, g1, b1] = hexToRgb(d1);
  // 将 RGB 数组中的每一个元素分别进行线性插值
  const r = interpolateNumber(t, r0, r1);
  const g = interpolateNumber(t, g0, g1);
  const b = interpolateNumber(t, b0, b1);
  // 将 RGB 值转换为十六进制颜色值
  return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
}

// 将十六进制颜色值转换为 RGB 数组
function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}

// 将 RGB 值转换为十六进制颜色值
function rgbToHex(r, g, b) {
  /**
   * 这一行代码将 RGB 颜色值转换成十六进制颜色值。RGB 颜色值由红色（r）、绿色（g）和蓝色（b）组成，每个颜色通道的值范围都是 0 到 255。
   *
   * 转换成十六进制颜色值时，将红色、绿色、蓝色的值按顺序排列，并将它们转换成 16 进制数，然后将它们拼接在一起即可。
   * 例如，如果红色、绿色、蓝色的值分别是 255、128 和 0，那么对应的十六进制颜色值就是 ff8000。
   *
   * 在这段代码中，首先通过位运算符将红色、绿色、蓝色的值拼接在一起，具体来说，红色的值占据高位（左边的位），蓝色的值占据低位（右边的位），绿色的值则位于中间。
   * 位运算符 |（按位或）的作用是将每个值转换成二进制数，然后将它们的对应位进行或运算，最终得到一个新的二进制数。
   * 例如，如果红色的值是 255，即二进制数为 11111111，绿色的值是 128，即二进制数为 10000000，蓝色的值是 0，即二进制数为 00000000，
   * 那么通过按位或运算得到的结果就是二进制数 111111111000000000000000，即十六进制数 ff8000。
   *
   * 接下来使用 toString(16) 方法将拼接好的数值转换成 16 进制字符串。
   * 最后使用字符串模板拼接字符串 '#0RRGGBB'，其中 0 是为了在前面补 0，确保字符串长度为 7（包括 # 符号），RR、GG、BB 分别是红、绿、蓝三个颜色通道的十六进制表示。
   */
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  // 在十六进制颜色值的前面补零，确保字符串长度为 7（包括 # 符号）
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
}
