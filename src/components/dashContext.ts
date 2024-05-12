import { createContext, useContext } from "react";

export interface IUser {
    name: string,
    isLogin: boolean
}

export const DashboardContex = createContext<IUser | undefined>(undefined)


export const useDashContext = () => {
    const user = useContext(DashboardContex)
    if (!user) {
        throw ('useDashContext must be used with a DashboardContex')
    }
    return user
}