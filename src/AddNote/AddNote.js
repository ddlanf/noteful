import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DataContext from '../DataContext';
import config from '../config';
import './AddNote.css';

class AddNote extends Component {
   
    static contextType = DataContext;

    constructor(props) {
        super(props);

            this.state = {
            name: {
                value: "",
                touched: false
            },
            content:  {
                value: "",
                touched: false
            },
            folderId: '',
            selection_good: false
         }
    }

    requestPost(name, content, folderId){
       
        const data = {
            name: name,
            date_modified: JSON.stringify(new Date()),
            folder_id: parseInt((folderId ||  this.context.folderId)),
            content: (content || "**Content Empty"),
        };
        this.context.appendNote(data);
        
        console.log(folderId)
        fetch(config.API_ENDPOINT_NOTES, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
            body: JSON.stringify(data),
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then( () => {
              this.context.requestNotes()
              this.context.changeFolderId('')
              this.context.changeNoteId('')
              this.context.appendNote(data);
              this.props.history.push('/');
              this.cancel();
            })
            .catch(error => this.setState({ error }))
    }

    generateRandomString = (len, arr) => { 
        var ans = ''; 
        for (var i = len; i > 0; i--) { 
            ans +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return ans; 
    } 

    updateName(name) {
        this.setState({ name: { value: name, touched: true } });
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } 
    }

    validateSelection = () => {
        if(this.state.selection_good){
            return true
        }
    }

    updateContent(name) {
        
        this.setState({ content: { value: name, touched: true } });
    }

    updateChoice(selected){
        let selection = false
        if(selected === "none"){
            selection = false 
        }
        else{ selection = true }

        this.setState({ folderId: selected, selection_good: selection });
 
    }   

    cancel = () =>{
        this.props.history.push("/")
        this.setState({ name: { value: "", touched: false } });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, content, folderId } = this.state;
        this.requestPost(name.value, content.value, folderId);
    }

    render() {
      
        return (
            <Route
                exact path='/addnote'>
                    <form className="note-form-box"
                        onSubmit={e => this.handleSubmit(e)}
                        > 
                        <div className="note-input">
                            <label className="name-label">Note Name:</label>
                            <input 
                                type="text" 
                                className="note-name"
                                name="name" 
                                id="name"
                                aria-required="true"
                                aria-describedby="Name"
                                aria-label="Name"
                                onChange={e => this.updateName(e.target.value)}
                                />
                            {!this.state.name.touched? (<></>): (<h2 id="name" style={{color:'red', fontSize: '20px'}}>{this.validateName()}</h2>)}
                            <label className="content-label">Content:</label>
                            <input 
                                type="text" 
                                className="note-content"
                                name="content" 
                                id="content"
                                onChange={e => this.updateContent(e.target.value)}
                            />
                            <select 
                                    className="folderId"
                                    onChange={e => this.updateChoice(e.target.value)} 
                            >
                                <option key="none" value="none" selected>Select your folder</option>
                                {
                                    this.context.folders
                                            .map((folder, index) =>{
                                                return  <option key={index} value={`${folder.id}`}>{folder.name}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" className="button-submit"
                             disabled={!this.validateSelection() || this.validateName()}
                            >
                            Add
                        </button>
                        <button className="button-submit" 
                             onClick={() => this.cancel() }
                            >
                            Cancel
                        </button>
                    </form>
            </Route>
        )
    }
}

export default withRouter(AddNote);
