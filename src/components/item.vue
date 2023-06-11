<template>
  <div>
    {{ selectedItems }}
    <ul class="flex">
      <li
        class="p-1 border"
        v-for="(item, index) in dataA"
        :key="index"
        :class="{ selected: isSelected(index) }"
        @mousedown="startSelection(index)"
        @mouseup="endSelectItem(index)"
        @mouseover="selectItem(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

/**
 * 点击一个元素，如果元素已经被选中，则取消选中，否则选中
 * 点击一个元素，如果这一行有选中的元素，则选中这一行的所有元素，否则取消选中
 * 拖拽 多选 选中
 *  如果拖拽选中的元素中有已经选中的
 * 拖拽选中的效果：按下按钮时，开始选择，移动时，选中元素，松开按钮时，结束选择
 * 根据首次拖拽的时候是选中还是取消选中，来决定后续的操作
 */

const dataA = [1, 2, 3, 4, 5, 6, 7];
const selectedItems = reactive(new Set());
let isDragSelecting = false;

const isSelected = (index) => {
  return selectedItems.has(index);
};
// 鼠标拖拽事件
const startSelection = (index) => {
  isDragSelecting = true;
  handleIndex(index);
};
const endSelectItem = (index) => {
  isDragSelecting = false;
};
const selectItem = (index) => {
  if (isDragSelecting) {
    handleIndex(index);
  }
};
const handleIndex = (index) => {
  if (selectedItems.has(index)) {
    selectedItems.delete(index);
  } else {
    selectedItems.add(index);
  }
};
</script>

<style lang="scss">
li {
  user-select: none;
}
li.selected {
  background-color: #e2e8f0;
}
</style>
