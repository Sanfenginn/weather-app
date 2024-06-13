/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 确保包括所有需要处理的文件
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      myfont: ["ALiMaMa", "sans-serif"],
    },
    extend: {
      colors: {
        customBlue: "#1DA1F2",
        customGray: "#657786",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "custom-image":
          "url('/public/assets/images/background-for-body/11.png')", // 添加自定义背景图片
        // London: "url('/public/assets/images/city-icon/London.png')",
        // Newyork: "url('/public/assets/images/city-icon/Newyork.png')",
        // Shanghai: "url('/public/assets/images/city-icon/Shanghai.png')",
        // Sydney: "url('/public/assets/images/city-icon/Sydney.png')",
      },
      borderRadius: {
        custom: "12px", // 自定义圆角值
        "4xl-custom": "50px",
      },
      width: {
        40: "40%",
        60: "60%",
        70: "70%",
        10: "10%",
        20: "20%",
        25: "25%",
        65: "65%",
        15: "15%",
        90: "90%",
        80: "80%",
        85: "85%",
        50: "50%",
        5: "5%",
        75: "75%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
