import { DashboardContex, IUser, useDashContext } from "./dashContext"

const RContext = () => {
    const currentUser: IUser = {
        "isLogin": true,
        "name": "John Smith"
    }
    return (
        <div>
            <DashboardContex.Provider value={currentUser}>
                <Dashboard />
            </DashboardContex.Provider>
        </div>
    )
}


const Dashboard = () => {
    return (
        <div>
            <DashHeader />
            <hr />
            <DashContent />
        </div>
    )
}

const DashHeader = () => {
    const user = useDashContext()
    return (
        <div>
            <h3>DashHeader</h3>
            <div>{user.name} is {user.isLogin ? "🤗️" : "💤️"}</div>
        </div>
    )
}

const DashContent = () => {
    const user = useDashContext()
    return (
        <div>
            <h3>DashContent</h3>
            <div>{user.name} is {user.isLogin ? "Login" : "Logout"}</div>
        </div>
    )
}

export default RContext