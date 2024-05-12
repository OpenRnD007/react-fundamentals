// This is our original component, a friend with a hat.
const withHat = (Component: React.ComponentType) => {
    return (props: any) => (
        <>
            <Component {...props} />
            <p>I have a hat!</p>
        </>
    );
};

// This is our HOC, which adds sunglasses to our friend.
const withSunglasses = (Component: React.ComponentType) => {
    return (props: any) => (
        <>
            <Component {...props} />
            <p>Now I have sunglasses too!</p>
        </>
    );
};

// This is a basic component that represents our friend.
const Friend = () => {
    return <p>Hello, I'm your friend!</p>
};

// We apply the 'withHat' HOC to give our friend a hat.
const FriendWithHat = withHat(Friend)

// Then we apply the 'withSunglasses' HOC to also give our friend sunglasses.
const FriendWithHatAndSunglasses = withSunglasses(FriendWithHat)

// App component that renders our friend with both a hat and sunglasses.
const HOC = () => {
    return (
        <div>
            <h1>Meet my friend:</h1>
            <FriendWithHatAndSunglasses />
        </div>
    );
};

export default HOC