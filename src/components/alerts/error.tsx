import Swal from 'sweetalert2';

const errorAlert = (type: string, status: string = "", message: string = "") => {
    ///=============================================================
    // Error Alerts with use of sweetalert
    ///=============================================================
    //
    let text: string;
    let button_text: string = "Retry";
    //
    //Type of Alerts messages
    switch (status) {
        case "non200":
        text = `Upload ${type} failed ${message}.`;
        break;
        case "nonauth":
        text = `Authentication failed ${message}. Please Login again.`;
        button_text = "Close";
        break;
        case "logout":
        text = `Attempt to logout failed ${message}.`;
        break;
        default:
        text=`Error uploading the ${type}: ${message}`;
        break;
    }
    ///------------------------------
    // Sweetalert
    ///------------------------------
    const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: true,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "error",
        title: text,
        showConfirmButton: true,
        confirmButtonText: button_text,
        confirmButtonColor: 'red'});
}

export default errorAlert