import React, { Component } from 'react'

class CheckFolderError extends Component {
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }
    
    render() {
        if (this.state.hasError) {      
         return (
           <h2 style={{color: 'red' }} >Invalid Folder</h2>
            );
        }
        return this.props.children;
        }
}

export default CheckFolderError
