import { SELECT_DATA } from "@/constants/index.js";
import { getItem, setItem } from "@/utils/storage";
export default {
  namespaced: true,
  state: () => ({
    selectedData: getItem(SELECT_DATA) || {},
  }),
  mutations: {
    setSelectedData(state, data) {
      setItem(SELECT_DATA, data);
    },
  },
  actions: {},
};
