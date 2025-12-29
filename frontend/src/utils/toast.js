import Swal from "sweetalert2";

// Toast configuration
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Success toast
export const showSuccessToast = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};

// Error toast
export const showErrorToast = (message) => {
  Toast.fire({
    icon: "error",
    title: message,
  });
};

// Warning toast
export const showWarningToast = (message) => {
  Toast.fire({
    icon: "warning",
    title: message,
  });
};

// Info toast
export const showInfoToast = (message) => {
  Toast.fire({
    icon: "info",
    title: message,
  });
};

// Confirmation dialog
export const showConfirmDialog = async (
  title,
  text,
  confirmButtonText = "Yes, delete it!"
) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: confirmButtonText,
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  return result.isConfirmed;
};

// Loading dialog
export const showLoadingDialog = (
  title = "Please wait...",
  text = "Processing your request"
) => {
  Swal.fire({
    title: title,
    text: text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Close loading dialog
export const closeLoadingDialog = () => {
  Swal.close();
};

export default {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showConfirmDialog,
  showLoadingDialog,
  closeLoadingDialog,
};
