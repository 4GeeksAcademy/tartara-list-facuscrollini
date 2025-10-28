export const useStorage = () =>{
    const storage = localStorage || sessionStorage
    return storage
}