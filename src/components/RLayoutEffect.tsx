import { useLayoutEffect, useState } from "react"

const RLayoutEffect = () => {
    const [count, setCount] = useState<number>(0)
    const [count5, setCount5] = useState<number>(0)


    // This artificially slows down rendering
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Do nothing for a bit...
    }

    // as useeffect is async and as it is called after browser repaints the screen
    // you will see slide difference it count5 on screen it will be updated late where as count will updated on first update-render
    /*useEffect(() => {
        setCount5(count * 5)
    }, [count])*/

    // to fix the above conditon we can go with
    // now you will see that both count and count5 will be udated in sync as useLayoutEffect will block till it complete all operations
    // but you will see some delay as it is waiting for all operation to complete before repaint
    useLayoutEffect(() => {
        setCount5(count * 5)
    }, [count])

    const updateCount = () => {
        setCount(prev => prev + 1)
    }

    return (
        <div>
            <div>Count: {count}</div>
            <div>({count} * 5): {count5}</div>
            <button onClick={updateCount}>Update</button>
        </div>
    )
}

export default RLayoutEffect