import { useSpring } from "react-spring";

// 简单淡入淡出动画
export function useSimpleFadeIn(key, delay = 300) {
  return useSpring({
    ...(key && { key: key }), // 如果传入了key，则使用key强制重新渲染
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: delay,
  });
}

// 弹性和延迟动画
export function useElasticFadeIn(
  key,
  delay = 300,
  tension = 170,
  friction = 12
) {
  return useSpring({
    ...(key && { key: key }),
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: tension, friction: friction },
    delay: delay,
  });
}

// 创建滚动出现的动画
export function useSlideUpDescription(
  key,
  delay = 300,
  fromTransformY = "translateY(20px)",
  toTransformY = "translateY(0)"
) {
  return useSpring({
    ...(key && { key: key }),
    from: { transform: fromTransformY, opacity: 0 },
    to: { transform: toTransformY, opacity: 1 },
    delay: delay,
  });
}

// 使用useSpring创建一个动画，从fromNum到value
export function useGrowNum(
  key,
  fromNum = 0,
  value,
  delay = 300,
  tension = 280,
  friction = 60
) {
  return useSpring({
    ...(key && { key: key }),
    from: { number: fromNum },
    number: value,
    delay: delay, // 设置动画延迟开始的时间
    config: { tension: tension, friction: friction }, // 调整弹性参数
  });
}

// 小变大动画
export function useGrowAnimation(
  key,
  delay = 300,
  fromScale = 0.5,
  toScale = 1
) {
  return useSpring({
    ...(key && { key: key }),
    from: { transform: `scale(${fromScale})`, opacity: 0 },
    to: { transform: `scale(${toScale})`, opacity: 1 },
    delay: delay,
    config: { tension: 170, friction: 12 },
  });
}
