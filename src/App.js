import React, { Component } from 'react'
import './App.css';
import {Route, Link} from 'react-router-dom';
import FolderLists from './FolderLists/FolderLists';
import NoteLists from './NotesLists/NotesLists';
import dummyStore from './dummy-store';
import DataContext from './DataContext';
import config from './config';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      folders: [],
      folderId: '',
      noteId: '',
      changeFolderId: this.changeFolderId,
      changeNoteId: this.changeNoteId,
      deleteNote: this.deleteNote,
      requestFolders: this.requestFolders,
      requestNotes: this.requestNotes,
    }

  }



  changeFolderId = (id) => {
    this.setState({
      folderId: id,
    })
  }

  changeNoteId = (id) => {
    this.setState({
      noteId: id,
    })
  }

  requestFolders = () => {
  
    fetch(config.API_ENDPOINT_FOLDER, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          folders: data
        })
      })
      .catch(error => this.setState({ error }))

  }

  requestNotes = () => {
    
    fetch(config.API_ENDPOINT_NOTES, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          notes: data
        })
      })
      .catch(error => this.setState({ error }))
  }


  deleteNote = (newNotes) =>{
    this.state({
        notes: newNotes,
      })
  }

  renderMain() {
    return (
        <>
            {['/', '/folder/:folderId', '/note/:noteId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={FolderLists}
                />
            ))}
        </>
    );
}

componentDidMount() {
    this.requestFolders();
    this.requestNotes();
}

  render() {
    const contextValue = this.state;

    return (

      <main>
       <DataContext.Provider value={contextValue}>
          <header>
            <Link to="/">Noteful</Link>{' '}
          </header>
          <div className="data-container"> 
            {this.renderMain()}
            <NoteLists/>
          </div>
       </DataContext.Provider>
      </main>
    )
  }
}

export default App
