import { useEffect, useState } from "react"

// Basic Handling of state in case of async (api call or any other parallel process)
const MountUnMountState = () => {
    const [showComponent, setShowComponent] = useState<boolean>(false)
    return (
        <div>
            <button onClick={() => {
                setShowComponent(prev => !prev)
            }}>Mount Component</button>

            {showComponent && <MountUnMOuntC />}
        </div>
    )
}

export default MountUnMountState


const MountUnMOuntC = () => {
    const [state, setState] = useState<number>(0)

    // Handle mounting and unmounting state updation
    useEffect(() => {
        console.log("component is mounted")
        let mounted = true;

        (async () => {
            // we are trying to wait for 5 second meanwhile if this component is unmounted in suchs senario we should make sure there is no memory leak
            await sleep(5 * 1000)
            if (mounted) {
                setState(prev => prev + 1)
                console.log("count printed in mountedC")
            } else {
                console.log("handled unmounted state updating: memory leak")
            }
        })()

        return (() => {
            // setting mounted value to false so we can reverify this value while updating state
            mounted = false
            console.log("component is unmounted")
        })
    }, [])

    return (
        <div>
            <div>Mounted Count Component State: {state}</div>
        </div>
    )
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}