import { useStorage } from "./useStorage"

export const useLogout = (dispatch) => {
    useStorage().removeItem("token")
    useStorage().removeItem("user_name")
    useStorage().removeItem("user_id")
    useStorage().removeItem("email")
    dispatch({ type: "logout" })

}