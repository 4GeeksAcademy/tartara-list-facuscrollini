export const initialStore = () => {
  return {
    login: false,
    allMissions: [],
    friendshipMissions:{}
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return { ...store, login: true };

    case "logout":
      return { ...store, login: false };

    case "save_all_user_missions":
      return { ...store, allMissions: action.payload };

    case "save_new_user_mission":
      return { ...store, allMissions: [...store.allMissions, action.payload] };

    case "delete_user_mission":
      const allMissions = store.allMissions;

      const allMissionsWithoutDeleted = allMissions.filter(
        mission=> mission.id != action.payload
      );
      return { ...store, allMissions: allMissionsWithoutDeleted};

    case "edit_user_mission":
  
      return {...store, allMissions: store.allMissions.map((mission)=>{
        if(mission.id == action.payload.id){
          return action.payload
        }
        return mission  
      })}

    case "switch_state_user_mission":

      return {...store, allMissions: store.allMissions.map((mission)=>{
        if(mission.id == action.payload){
          return {...mission, is_active: !mission.is_active}
        }
        return mission
      })}

    case "save_friendship_missions":

      return {...store, friendshipMissions : action.payload }


    default:
      throw Error("Unknown action.");
  }
}
