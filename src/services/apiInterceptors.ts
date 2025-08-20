import axios from "axios";
import { BASE_URL } from "./config";
import { refreshTokens } from "./authService";
import { Alert } from "react-native";
import { tokenStorage } from "@states/storage";


export const appAxios = axios.create({
    baseURL : BASE_URL
})


appAxios.interceptors.request.use(async config => {
    const accessToken = tokenStorage.getString('accessToken')
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

appAxios.interceptors.response.use(
    response=>response,
    async error =>{
        const new_access_token = await refreshTokens()
        if(error.response && error.response.status === 401){
            try {
                error.config.headers.Authorization = `Bearer ${new_access_token}`
                return axios(error.config)

                
            } catch (error) {
                
            }
        }

        if(error.response && error.response.status != 401){
            const errrorMessage = error.response.data.message || 'Something went wrong'
            Alert.alert(errrorMessage)
        }
    }
)