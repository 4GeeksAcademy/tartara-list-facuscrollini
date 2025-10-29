export const initialStore = () => {
  return {
    login: false,
    allMissions: [],
    friendships: [],
    loading: false,
    requests_from: [],
    requests_to: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    //Cases login y user

    case "login":
      return { ...store, login: true };

    case "logout":
      return {
        login: false,
        allMissions: [],
        friendships: [],
        loading: false,
        requests_from: [],
        requests_to: [],
      };

    //Case loading

    case "loading":
      return { ...store, loading: !store.loading };

    //Cases user missions

    case "save_all_user_missions":
      return { ...store, allMissions: action.payload };

    case "save_new_user_mission":
      return { ...store, allMissions: [...store.allMissions, action.payload] };

    case "delete_user_mission":
      const allMissions = store.allMissions;

      const allMissionsWithoutDeleted = allMissions.filter(
        (mission) => mission.id != action.payload
      );
      return { ...store, allMissions: allMissionsWithoutDeleted };

    case "edit_user_mission":
      return {
        ...store,
        allMissions: store.allMissions.map((mission) => {
          if (mission.id == action.payload.id) {
            return action.payload;
          }
          return mission;
        }),
      };

    case "switch_state_user_mission":
      return {
        ...store,
        allMissions: store.allMissions.map((mission) => {
          if (mission.id == action.payload) {
            return { ...mission, is_active: !mission.is_active };
          }
          return mission;
        }),
      };

    //Cases friendship

    case "save_friendships":
      return { ...store, friendships: action.payload };

    //Cases friendship missions

    case "delete_friendship_mission":
      return {
        ...store,
        friendships: store.friendships.map((friendship) => {
          if (friendship.id === action.payload.friendship_id) {
            return {
              ...friendship,
              friendship_missions: friendship.friendship_missions.filter(
                (mission) => {
                  return mission.id != action.payload.friendship_mission_id;
                }
              ),
            };
          }
          return friendship;
        }),
      };

    case "save_friendship_mission":
      return {
        ...store,
        friendships: store.friendships.map((friendship) => {
          if (friendship.id === action.payload.friendship_id) {
            return {
              ...friendship,
              friendship_missions: [
                ...friendship.friendship_missions,
                action.payload.data,
              ],
            };
          }
          return friendship;
        }),
      };

    case "edit_friendship_mission":
      return {
        ...store,
        friendships: store.friendships.map((friendship) => {
          if (friendship.id == action.payload.friendship_id) {
            return {
              ...friendship,
              friendship_missions: friendship.friendship_missions.map(
                (mission) => {
                  if (mission.id == action.payload.data.id) {
                    return action.payload.data;
                  }
                  return mission;
                }
              ),
            };
          }
          return friendship;
        }),
      };

    case "switch_state_friendship_mission":
      return {
        ...store,
        friendships: store.friendships.map((friendship) => {
          if (friendship.id == action.payload.friendship_id) {
            return {
              ...friendship,
              friendship_missions: friendship.friendship_missions.map(
                (mission) => {
                  if (mission.id === action.payload.mission_id) {
                    return { ...mission, is_active: !mission.is_active };
                  }
                  return mission;
                }
              ),
            };
          }
          return friendship;
        }),
      };

    case "save_requests_from":
      return { ...store, requests_from: action.payload };

    case "save_requests_to":
      return { ...store, requests_to: action.payload };

    case "delete_request":

      const fromRequest = store.requests_from.find(
        (request) => request.friendship_request_id == action.payload
      );

      const toRequest = store.requests_to.find(
        (request) => request.friendship_request_id == action.payload
      );

      let requests;

      if (fromRequest) {
        requests = store.requests_from.filter(
          (request) => request.friendship_request_id != action.payload
        );


        return { ...store, requests_from: requests };
      } else if (toRequest) {
         requests = store.requests_to.filter(
          (request) => request.friendship_request_id != action.payload
        );

        return { ...store, requests_to: requests };
      }

    case "send_request":

      return {...store, requests_from: [...store.requests_from, action.payload]}

    case "add_friendship":

      return {...store, friendships: [...store.friendships, action.payload]}

    default:
      throw Error("Unknown action.");
  }
}
