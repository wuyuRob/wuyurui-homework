/**
 * 存储数据
 */
export const setItem = (key, value) => {
  let result = {};
  Object.entries(value).forEach(([key, v]) => {
    result[key] = [...v];
  });
  window.localStorage.setItem(key, JSON.stringify(result));
};

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    const result = {};
    Object.entries(JSON.parse(data)).forEach(([key, v]) => {
      result[key] = new Set(v);
    });
    return result;
  } catch (err) {
    return data;
  }
};

/**
 * 删除数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const removeAllItem = (key) => {
  window.localStorage.clear();
};
