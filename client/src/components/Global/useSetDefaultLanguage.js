import { useEffect } from "react";

const useSetDefaultLanguage = () => {
  const storedDefaultLanguage = localStorage.getItem("defaultLanguage");

  useEffect(() => {
    if (!storedDefaultLanguage) {
      localStorage.setItem("defaultLanguage", "en-gb"); // 设置默认语言为英文
    }
  }, []); // 空依赖数组，确保只在组件首次渲染时执行
};

export default useSetDefaultLanguage;
