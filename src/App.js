import React, { Component } from 'react'
import './App.css';
import {Route, Link} from 'react-router-dom';
import FolderLists from './FolderLists/FolderLists';
import NoteLists from './NotesLists/NotesLists';
import DataContext from './DataContext';
import config from './config';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

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
      appendFolder: this.appendFolder,
      appendNote: this.appendNote,
    }

  }

  appendFolder = (newFolder) =>{
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  appendNote = (newNote) =>{
    this.setState({
      notes: [...this.state.notes, newNote],
    })
  }

  changeFolderId = (id) => {
    this.setState({
      folderId: parseInt(id),
    })
  }

  changeNoteId = (id) => {
    this.setState({
      noteId: parseInt(id),
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


  deleteNote = (id) =>{
    const newNotes = this.state.notes.filter((note => { return note.id !== id  }))
    this.setState({
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
            <Link to="/"
              onClick={() => this.changeFolderId('')}
              >Noteful
            </Link>{' '}
          </header>
          <div className="data-container"> 
            {this.renderMain()}
            <NoteLists/>
          </div>
          <AddFolder/>
          <AddNote/>
       </DataContext.Provider>
      </main>
    )
  }
}

export default App
