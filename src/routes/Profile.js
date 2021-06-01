import React, {useEffect} from "react";
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");

        refreshUser();
    }
    const getMyBangWeet = async () => {
        const bangWeets = await dbService.collection("bangWeets").where("creatorId", "==", userObj.uid).orderBy("creatorAt").get();
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }

    useEffect(() => {
        getMyBangWeet();
    }, []);
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" onChange={onChange} autoFocus placeholder="Display Name" value={newDisplayName}
                       className="formInput"/>
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    )
}

export default Profile;