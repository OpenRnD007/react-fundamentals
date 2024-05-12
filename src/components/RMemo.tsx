import { memo, useEffect, useMemo, useState } from "react"

const RMemo = () => {
    const [user, setUser] = useState<IUser>({
        name: "",
        email: ""
    })
    const memoUser = useMemo(() => {
        return user
    }, [user.name, user.email])

    return (
        <div>
            <h3>Main Component</h3>
            <div>Name:  {user.name}</div>
            <div>Email: {user.email}</div>
            <button onClick={() => {
                setUser({
                    name: "John Smith",
                    email: "john@react.com"
                })
            }}>Update User</button>
            |
            <button onClick={() => {
                setUser({
                    name: "Black Smith",
                    email: "black@react.com"
                })
            }}>Change User</button>

            <hr />
            <DisplayUserPropsDrilling user={user} />
            <hr />
            <DisplayUserMemo user={memoUser} />
            <hr />
            <MemoComponentDisplayUser user={user} />
        </div>
    )
}

const DisplayUserPropsDrilling = ({ user }: { user: IUser }) => {

    useEffect(() => {
        console.log("DisplayUserPropsDrilling: useEffect Mount")
        return (() => {
            console.log("DisplayUserPropsDrilling: useEffect UNMount")
        })
    }, [user])

    return (
        <div>
            <h3>DisplayUserPropsDrilling</h3>
            <div>Name:  {user.name}</div>
            <div>Email: {user.email}</div>
        </div>
    )
}

const DisplayUserMemo = ({ user }: { user: IUser }) => {

    useEffect(() => {
        console.log("DisplayUserMemo: useEffect Mount")
        return (() => {
            console.log("DisplayUserMemo: useEffect UNMount")
        })
    }, [user])

    return (
        <div>
            <h3>DisplayUserMemo</h3>
            <div>Name:  {user.name}</div>
            <div>Email: {user.email}</div>
        </div>
    )
}

const MemoComponentDisplayUser = memo(({ user }: { user: IUser }) => {

    useEffect(() => {
        console.log("MemoComponentDisplayUser: useEffect Mount")
        return (() => {
            console.log("MemoComponentDisplayUser: useEffect UNMount")
        })
    }, [user])

    return (
        <div>
            <h3>MemoComponentDisplayUser</h3>
            <div>Name:  {user.name}</div>
            <div>Email: {user.email}</div>
        </div>
    )
}, (oldProps: any, newProps: any) => {
    // deep comparision for object and it should 
    // return true if we don't want to re-render
    // return false it we want to re-render
    return (
        oldProps.user.name && newProps.user.email
        && oldProps.user.name === newProps.user.name
        && oldProps.user.email === newProps.user.email
    )
})

export default RMemo

interface IUser {
    name: string,
    email: string
}