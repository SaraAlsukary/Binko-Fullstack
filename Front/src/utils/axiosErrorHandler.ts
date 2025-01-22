import { isAxiosError } from "node_modules/axios/index";
const axiosErrorHandler = (error: unknown) => {
    if (isAxiosError(error)) {
        return (
            error.response?.data || error.response?.data.message || error.message
        );
    } else {
        return "An unexpected error";
    }
};

export default axiosErrorHandler;
