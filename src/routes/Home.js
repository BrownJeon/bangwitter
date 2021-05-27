import React, {useState, useEffect} from "react";
import {dbService} from "../fbase";

const Home = () => {
    const [bangWeet, setBangWeet] = useState("");
    const [bangWeets, setBangWeets] = useState([]);
    const getBangWeets = async () => {
        const dbBangWeet = await dbService.collection("bangWeets").get();
        dbBangWeet.forEach(document => {
            const bangWeetObj = {
                ...document.data(),
                id: document.id,
            };
            setBangWeets((prev) => [...prev, bangWeetObj]);
        })
    };

    useEffect(() => {
        getBangWeets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("bangWeets").add({
            text: bangWeet,
            createAt: Date.now()
        });
        setBangWeet("");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setBangWeet(value);
    };
    // console.log(bangWeets);
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
                <input type="submit" value="BangWeet"/>
            </form>
            <div>
                {bangWeets.map((bangWeet) => (
                    <div key={bangWeet.id}>
                        <h4>{bangWeet.bangWeet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
        ;
};

export default Home;