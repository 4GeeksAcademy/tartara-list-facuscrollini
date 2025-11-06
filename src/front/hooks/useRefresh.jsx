import { saveFriendships, saveRequestsFrom, saveRequestsTo } from "../services/friendships"

export const useRefresh = async (user_id, dispatch, switchLoading) => {

    await saveRequestsFrom(user_id, dispatch, switchLoading)
    await saveRequestsTo(user_id, dispatch, switchLoading)
    await saveFriendships(dispatch, user_id)

}