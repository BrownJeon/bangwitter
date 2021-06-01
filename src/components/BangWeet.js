import React, {useState} from "react";
import {dbService, storageService} from "../fbase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";


const BangWeet = ({bangWeetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newBangWeet, setNewBangWeet] = useState(bangWeetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            console.log(bangWeetObj)
            await dbService.doc(`bangWeets/${bangWeetObj.id}`).delete();
            if (bangWeetObj.attachmentUrl != "") {
                await storageService.refFromURL(bangWeetObj.attachmentUrl).delete();
            }
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
        <div className="bangWeet">
            {editing ?
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container bangWeetEdit">
                                <input type="text" placeholder="edit your bangWeet" onChange={onChange}
                                       value={newBangWeet}
                                       required/>
                                <input type="submit" value="update bangWeet" className="formBtn"/>
                            </form>
                            <button onClick={toggleEditting} className="formBtn cancelBtn">Cancel</button>
                        </>
                    )}
                </>
                :
                <>
                    <h4>{bangWeetObj.text}</h4>
                    {bangWeetObj.attachmentUrl && <img src={bangWeetObj.attachmentUrl}/>}
                    {isOwner && (
                        <div className="bangWeet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                            <span onClick={toggleEditting}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </span>
                        </div>
                    )}
                </>
            }
        </div>
    )
}

export default BangWeet;