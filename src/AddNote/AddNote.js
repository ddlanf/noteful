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
        }
    }

    requestPost(name, content){
        fetch(config.API_ENDPOINT_NOTES, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
              },
            body: JSON.stringify({
                id: 'd26e' + this.generateRandomString(4, '01234569qwertyuioplkjhgfdsazxcvbnm') + '-ffaf-11e8-8eb2-f2801f1b9fd1',
                name: name,
                modified: new Date(),
                folderId: this.context.folderId,
                content: (content || "**Content Empty"),
            })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then( () => {
                this.context.changeFolderId('')
                this.context.changeNoteId('')
                this.props.history.push('/');
            })
            .then(
                this.context.requestNotes()
            )
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

    updateContent(name) {
        this.setState({ content: { value: name, touched: true } });
    }

    cancel = () =>{
        this.props.history.push("/")
        this.setState({ name: { value: "", touched: false } });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, content } = this.state;
        this.requestPost(name.value, content.value);
    }

    render() {
        console.log(this.context.folderId)
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
                                onChange={e => this.updateName(e.target.value)}
                                />
                            {!this.state.name.touched? (<></>): (<h2 style={{color:'red', fontSize: '20px'}}>{this.validateName()}</h2>)}
                            <label className="content-label">Content:</label>
                            <input 
                                type="text" 
                                className="note-content"
                                name="content" 
                                id="content"
                                onChange={e => this.updateContent(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="button-submit"
                             disabled={this.validateName()}
                            >
                            Add
                        </button>
                        <button className="button-submit" 
                             onClick={() => this.cancel()}
                            >
                            Cancel
                        </button>
                    </form>
            </Route>
        )
    }
}

export default withRouter(AddNote);
