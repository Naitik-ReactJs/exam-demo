import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({ method, url, data }) => {
  try {
    const response = await api({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data: data,
    });
    toast.success(response.data.message);
    localStorage.setItem("user-info", JSON.stringify(response.data.data));
  } catch (error) {
    toast.error(error.message);
  }
};

export default apiAction;
