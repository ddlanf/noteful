import React from 'react'

const DataContext = React.createContext({
  notes: [],
  folders: [],
  folderId: '',
  noteId: '',
  changeFolderId:  () => {
    
  },
  changeNoteId:  () => {
    
  },
  deleteNote: () => {
    
  },
  requestFolders: () => {
    
  },
  requestNotes: () => {
    
  }
})

export default DataContext