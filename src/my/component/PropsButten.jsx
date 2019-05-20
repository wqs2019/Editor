import React from 'react';
import {withPropsAPI} from 'gg-editor'
import {Button} from "antd";
import PropTypes from "prop-types";

class SavesButten extends React.Component {

    handleSaveClick = () => {
        const { propsAPI } = this.props;
        let data=propsAPI.save();
        if(this.props.resolveData){
            this.props.resolveData(data);
        }
    };

    render() {
        return<Button onClick={this.handleSaveClick}>{this.props.text}</Button>
    }
}
SavesButten.propTypes = {
    text: PropTypes.string,
    resolveData: PropTypes.func,
};
export default withPropsAPI(SavesButten);
