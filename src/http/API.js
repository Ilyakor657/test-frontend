import $host from "./index";

export const sendApplication = async (client, product) => {
  const response = await $host.post("/index.php", {client, product})
  return response
}