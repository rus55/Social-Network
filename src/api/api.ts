import axios from "axios";
import {UserType} from "./../redux/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "7ef71322-19c3-4ba2-8188-fa2a61cb50b9"
    }
})

export type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type ProfileResponseType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }
}

type AuthResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

type AuthPostResponseType = {
    resultCode: number
    messages: Array<string>
        data: {
            userId: number
        }
}

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<ResponseType<any>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<any>>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileResponseType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<any>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile: ) {
        const formData = new FormData()
        formData.append('image', photoFile)

        return instance.put<ResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export const authAPI = {
    me() {
        return instance.get<AuthResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<AuthPostResponseType>('auth/login', [email, password, rememberMe])
    },
    logout() {
        return instance.delete<ResponseType<{userId?: number}>>('auth/login')
    }
}