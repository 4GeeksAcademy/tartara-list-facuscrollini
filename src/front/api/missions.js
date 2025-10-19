//Fetch para conseguir todas las misiones de un usuario

import API_URL from "./apiUrl";

export const getAllUserMissions = async (user_id) => {
  try {
    const response = await fetch(API_URL + `user/missions?user_id=${user_id}`);

    let data;

    try {
      data = await response.json();
    } catch (error) {
      throw new Error(`Invalid JSON Response from the server`);
    }

    if (!response.ok) {
      const message =
        data?.error || `Request failed with status:  ${response.status}`;

      throw new Error(message);
    }

    return data;
  } catch (error) {
    return {"error": error}
  }
};

//Fetch para conseguir mision especifica de un usuario

export const getUserMission = async () => {
  try {
    const response = await fetch(API_URL);
  } catch (error) {}
};

//Fetch para crear mision de un usuario

export const createUserMission = async (formData) => {
  try {
    const response = await fetch(API_URL + "user/mission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    let data;

    try{
        data =  await response.json()
    } catch(error){
        throw new Error('Fetch has sended a invalid JSON')
    }

    if(!response.ok){
        const message = data?.error || `An error has occurred while fetching ${response.status}`
        throw new Error(message)
    }

    return data

  } catch (error) {
    console.log(`Fetching error: ${error.message}`)
    alert(`Error while fetching : ${error.message} `)
  }
};



//Fetch para eliminar mision de un usuario

export const deleteUserMission = async (deleteData) => {
  try {
    const response = await fetch(API_URL + "user/mission",{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deleteData)
    });

    let data;

    try{
      data = await response.json()
    }catch(data_error){
      throw new Error('Fetch has sended an invalid JSON response')
    }

    if(!response.ok){
      const message = data?.error || `An error has occurred while fetchin: ${response.status} `
      throw new Error(message)
    }

    return data

  } catch (error) {
    return {"error": error}
  }
};

//Fetch para modificar una mision de un usuario

export const modifyUserMission = async (modifyBody) => {
  try {
    const response = await fetch(API_URL + "user/mission", {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(modifyBody)
    });

    let data;

    try {
      data = await response.json()
    } catch (error) {
      throw new Error('Fetch has sended an invalid JSON response')
    }

    if(!response.ok){
      const message = data?.error 
      throw new Error(message)
    }

    return data

  } catch (error) {

    return {'error': error.message}

  }
};

//Fetch para activar/desactivar mision de un usuario

export const switchMissionState = async (missionInfoToSwitch) => {
  try {
    const response = await fetch(API_URL + "user/mission/active", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(missionInfoToSwitch)
    });

    let data;

    try {
      data = await response.json()
    } catch (error) {
      throw new Error('Fetch has sended an invalid JSON response')
    }

    if(!response.ok){
      const message = data?.error
      throw new Error(message)
    }

    return data

  } catch (error) {

    return {'error': error.message}

  }
};

//Fetch para conseguir misiones activas/desactivas de un usuario

export const getAllMissionsByState = async () => {
  try {
    const response = await fetch(API_URL);
  } catch (error) {}
};
