import React from 'react'

const DataContext = React.createContext({
  notes: [],
  folders: [],
  folderId: null,
  noteId: null,
  changeFolderId:  () => {
    
  },
  changeNoteId:  () => {
    
  },
  deleteNote: () => {
    
  },
  requestFolders: () => {
    
  },
  requestNotes: () => {
    
  },
  appendFolder: () => {
    
  },
  appendNote: () => {
    
  }
})

export default DataContext