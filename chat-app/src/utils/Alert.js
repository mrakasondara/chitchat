import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const AlertSuccess = (title) => {
  return Toast.fire({
    icon: "success",
    iconColor: "green",
    title,
  });
};

const AlertError = (title) => {
  return Toast.fire({
    icon: "error",
    iconColor: "red",
    title,
  });
};

export { AlertError, AlertSuccess };
