import React, { useContext ,useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;
  
  const [note,setNote]=useState({title:"",description:"",tag:""});
  
  const handleclick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:"" ,description:"",tag:""})
      props.showAlert("New note created successfully","success");
  }
  
  const handlechange=(e)=>{
      setNote({...note, [e.target.name]:e.target.value});
  }

  return (
    <div>
      <div className="mb-3 my-4 row d-flex justify-content-center">
        <label htmlFor="title" className="col-sm-2 col-form-label">
          <strong>Title</strong>
        </label>
        <div className="col-sm-5">
          <input type="text" className="form-control form-control-lg" id="title" name="title" onChange={handlechange} value={note.title} required/>
        </div>
      </div>
      <div className="mb-3 row d-flex justify-content-center">
        <label htmlFor="description" className="col-sm-2 col-form-label">
          Description
        </label>
        <div className="col-sm-5">
          <input type="text" className="form-control " id="description" name="description" value={note.description} onChange={handlechange} required/>
        </div>
      </div>
      <div className="mb-3 row d-flex justify-content-center">
        <label htmlFor="tag" className="col-sm-2 col-form-label">
          Tag
        </label>
        <div className="col-sm-5">
          <input type="text" className="form-control " id="tag" name="tag" onChange={handlechange} value={note.tag}/>
        </div>
      </div>
      <div className="col-auto d-flex justify-content-center">
        <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-dark mb-3" onClick={handleclick}>
          Add a new note
        </button>
      </div>
    </div>
  );
};

export default AddNote;
