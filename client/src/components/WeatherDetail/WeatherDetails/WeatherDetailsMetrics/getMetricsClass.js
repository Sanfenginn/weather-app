function useGetMetricsClass(value, type) {
  const classes = {
    visibility: [
      { range: [0, 1], classNameKey: "very-low" },
      { range: [1, 5], classNameKey: "low" },
      { range: [5, 10], classNameKey: "moderate" },
      { range: [10, 20], classNameKey: "high" },
      { range: [20, Infinity], classNameKey: "very-high" },
    ],
    uv: [
      { range: [0, 2], classNameKey: "low" },
      { range: [3, 5], classNameKey: "moderate" },
      { range: [6, 7], classNameKey: "high" },
      { range: [8, 10], classNameKey: "very-high" },
      { range: [11, Infinity], classNameKey: "extreme" },
    ],
    pressure: [
      { range: [-Infinity, 1000], classNameKey: "low" },
      { range: [1000, 1015], classNameKey: "normal" },
      { range: [1015, 1030], classNameKey: "high" },
      { range: [1030, Infinity], classNameKey: "very-high" },
    ],
  };

  const foundClassKey = classes[type]?.find(
    (desc) => value >= desc.range[0] && value <= desc.range[1]
  )?.classNameKey;

  return foundClassKey || "";
}

export default useGetMetricsClass;
