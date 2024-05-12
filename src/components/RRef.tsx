import { useEffect, useRef, useState } from "react"

const RRef = () => {
    const [counter, setCounter] = useState<number>(0)
    const counterRef = useRef<number>(0)

    console.log("Re-Render:")
    const changeCounter = () => {

        // setCounter re-render compoment but console.log will print old value as set is async
        setCounter(prev => prev + 1)
        console.log('State Counter::', counter)

        // ref will not re-render and it will print the latest value in console 
        // but it will not reflect new value in dom
        // to verify working you can comment line11 where we set new state which re-render and dom display updated values
        counterRef.current++
        console.log('counterRef.current::', counterRef.current)
    }

    return (
        <div>
            <div>State Counter:: {counter}</div>
            <div>Ref Counter:: {counterRef.current}</div>
            <button onClick={changeCounter}>Increment</button>
        </div>
    )

}

const RRefDom = () => {
    const focusRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (focusRef && focusRef.current) {
            focusRef.current.focus()
        }
    }, [])

    return (
        <div>
            <input style={{ padding: "10px" }} type="text" placeholder="Non Ref Element" />
            <br />
            <input style={{ padding: "10px", marginTop: "10px" }} type="text" name="focusele" id="focusele" ref={focusRef} placeholder="Add Text" />
        </div>
    )

}

export default RRef