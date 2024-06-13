const adjustCityName = (city) => {
  switch (city) {
    case "Shanghaishih":
      return "Shanghai";
    case "Luan":
      return "Lu'an";
    case "Newyork":
      return "New York";
    default:
      return city;
  }
};

export default adjustCityName;
