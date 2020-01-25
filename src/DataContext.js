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
})

export default DataContext