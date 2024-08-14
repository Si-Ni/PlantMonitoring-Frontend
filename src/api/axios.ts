import axios from "axios";

export default axios.create({
  baseURL: "https://plantmonitoringapi.azurewebsites.net/api",
});
