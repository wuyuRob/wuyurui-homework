module.exports = {
  // 手动切换暗模式
  darkMode: "class",
  // tailwind的应用范围
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: ["0.25rem", "0.35rem"],
        sm: ["0.35rem", "0.45rem"],
        base: ["0.42rem", "0.52rem"],
        lg: ["0.55rem", "0.65rem"],
        xl: ["0.65rem", "0.75rem"],
      },
    },
  },
};
