import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({ method, url, data, setLoading, storageKey, id }) => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  setLoading(true);
  try {
    const response = await api({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${url}`,
      data: data,
      headers: {
        "access-token": token,
      },
      params: {
        id: id,
      },
    });

    if (response.data.statusCode !== 200) {
      toast.error(response.data.message);
    }
    if (response.data.statusCode === 401) {
      toast.warning("error");
    }
    setLoading(false);
    if (storageKey) {
      sessionStorage.setItem(storageKey, JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    setLoading(false);

    toast.error(error.message);
  }
};

export default apiAction;
