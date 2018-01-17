import React, { Component } from "react"

class FileUpload extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <input id="fileUpload" className="fileUpload" type="file" onChange={this.handleFileUpload.bind(this)} />
                <label for="fileUpload" class="btn btn-info btn-lg btn-block">
                    Upload a file
                </label>
            </div>
        );
    }

    handleFileUpload(e) {
        const { onUpload } = this.props;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvt => {
                const res = loadEvt.target.result;
                try{
                    onUpload( JSON.parse(res) );
                } catch(e) {
                    console.error('Unparseable Json', e);
                }
            })
            reader.onerror = function (err) {
                alert("Error reading file", err);
            }
            reader.readAsText(file, "UTF-8");
        }
    }
}

export default FileUpload;
