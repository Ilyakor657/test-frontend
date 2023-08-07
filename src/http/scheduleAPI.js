import $host from "./index";

export const paymentSchedule = async (amount, period, dateOpen) => {
  const response = await $host.post("/paymentSchedule", {amount, period, dateOpen, rate: process.env.REACT_APP_LOAN_RATE})
  return response
}