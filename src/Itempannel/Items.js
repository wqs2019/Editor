import React,{ Component,Fragment } from 'react';
import Axios from '../../axios';
export default class Items extends Component{
	state = {
		itemsList:[]
	}
	getItemsList = ()=>{
		Axios.ajax({
			url:'/editorItemList'
		}).then((res)=>{
			console.log(res.data.data)
			if(res.code === 200){
				
				this.setState({
					itemsList:res.data.data
				})
			}
		})
	}
	componentDidMount(){
		this.getItemsList();
	}
	render(){
		console.log(111)
		return <Fragment>
			{
				this.state.itemsList.map((item,index)=>{
					return  <li key={index} className="getItem" data-shape={item.shape} data-type="node" data-size="170*34">
				                <span className="pannel-type-icon db-get"></span>{item.name}
				            </li>
				})
			}
			
		</Fragment>
	}
}