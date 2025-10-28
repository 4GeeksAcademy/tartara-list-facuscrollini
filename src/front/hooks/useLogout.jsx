import { useStorage } from "./useStorage"

export const useLogout = () => {
    useStorage().removeItem("token")
    useStorage().removeItem("user_name")
    useStorage().removeItem("user_id")
    dispatch({ type: "logout" })

}