import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({ method, url, data, setLoading, token }) => {
  try {
    const response = await api({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data: data,
      headers: {
        "access-token": token,
      },
    });

    if (response.data.statusCode !== 200) {
      toast.error(response.data.message);
    }
    setLoading(false);
    localStorage.setItem("user-info", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    setLoading(false);
    toast.error(error.message);
  }
};

export default apiAction;
