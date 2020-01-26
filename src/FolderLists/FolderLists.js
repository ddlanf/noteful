import React, { Component } from 'react'
import './FolderLists.css'
import Folders from '../Folders/Folders'
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class FolderLists extends Component {

    render() {
        const link = `/folder/${this.context.folderId}`;

        const folders = ['/', '/folder/:folderId'].map(path => {
            return (
                <Route
                 exact path={path}
                 component={Folders}
                />
            )
        });

        return (
            <section className="FolderLists">
                {folders}
                 <Route
                    path="/note"
                  >
                     <button
                      onClick={() => this.props.history.push(link)}
                       >
                         Go Back
                     </button>
                </Route>
            </section>
        );
    }
}

export default withRouter(FolderLists);
