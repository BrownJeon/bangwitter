import React, {useState} from "react";
import {dbService} from "../fbase";

const BangWeet = ({bangWeetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newBangWeet, setNewBangWeet] = useState(bangWeetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`bangWeets/${bangWeetObj.id}`).delete();
        }
    }
    const toggleEditting = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`bangWeets/${bangWeetObj.id}`).update({
            text: newBangWeet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewBangWeet(value);
    }

    return (
        <div>
            {editing ?
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="edit your bangWeet" onChange={onChange}
                                       value={newBangWeet}
                                       required/>
                                <input type="submit" value="update bangWeet"/>
                            </form>
                            <button onClick={toggleEditting}>Cancel</button>
                        </>
                    )}
                </>
                :
                <>
                    <h4>{bangWeetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={toggleEditting}>Edit bangWeet</button>
                            <button onClick={onDeleteClick}>Delete bangWeet</button>
                        </>
                    )}
                </>
            }
        </div>
    )
}

export default BangWeet;