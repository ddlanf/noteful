import React, { Component } from 'react'
import './Folders.css'
import DataContext from '../DataContext'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import CheckFolderError from '../CheckFolderError'

class Folders extends Component {

    static contextType = DataContext;
   
    render() {
    console.log();
     const folders = this.context.folders.map((folder, index) =>{
            const selected = (folder.id === this.context.folderId) ? 'yellow' : 'white';
            return(
                <Link to={`/folder/${folder.id}`}
                    onClick={() => this.context.changeFolderId(folder.id)}
                    >
                    <CheckFolderError>
                        <li className="folder"
                            key={index}
                            id={folder.id}
                            style={{'background-color': selected}}
                            >
                                {folder.name}
                        </li>  
                    </CheckFolderError>
                </Link>
            );  
        });

        return (  
         <ul className="folders">
            {folders}
            <button
                onClick={() => this.props.history.push("/addfolder")}
                >
                    Add Folder
            </button>
         </ul>
        );
    }
}

export default withRouter(Folders);
