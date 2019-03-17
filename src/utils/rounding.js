import moment from "moment";

// Rounding
export const roundTwoDecimals = num => Math.round(num * 100) / 100;
export const roundSatoshiDecimals = num =>
  Math.round(num * 100000000) / 100000000;

// Rounding time / moments
export const roundMoment = (date, duration, mathMethod) =>
  moment(Math[mathMethod](date / duration) * duration);
