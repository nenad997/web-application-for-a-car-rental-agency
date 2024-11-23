import { toast } from "react-toastify";

export function generateToast(message, styles = null) {
  toast(message, {
    style: {
      backgroundColor: "lightgreen",
      color: "black",
      fontSize: "15px",
      ...styles,
    },
  });
}
