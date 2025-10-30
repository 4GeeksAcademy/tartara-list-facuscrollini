export const useStorage = () =>{
    const storage = localStorage.length != 0 ? localStorage : sessionStorage.length != 0 ? sessionStorage : {"user_id": "none"}

    return storage
}