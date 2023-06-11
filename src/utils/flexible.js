import { computed } from "vue";
import { PC_DEVICE_WIDTH } from "../constants/index";
import { useWindowSize } from "@vueuse/core";
/**
 * 判断当前是否为移动设备
 * 根据屏幕宽度是否小于一个指定宽度（1280）
 * 为了保证这个的灵活性，使用一个计算属性computed
 */
const { width } = useWindowSize();

export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH;
});

/**
 * 动态指定rem基准值，最大为40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值赋值给html根标签作为font-size大小
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 40;

  document.addEventListener("DOMContentLoaded", () => {
    // 拿到html标签
    const html = document.querySelector("html");
    // 计算fontSize,屏幕宽度 / 10。（以 Iphone 为例 Iphone 6 屏幕宽度为 375，则标准 fontSize 为 37.5）
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    // 赋值给html标签
    html.style.fontSize = fontSize + "px";
  });
};
