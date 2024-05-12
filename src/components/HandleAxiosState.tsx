import axios from "axios"
import { useEffect, useState } from "react"

//Handle state update if component get unmounted, make sure to cancel request if component is unmounted before completing request
const HandleAxiosState = () => {
    const [showComponent, setShowComponent] = useState<boolean>(false)
    return (
        <div>
            <button onClick={() => {
                setShowComponent(prev => !prev)
            }}>Mount Component</button>

            {showComponent && <HandleAxiosCall />}
        </div>
    )
}


const HandleAxiosCall = () => {
    const [list, setList] = useState<IResponseType[]>([])


    useEffect(() => {
        const controller = new AbortController()

        axios.get('http://localhost:3000/getusers', {
            signal: controller.signal
        })
            .then(response => response.request)
            .then((response) => {
                setList(response)
            }).catch(error => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('An error occurred:', error);
                }
            })

        return (() => controller.abort())
    }, [])

    return (
        <ol style={{ border: "1px solid #333", padding: "10px", minHeight: "100px" }}>
            {list.map(data =>
                <li key={data.id}>{data.name} | {data.city}</li>
            )}
        </ol>
    )
}

export default HandleAxiosState

interface IResponseType {
    id: number,
    name: string,
    city: string
}
