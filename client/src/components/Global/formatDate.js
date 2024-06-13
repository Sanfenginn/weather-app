import moment from "moment-timezone";

const formatDate = (date, format) => {
  return moment(date).format(format);
};

export default formatDate;
