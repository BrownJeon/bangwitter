import React, {useState, useEffect} from "react";
import {dbService, storageService} from "../fbase";
import BangWeet from "../components/BangWeet";
import { v4 as uuidv4} from "uuid";
import BweetFactory from "../components/BweetFactory";

const Home = ({userObj}) => {
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

    return (
        <div className="container">
            <BweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {bangWeets.map((bangWeet) => (
                    <BangWeet key={bangWeet.id} bangWeetObj={bangWeet} isOwner={bangWeet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
        ;
};

export default Home;