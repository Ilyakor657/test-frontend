import $host from "./index";

export const paymentSchedule = async (client, amount, period, dateOpen) => {
  const response = await $host.post("/paymentReport", {client, infoLoan: {amount, period, dateOpen, rate: process.env.REACT_APP_LOAN_RATE}})
  return response
}