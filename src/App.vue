<template>
  <div class="container mx-auto mt-2">
    <HomeWork ref="homeWork" v-model="selectedData" />
    <div class="m-2">
      <button
        @click="showSelectedData"
        class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-1 px-2 rounded mr-1"
      >
        显示选中的数据
      </button>
      <button
        @click="saveSelectedData"
        class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-1 px-2 rounded"
      >
        保存选中数据到localstorage
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import HomeWork from "./components/HomeWork.vue";

const homeWork = ref(null);
const showSelectedData = () => {
  alert(JSON.stringify(homeWork.value.getTimeResultList()));
};
const store = useStore();
const selectedData = store.state.homework.selectedData;
const saveSelectedData = () => {
  store.commit("homework/setSelectedData", homeWork.value.getSelectData());
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
