import { memo, useState, useTransition } from "react"

const RTranscation = () => {
    const [_isPending, startTranscation] = useTransition()
    const [tab, setTab] = useState<string>("about")

    // if `changeTabNormal` and try to switch the tab on post tab you will page is getting block and you cannot swich to other tabs
    /*const changeTabNormal = (newTab: string) => {
        setTab(newTab)
    }*/
    // if use `startTranscation` it will always give first priority to current state change
    // in simple terms it will not block UI while changing the state 
    const changeTab = (newTab: string) => {
        startTranscation(() => {
            setTab(newTab)
        })
    }


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    {tab === "about"
                        ? "About"
                        : <button onClick={() => changeTab("about")}>About</button>
                    }
                </div>
                <div>
                    {tab === "post"
                        ? "Post"
                        : <button onClick={() => changeTab("post")}>Posts</button>
                    }
                </div>
                <div>
                    {tab === "contact"
                        ? "Contact"
                        : <button onClick={() => changeTab("contact")}>Contact</button>
                    }
                </div>
            </div>
            {tab === "about" && <AboutTab />}
            {tab === "post" && <PostsTab />}
            {tab === "contact" && <ContactTab />}
        </div>
    )
}


export default RTranscation


const AboutTab = () => {
    return (
        <p>Welcome to my profile!</p>
    );
}


const PostsTab = memo(function PostsTab() {

    let items: React.JSX.Element[] = [];
    for (let i = 0; i < 500; i++) {
        items.push(<SlowPost key={i} index={i} />);
    }
    return (
        <ul className="items">
            {items}
        </ul>
    );
});

const SlowPost = ({ index }: { index: number }) => {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }

    return (
        <li className="item">
            Post #{index + 1}
        </li>
    );
}

const ContactTab = () => {
    return (
        <>
            <p>
                You can find me online here:
            </p>
            <ul>
                <li>admin@mysite.com</li>
                <li>+123456789</li>
            </ul>
        </>
    );
}