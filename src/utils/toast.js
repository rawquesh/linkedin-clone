import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showToast({ type, message, ...props }) {
  console.log(message);
  if (type === undefined) {
    return toast(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...props,
    });
  }
  if (type === "success") {
    return toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...props,
    });
  }
  if (type === "warning") {
    return toast.warn(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...props,
    });
  }
  if (type === "error") {
    return toast.error(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...props,
    });
  }
}
