<template>
  <table class="border-collapse border">
    <thead>
      <tr>
        <th class="border p-2 text-lg text-right" colspan="50">
          <span class="w-4 text-sm mr-1">
            <span
              class="w-3 inline-block h-[8px] bg-blue-400 rounded mr-1 align-middle"
              >&nbsp</span
            >
            <span>已选</span>
          </span>
          <span class="w-4 text-sm">
            <span
              class="w-3 inline-block h-[8px] bg-blue-50 rounded mr-1 align-middle"
              >&nbsp</span
            >
            <span>可选</span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2" class="border p-2 text-lg font-bold w-14">
          <span class="">星期/时间</span>
        </td>
        <td class="border p-2 text-lg text-center" colspan="24">
          00:00 - 12:00
        </td>
        <td class="border p-2 text-lg text-center" colspan="24">
          12:00 - 24:00
        </td>
      </tr>
      <tr>
        <td v-for="index in 24" :key="index" colspan="2">
          <div class="p-0 text-sm text-center w-4">{{ index - 1 }}</div>
        </td>
      </tr>
      <tr v-for="(weekItem, weekIndex) in WEEKS" :key="weekIndex">
        <td class="border p-2 text-lg">{{ weekItem }}</td>
        <td
          class="p-0"
          v-for="(dataItem, dataIndex) in DATA_LENGTH"
          :key="dataIndex"
          :class="{
            selected: isSelected(weekIndex, dataIndex),
            unselected: !isSelected(weekIndex, dataIndex),
          }"
          @mousedown="startSelection(weekIndex, dataIndex)"
          @mouseup="endSelectItem(weekIndex, dataIndex)"
          @mouseover="selectItem(weekIndex, dataIndex)"
        ></td>
      </tr>
      <tr>
        <td
          v-if="Object.keys(timeResultList).length === 0"
          class="text-lg text-center text-gray-300"
          colspan="50"
        >
          可拖动鼠标选择时间段
        </td>
        <td
          v-else
          class="text-lg text-left text-gray-300 relative"
          colspan="50"
        >
          <span
            class="text-blue-500 text-sm absolute right-1 top-1 z-50"
            @click="clearData"
            >清空</span
          >
          <ul>
            <li
              class="m-1 w-full overflow-hidden break-all pr-4"
              v-for="(time, resultIndex) in timeResultList"
              :key="resultIndex"
            >
              {{ WEEKS[resultIndex] }}: {{ time }}
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const WEEKS = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const DATA_LENGTH = 48;
</script>
<script setup>
import { ref, reactive, watch, defineExpose, toRaw } from "vue";

const generateData = (i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const nextHour = Math.floor((i + 1) / 2);
  const nextMinute = (i + 1) % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}~${nextHour}:${nextMinute}`;
};

const props = defineProps({
  modelValue: {
    type: Object,
    required: () => ({}),
  },
});
const emits = defineEmits(["update:modelValue"]);

const resultDataList = reactive(props.modelValue);

const timeResultList = ref({});
watch(
  resultDataList,
  (newVal) => {
    let result = {};
    for (const key in newVal) {
      const innerObj = newVal[key];
      let str = "";
      for (const item of innerObj) {
        str += `${generateData(item)},`;
      }
      result[key] = str;
    }
    timeResultList.value = result;
  },
  { immediate: true }
);

// 拖拽选中逻辑
let isDragSelecting = false;

const isSelected = (weekIndex, index) => {
  return resultDataList[weekIndex] && resultDataList[weekIndex].has(index);
};
// 鼠标拖拽事件
const startSelection = (weekIndex, dataIndex) => {
  if (!resultDataList[weekIndex]) {
    resultDataList[weekIndex] = new Set();
  }
  isDragSelecting = true;
  handleIndex(weekIndex, dataIndex);
};
const endSelectItem = (weekIndex, index) => {
  isDragSelecting = false;
  emits("update:modelValue", resultDataList);
};
const selectItem = (weekIndex, index) => {
  if (isDragSelecting) {
    handleIndex(weekIndex, index);
  }
};
const handleIndex = (weekIndex, index) => {
  if (!resultDataList[weekIndex]) {
    return;
  }
  if (resultDataList[weekIndex].has(index)) {
    resultDataList[weekIndex].delete(index);
  } else {
    resultDataList[weekIndex].add(index);
  }
  if (resultDataList[weekIndex].size === 0) {
    delete resultDataList[weekIndex];
  }
};
// 清空
const clearData = () => {
  Object.keys(resultDataList).forEach((key) => delete resultDataList[key]);
  emits("update:modelValue", resultDataList);
};
const getSelectData = () => {
  return toRaw(resultDataList);
};
const getTimeResultList = () => {
  return timeResultList;
};
defineExpose({
  getSelectData,
  getTimeResultList,
});
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  user-select: none;
  &.selected {
    background-color: rgb(96, 165, 250);
  }
  &.unselected {
    background-color: rgb(239, 246, 255);
  }
}
</style>
