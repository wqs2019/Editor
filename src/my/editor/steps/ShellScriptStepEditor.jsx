import React from 'react';
import PropTypes from 'prop-types';
import { getArg, setArg } from '../../service/ArgService';
import { withPropsAPI } from 'gg-editor';

import 'antd/dist/antd.css';
import { Input } from 'antd';

import Button from 'antd/lib/button';
const { TextArea } = Input;

class ScriptStepEditor extends React.Component {
    componentDidMount() {
        const { propsAPI } = this.props;
        console.log(propsAPI);
    }
    
    textChanged = script => {
        setArg(this.props.step, 'script', script);
        this.props.onChange(this.props.step);
        //console.log(this.item.model);
    };
    nameChanged = name => {
        setArg(this.props.step, 'name', name);
        this.props.onChange(this.props.step);
    };
    render() {
        const { step } = this.props;
        console.log("render:step:" + step);

        return <div>
            <div className="name">name:<TextArea rows={2}
                className="editor-step-detail-name"
                defaultValue={getArg(step, 'name').value}
                onChange={e => this.nameChanged(e.target.value)} /></div>
            <div>shell
                <TextArea
                    className="editor-step-detail-script"
                    defaultValue={getArg(step, 'script').value}
                    onChange={e => this.textChanged(e.target.value)}
                    rows={2}
                    
                />
            </div>
            <Button type="primary">完成</Button>
        </div>;
    }
}
export default withPropsAPI(ScriptStepEditor);
ScriptStepEditor.propTypes = {
    step: PropTypes.any,
    onChange: PropTypes.func,
};

ScriptStepEditor.stepType = 'sh'; // FIXME do this a better way
