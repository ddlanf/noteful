import React, { Component } from 'react'
import './NotesLists.css'
import Notes from '../Notes/Notes'


class NotesLists extends Component {

    render() {
        return (
            <section className="NotesLists">
               <Notes/>
            </section>
        )
    }
}

export default NotesLists;
