import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import config from '../config';
import './AddFolder.css'
import DataContext from '../DataContext';

class AddFolder extends Component {
  
    static contextType = DataContext;

    constructor(props) {
        super(props);
            this.state = {
            name: {
                value: "",
                touched: false
            },
        }
    }

    requestPost(name){
       
        const data = {
            id: 'b071' + this.generateRandomString(5, '01234569qwertyuioplkjhgfdsazxcvbnm') + '-ffaf-11e8-8eb2-f2801f1b9fd1',
            name: name,
        };

        fetch(config.API_ENDPOINT_FOLDER, {
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
                this.context.appendFolder(data);
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { name } = this.state;
       
        this.requestPost(name.value);
    }

    render() {
        return (
          <Route
            exact path='/addfolder'>
                <form className="folder-form-box" 
                    onSubmit={e => this.handleSubmit(e)}
                    > 
                    <div className="folder-name-input">
                    <label>Folder Name:</label>
                    <input 
                            type="text" 
                            className="folder-name"
                            name="name" 
                            id="name"
                            onChange={e => this.updateName(e.target.value)}
                    />
                    </div>
                    <button type="submit" className="button-submit">
                        Add
                    </button>
                    <button className="button-submit" 
                        onClick={() => this.props.history.push("/")}
                        >
                        Cancel
                    </button>
                </form>
         </Route>
        )
    }
}

export default withRouter(AddFolder);