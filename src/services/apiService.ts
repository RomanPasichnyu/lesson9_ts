import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import {authService} from "./authService";
import {router} from "../router";

let isRefreshing = false
type IwaitList = ()=>void
const waitList :IwaitList[]=[]
const apiService = axios.create({baseURL})

apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req
})

apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    await authService.resresh()
                    isRefreshing = false
                    runAfterRefresh()
                    return apiService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefreshing = false
                    router.navigate('/login?SessionExpired=true')
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url ===urls.auth.refresh){
                return Promise.reject(error)
            }
            return new Promise(resolve => {
                subscribeToWaitList(()=>{
                    resolve(apiService(originalRequest))
                })
            })

        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb:IwaitList):void=>{
    waitList.push(cb)
}

const runAfterRefresh = ():void=>{
    while (waitList.length){
        const cb = waitList.pop();
        cb()
    }
}


export {
    apiService
}