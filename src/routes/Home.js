import React, {useState} from "react";

const Home = () => {
    const [bangWeet, setBangWeet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setBangWeet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={bangWeet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="bangWeet" />
            </form>
        </div>
    );
};

export default Home;