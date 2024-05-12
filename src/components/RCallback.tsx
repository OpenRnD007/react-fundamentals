import { useCallback, useEffect, useState } from "react"

const RCallback = () => {
    const [count, setCount] = useState<number>(0)

    // On every re-render changeCount will be consider as different function even though it contents has not changed same case we had seend for object useMemo
    const changeCount = (resp: number) => {
        console.log("Onchange Called:", resp)
        setCount(resp)
    }

    const callBackCount = useCallback((resp: number) => {
        changeCount(resp)
    }, [])

    return (
        <div>
            <div>Count: {count}</div>
            <hr />
            <SetCountPropsDrilling setCount={changeCount} />
            <hr />
            <SetCountCallback setCount={callBackCount} />
        </div>
    )
}

interface ISetProps {
    setCount: (resp: number) => void
}

const SetCountPropsDrilling = ({ setCount }: ISetProps) => {

    const [dt, setDt] = useState<string[]>([])
    useEffect(() => {
        setDt(prev => [new Date().toISOString(), ...prev])
        console.log("Function updated form propsDrills")
    }, [setCount])

    return (
        <div>
            <div>Render at
                <ol>
                    {dt.map((date: string) => <li key={date}>{date}</li>)}
                </ol>
            </div>
            <button onClick={() => {
                setCount(new Date().getTime())
            }}>Update Counter From PropsD</button>
        </div>
    )
}

const SetCountCallback = ({ setCount }: ISetProps) => {

    const [dt, setDt] = useState<string[]>([])
    useEffect(() => {
        setDt(prev => [new Date().toISOString(), ...prev])
        console.log("Function updated form useCallback")
    }, [setCount])

    return (
        <div>
            <div>Render at
                <ol>
                    {dt.map((date: string) => <li key={date}>{date}</li>)}
                </ol>
            </div>
            <button onClick={() => {
                setCount(new Date().getTime())
            }}>Update From useCallback</button>
        </div>
    )
}

export default RCallback