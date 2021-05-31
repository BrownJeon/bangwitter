import React, {useEffect} from "react";
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const getMyBangWeet = async () => {
          const bangWeets = await dbService.collection("bangWeets").where("creatorId", "==", userObj.uid).orderBy("creatorAt").get();

          console.log(bangWeets.docs.map((doc) => doc.data()));
    };
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
             await  userObj.updateProfile({
                displayName: newDisplayName
            });
        }
    }

    useEffect(() => {
        getMyBangWeet();
    }, []);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="Display Name" value={newDisplayName}/>
                <input type="submit" value="Update Profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;