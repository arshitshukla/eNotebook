import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

const NotesItem = (props) => {
  
  const context = useContext(NoteContext);
  const {deleteNote} = context;

  const { note,updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <h5><span className="badge text-bg-dark d-block">Tag : {note.tag}</span></h5>
          <i className="fa-solid fa-trash-can mx-3 my-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","danger")}}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
