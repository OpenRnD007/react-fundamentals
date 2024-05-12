import { useEffect, useState } from "react"

//Basic state handling, how to update the state and make sure to unset state when component is unmounted
const RStateNEffect = () => {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            // there are diffrent way to set state

            // 1) setCount(count + 1)

            // 2) const currCount = count + 1
            //    setCount(currCount)

            //1 and 2 will always just update to 1 and every time it try to get count value it will be walys zero 
            //so after every 1000 internal count will be 1 as ( count = zero + 1 ) .i.e = 1
            //this is best way as it will always make sure to get previous state and update it 
            setCount(prev => prev + 1)
            console.log("count printed")
        }, 1000)

        // if we are doing any async task and the component get unmounted make sure to clear all setState call
        // there are different way 
        return (() => clearInterval(interval))

    }, [])

    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={() => {
                setCount(prev => prev + 5)
            }}>Increment + 5</button>
        </div>
    )
}

export default RStateNEffect