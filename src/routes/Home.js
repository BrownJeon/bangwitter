import React, {useState, useEffect} from "react";
import {dbService} from "../fbase";
import BangWeet from "../components/BangWeet";

const Home = ({userObj}) => {
    const [bangWeet, setBangWeet] = useState("");
    const [bangWeets, setBangWeets] = useState([]);

    useEffect(() => {
        dbService.collection("bangWeets").onSnapshot((snapshot => {
            const bangWeetArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setBangWeets(bangWeetArray);
        }))
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("bangWeets").add({
            text: bangWeet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setBangWeet("");
    };
    const onChange = (event) => {
        const {
            target: {value},
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
                <input type="submit" value="BangWeet"/>
            </form>
            <div>
                {bangWeets.map((bangWeet) => (
                    <BangWeet key={bangWeet.id} bangWeetObj={bangWeet} isOwner={bangWeet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
        ;
};

export default Home;