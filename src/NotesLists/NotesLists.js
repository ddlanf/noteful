import React, { Component } from 'react'
import './NotesLists.css'
import Notes from '../Notes/Notes'
import {Route} from 'react-router-dom';

class NotesLists extends Component {
    
    allNotesPaths = ['/', '/folder/:folderId', '/note/:noteId'].map(path => {
        return (
            <Route 
                exact path={path}
                key={path}
            >
                 <Notes/>
            </Route>
        )
    });
    
    render() {
        return (
            <section className="NotesLists">
                {this.allNotesPaths}
            </section>
        )
    }
}

export default NotesLists;
