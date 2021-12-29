let API_SERVER_VAL = "";
const dev = "http://localhost:5000";
const baseURL =
  window.location.hostname.split(":")[0] === "localhost" ? dev : "";

switch (process.env.NODE_ENV) {
  case "development":
    API_SERVER_VAL = baseURL;
    break;
  case "production":
    API_SERVER_VAL = baseURL;
    break;
  default:
    API_SERVER_VAL = baseURL;
    break;
}

export const API_SERVER = API_SERVER_VAL;
export default baseURL;
