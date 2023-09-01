import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({
  method,
  url,
  data,
  redirect,
  navigate,
  setLoading,
}) => {
  try {
    const response = await api({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data: data,
    });

    if (response.data.statusCode === 200) {
      navigate(redirect);
    } else {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 500);
    }
    setLoading(false);
    localStorage.setItem("user-info", JSON.stringify(response.data.data));
  } catch (error) {
    setLoading(false);
    toast.error(error.message);
  }
};

export default apiAction;
