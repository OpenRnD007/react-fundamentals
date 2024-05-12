import React, { forwardRef, useImperativeHandle, useState } from "react"

const RForwardRef = () => {
    console.log("rerender_parent")

    const parentRef: any = React.createRef()
    return (
        <div>
            <ChildRef ref={parentRef} />

            <button
                style={{ marginTop: "5px" }}
                onClick={() => {
                    if (parentRef && parentRef.current) {
                        parentRef.current.reset()
                    }
                }}>Reset From Parent</button>
        </div>
    )
}

const ChildRef = forwardRef((_props: any, ref: any) => {
    console.log("rerender_child")
    
    const [state, setState] = useState<number>(0)
    const prev = () => {
        setState(prev => prev - 1)
    }
    const next = () => {
        setState(prev => prev + 1)
    }
    const reset = () => {
        setState(0)
    }

    useImperativeHandle(ref, () => {
        return {
            reset
        }
    })

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={prev}>-</button>
            <span>{state}</span>
            <button onClick={next}>+</button>
        </div>
    )
})

export default RForwardRef