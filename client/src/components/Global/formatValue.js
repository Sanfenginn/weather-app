const formatValue = (value, type) => {
  if (value == null) {
    return ""; // 或者其他的默认值，如 'N/A'
  }

  const defaultUnit = localStorage.getItem("unit");
  const defaultLanguage = localStorage.getItem("defaultLanguage");

  const isMetric = defaultUnit === "Metric";
  const isChinese = defaultLanguage && defaultLanguage.startsWith("zh");

  switch (type) {
    case "temp":
      return isMetric
        ? `${value.toFixed(0)}°`
        : `${((value * 9) / 5 + 32).toFixed(0)}°`;
    case "wind":
      return isMetric ? `${value.toFixed(0)}km/h` : `${value.toFixed(0)}mph`;
    case "percentage":
      return `${value.toFixed(0)}%`;
    case "pm2.5":
      return `${value.toFixed(0)}µg/m³`;
    case "pressure":
      return isMetric
        ? isChinese
          ? `${value.toFixed(0)} 百帕`
          : `${value.toFixed(0)} hPa`
        : isChinese
        ? `${(value * 0.02953).toFixed(2)} 英寸汞柱`
        : `${(value * 0.02953).toFixed(2)} inHg`;
    case "visibility":
      return isMetric
        ? isChinese
          ? `${value.toFixed(0)} 公里`
          : `${value.toFixed(0)} km`
        : isChinese
        ? `${(value * 0.621371).toFixed(0)} 英里`
        : `${(value * 0.621371).toFixed(0)} mi`;
    default:
      return value.toFixed(0);
  }
};

export default formatValue;
