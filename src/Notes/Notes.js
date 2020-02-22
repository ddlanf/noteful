import React, { Component } from 'react'
import './Notes.css';
import DataContext from '../DataContext';
import {Link, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import config from '../config';
import CheckNoteError from '../CheckNoteError'

class Notes extends Component {
    static contextType = DataContext;

    requestDelete = (noteId) => {
        this.context.deleteNote(noteId);
        fetch(config.API_ENDPOINT_NOTES + `/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
              },
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then( () => {
                if(this.props.location.pathname.includes('/note')){
                    this.props.history.push('/');
                }
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        const notes = this.context.notes
            .filter(note => { 
                    if(!this.context.noteId || !this.props.location.pathname.includes('/note')){ 
                        return (note.folder_id === this.context.folderId || !this.context.folderId)
                    }
                    else{ return  (note.id === this.context.noteId) }
                })
                .map((note, index) =>{
                        return(
                                <CheckNoteError>
                                        <li className="Note"
                                            key={index}
                                            id={note.id}
                                            folderid={note.folder_id}
                                            >
                                            <Link to={`/note/${JSON.stringify(note.id)}`}
                                                onClick={() => this.context.changeNoteId(note.id)}
                                                >
                                                <h1>{note.name}</h1>
                                            </Link>
                                            <div className="bottom">
                                                <p>Date Modified:  {note.date_modified}</p>
                                                <button
                                                    onClick={() => this.requestDelete(parseInt(note.id))}
                                                    >
                                                    Delete Note
                                                </button>
                                            </div>
                                        </li>  
                                    <Route
                                        path='/note/:noteId'
                                        >
                                        <li
                                            key={index+"content"}
                                            className="content">
                                            {note.content}                    
                                        </li>
                                    </Route>
                                </CheckNoteError> 
                        );  
                 });

        const button = ['/', '/folder/:folderId'].map(path => {
            return (
                <Route 
                    exact path={path}
                    key={path}
                >
                     <button
                        key={path}
                        onClick={() => this.props.history.push("/addnote")}
                        >
                        Add Note
                    </button>
                </Route>
            )
        })

        return (
            <div className="Notes">
                <ul>
                     {notes}
                </ul>
                {button}
            </div>
        )
    }
}

export default withRouter(Notes);
