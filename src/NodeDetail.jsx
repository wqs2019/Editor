import React ,{Component}from 'react'  
import { withPropsAPI } from 'gg-editor';
import './NodeDetail.css';
import 'antd/dist/antd.css';  
import Button from 'antd/lib/button';
import { Input } from 'antd';

const { TextArea } = Input;

class NodeDetail extends Component{ 
    componentDidMount() {
        const { propsAPI } = this.props;
    
        console.log(propsAPI);
      }
      constructor(props){
          super(props);
          this.state={
              name:'1',
              shellScript:'1'
          }
      }
    render(){       
        return(
            <div className="wrapper">
                <div className="name">name:<TextArea rows={2} /></div>
                <div className="shell">shellScript:<TextArea rows={2} /></div>
                <Button type="primary">完成</Button>
            </div>
            
        )
    }
}

export default withPropsAPI(NodeDetail) ;