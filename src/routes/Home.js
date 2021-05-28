import React, {useState, useEffect} from "react";
import {dbService} from "../fbase";
import BangWeet from "../components/BangWeet";

const Home = ({userObj}) => {
    const [bangWeet, setBangWeet] = useState("");
    const [bangWeets, setBangWeets] = useState([]);
    const [attachment, setAttachment] = useState();

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
    const onFileChange = event => {
        const {target: {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {target:{result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment(null);

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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="BangWeet"/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>clear</button>
                    </div>
                )}
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