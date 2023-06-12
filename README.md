# Vue 3 + Vite

# env config

- node 16.14.0

# 使用说明

打包文件(dist 也已经提交，如果打不开，可以直接打开 dist 文件： cd dist; serve)
操作 -> 保存数据到 localstorage -> 刷新页面后会显示保存的结果

# TODO

- 目前暂未遇到性能问题，如果遇到鼠标拖动的时候卡顿，可以添加节流降低事件的执行频次
- store 中数据和 localstorage 中数据的同步：可以使用 vuex-persistedstate,在 store 中数据变更之后自动同步到 localstorage 中
- 清除 localstorage 功能
