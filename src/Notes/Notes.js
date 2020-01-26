import React, { Component } from 'react'
import './Notes.css';
import DataContext from '../DataContext';
import {Link, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import config from '../config';

class Notes extends Component {
    static contextType = DataContext;

    
    requestDelete = (noteId) => {
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
                this.context.requestNotes();
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        console.log(this.props.history)
        const notes = this.context.notes
            .filter(note => { 
                    if(!this.context.noteId || !this.props.location.pathname.includes('/note')){ 
                        return (note.folderId === this.context.folderId || !this.context.folderId)
                    }
                    else{ return  (note.id === this.context.noteId) }
                })
                .map((note, index) =>{
                        return(
                            <>
                                <li className="Note"
                                    key={index}
                                    id={note.id}
                                    folderid={note.folderId}
                                    >
                                    <Link to={`/note/${note.id}`}
                                        onClick={() => this.context.changeNoteId(note.id)}
                                        >
                                        <h1>{note.name}</h1>
                                    </Link>
                                    <div className="bottom">
                                        <p>Date Modified:  {note.modified}</p>
                                        <button
                                            onClick={() => this.requestDelete(note.id)}
                                            >
                                            Delete Note
                                        </button>
                                    </div>
                                </li>  
                                <Route
                                    path='/note/:noteId'
                                    >
                                    <p className="content">
                                        {note.content}                    
                                    </p>
                                </Route>
                            </>   
                        );  
                 });

        const button = ['/', '/folder/:folderId'].map(path => {
            return (
                <Route 
                    exact path={path}
                    key={path}
                >
                     <button
                        onClick={() => this.props.history.push("/addnote")}
                        >
                        Add Note
                    </button>
                </Route>
            )
        })

        return (
            <ul className="Notes">
                {notes}
                {button}
            </ul>
        )
    }
}

export default withRouter(Notes);
