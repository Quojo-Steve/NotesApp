import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Arrowleft from '../assets/back_arrow.png';
import Delete from '../assets/delete.png'


const NotePage = () => {
    
    let { noteId } = useParams();
    let [note, setNote] = useState(0);

    let getNote = async () => {
        if (noteId === 'new') return
        let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}`);
        let data = await response.json()
        setNote(data)
    };

    useEffect(() => {
        getNote()
    }, [noteId])

    let updateNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    let createNote = async () => {
        fetch(`http://localhost:8000/api/notes/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    let history = useNavigate();


    let deleteNote = async () => {
        fetch(`http://localhost:8000/api/notes/${noteId}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history('/')
    }
 
    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if(noteId === 'new' && note !== null){
            createNote()
        }
        history('/')
    }

  return (
      <div className='note'>
          <div className='note-header'>
              <h3>
                  <img src={Arrowleft} alt="Back" className='arrow-left' onClick={handleSubmit} />
              </h3>
              {noteId !== 'new' ? (
                <h3>
                  <img src={Delete} alt="Delete" className='arrow-left' onClick={deleteNote} />
                </h3>
              ) : (
                <h3>
                    <button onClick={handleSubmit}>Done</button>
                </h3>      
            )}
          </div>
          <textarea onChange={(e) => {setNote({...note, 'body':e.target.value}) }} value={note?.body}></textarea>      
    </div>
  )
}

export default NotePage
