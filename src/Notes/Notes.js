import React, { Component } from 'react'
import './Notes.css';
import DataContext from '../DataContext';
import {Link, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Notes extends Component {
    static contextType = DataContext;
  
    render() {
        const notes = this.context.notes
            .filter(note => { 
                    if(!this.context.noteId || this.props.location.pathname.includes('/folder')){ 
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
                            <button>Delete Note</button>
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
                     <button>Add Note</button>
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
