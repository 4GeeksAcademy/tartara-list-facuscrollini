import API_URL from "./apiUrl" 

const FETCH_URL = `${API_URL}friendship/mission`



//Funcion que hace fetch a cada solicitud

//method puede ser: "GET", "POST", "PATCH", "DELETE"


export const fetchFriendshipMission = async(fetchData, method, state)=>{
 

    const optionsObject = method == "GET"? {
        method : method
    } : {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(fetchData)
    }

    
    try {
     
            const response = await fetch(`${FETCH_URL}${method == "GET" ? `s?friendship_id=${fetchData.friendship_id}` : state ? "/active" : ""}`, optionsObject)

      
        let data;

        try {
            data =  await response.json()
        } catch (error) {
            throw new Error('Fetch has sended an invalid JSON response')
        }

        if(!response.ok){
            const message = data?.error
            throw new Error(message)
        }

        return data

    } catch (error) {
        return {error: error.message}
    }
}


