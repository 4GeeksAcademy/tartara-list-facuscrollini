export const initialStore=()=>{
  return{
    login:false,
    all_missions: []
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
  

    case 'login':
      return {...store, login:true}

    case 'logout':
      return {...store, login:false}


    case 'save_all_user_missions':
      return {...store, all_missions: action.payload}

    case 'save_new_user_mission':
      return {...store, all_missions: [...store.all_missions, action.payload]}

    default:
      throw Error('Unknown action.');
  }    
}
