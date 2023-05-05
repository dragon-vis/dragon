import { createBand } from './band';

// Point 比例尺是一种特殊的 Band 比例尺，它的 Padding 始终为 1，也就是说它的 BandWidth 始终为 0
// Point 比例尺主要用于散点图
export function createPoint(options) {
  return createBand({ ...options, padding: 1 });
}
