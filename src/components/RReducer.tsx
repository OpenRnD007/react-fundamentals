import { useReducer } from "react"

interface State {
    count: number,
    error: string | null
}

interface Action {
    type: 'INCREMENT' | 'DECREMENT'
}

const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case 'INCREMENT': {
            const newState = { ...state }
            const newCount = newState.count + 1
            newState.error = null
            if (newCount > 5) {
                newState.error = "Maximum has reached (0-5)"
            } else {
                newState.count = newCount
            }

            return newState
        }
        case 'DECREMENT': {
            const newState = { ...state }
            const newCount = newState.count - 1
            newState.error = null
            if (newCount < 0) {
                newState.error = "Minimum has reached (0-5)"
            } else {
                newState.count = newCount
            }

            return newState
        }
        default: {
            return state
        }
    }
}

const RReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        error: null
    })

    return (
        <div>
            <h3>Number can be between (0 - 5)</h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button onClick={() => {
                    dispatch({
                        type: "DECREMENT"
                    })
                }}>-</button>
                <span>{state.count}</span>
                <button onClick={() => {
                    dispatch({
                        type: "INCREMENT"
                    })
                }}>+</button>
            </div>
            <div style={{ color: "red" }}>{state.error}</div>
        </div>
    )
}

export default RReducer