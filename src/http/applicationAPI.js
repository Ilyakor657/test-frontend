import $host from "./index";

export const sendApplication = async (client, product) => {
  const response = await $host.post("/createApplication", {client, product})
  return response
}