import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate("/login");
    }
  });

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "general",
    id:""
  });

  const ref = useRef(null);
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }; 

  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  const handleclick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Notes edited successfully","success");
  };

  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 my-4 row d-flex justify-content-center">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  <strong>Title</strong>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="etitle"
                    name="etitle"
                    onChange={handlechange}
                    value={note.etitle}
                  />
                </div>
              </div>
              <div className="mb-3 row d-flex justify-content-center">
                <label
                  htmlFor="description"
                  className="col-sm-2 col-form-label"
                >
                  Description
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control "
                    id="edescription"
                    name="edescription"
                    onChange={handlechange}
                    value={note.edescription}
                  />
                </div>
              </div>
              <div className="mb-3 row d-flex justify-content-center">
                <label htmlFor="tag" className="col-sm-2 col-form-label">
                  Tag
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control "
                    id="etag"
                    name="etag"
                    onChange={handlechange}
                    value={note.etag}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<1 || note.edescription.length<1} onClick={handleclick} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && "Add a note to display it here"}
        </div>
        {notes.map((note) => {
          return (
            <NotesItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
