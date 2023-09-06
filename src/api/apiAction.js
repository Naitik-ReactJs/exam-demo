import api from "./api";
import { toast } from "react-toastify";

const apiAction = async ({
  method,
  url,
  data,
  setLoading,
  token,
  storageKey,
  id,
}) => {
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

    setLoading(false);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(response.data.data));
    }
    return response.data;
  } catch (error) {
    setLoading(false);
    toast.error(error.message);
  }
};

export default apiAction;
// function App() {
//   const [controller, setController] = useState(new AbortController()); // Initialize with an AbortController
//   const [users, setData] = useState([]);

//   const getApiData = async () => {
//     controller.abort(); // Abort the previous request
//     const newController = new AbortController(); // Create a new controller
//     setController(newController); // Update the controller state

//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/users",
//         {
//           signal: newController.signal,
//         }
//       );
//       setData(response.data);
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log("Previous request was aborted");
//       } else {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };
