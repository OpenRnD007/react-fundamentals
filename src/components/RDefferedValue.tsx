import React, { useState, useDeferredValue, memo, useEffect } from 'react';

const RDefferedValue = () => {
    const [text, setText] = useState('')
    const deferredText = useDeferredValue(text)

    useEffect(() => {
        console.log("Text:", text)
        console.log("DeferredText:", deferredText)
        console.log("----End----")
    }, [text, deferredText])
    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            {/**
             * if we try to use state variable <SlowList text={text} /> then for every key stroke slowlist will be called 
             * and you can page become non reponsive after some time.
             * update state on key strock for 250+ items wirh 1ms delay will block everything in UI
             * so if we use `deferredText` it will update slowlist only when we stop tying the text
             * for normal state SlowList will be updated on every key stork wherein `deferredText` SlowList will be updated once we stop typing
             * if doest do timeout based operation way how Debouncing or Throttling does
             * for better understanding check consolelog from useeffect
             */}
            <SlowList text={deferredText} />
        </div>
    );
}
export default RDefferedValue



const SlowList = memo(function SlowList({ text }: { text: string }) {

    let items: React.JSX.Element[] = [];
    for (let i = 0; i < 250; i++) {
        items.push(<SlowItem key={i} text={text} />);
    }
    return (
        <ul className="items">
            {items}
        </ul>
    );
});

const SlowItem = ({ text }: { text: string }) => {
    let startTime = performance.now()
    while (performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }

    return (
        <li className="item">
            Text: {text}
        </li>
    )
}