import { toast } from "react-toastify";

export function generateToast(message) {
  toast(message, {
    style: {
      backgroundColor: "lightgreen",
      color: "black",
      fontSize: "15px",
    },
  });
}
