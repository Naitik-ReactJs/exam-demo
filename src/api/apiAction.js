import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({ method, url, data }) => {
  try {
    const response = await api({
      method: method,
      url: url,
      data: data,
    });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.message);
  }
};

export default apiAction;
