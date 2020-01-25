import React, { Component } from 'react'
import './App.css';
import {Route, Link} from 'react-router-dom';
import FolderLists from './FolderLists/FolderLists';
import NoteLists from './NotesLists/NotesLists';
import dummyStore from './dummy-store';
import DataContext from './DataContext';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: dummyStore.notes,
      folders: dummyStore.folders,
      folderId: '',
      noteId: '',
      changeFolderId: this.changeFolderId,
      changeNoteId: this.changeNoteId,
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
