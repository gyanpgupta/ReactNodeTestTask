import React, { Component } from "react"
import _ from 'lodash'
import {Button , message} from 'antd';
class userDeshboard extends Component {
    componentWillMount(){
        const {fetchUserTickets} = this.props
    	fetchUserTickets()
    }

   componentWillReceiveProps(nextProps){
    const {orderMessage , phase} = nextProps
    const {initPhase} = this.props
    if(orderMessage && phase === 'success'){
      message.success(orderMessage);
      initPhase()
    }
  }

	handleRequest=(data)=>{
		const {postOrderRequest} = this.props
		const userId = localStorage.getItem('token')
		postOrderRequest({userId:userId , ticketId:data.id})
	}

    render(){
    	const {userTickets} = this.props
    	const sortByArray =  ['High','Medium','low'];
		const sortTicketArray = _.sortBy(userTickets, (item) => {
		     return sortByArray.indexOf(item.ticketOrder)
		 })
    	 const showData = sortTicketArray.length > 0 && sortTicketArray.map((data , i)=>{
	      return(
	      <tr key = {i}>
	        <td className='paddingLeft'>{_.get(data,'name' , '')}</td>
	        <td className='paddingLeft'>{_.get(data,'description' , '')}</td>
	        <td className='paddingLeft'>{data && data.ticketOrder ? data.ticketOrder :'NA'  }</td>
	        <td className='paddingLeft'>
	        <Button onClick = {()=>this.handleRequest(data)}>Request</Button>
	        </td>
	      </tr>
	      )
	    })
    	return(
    		<div className="col-md-6 col-md-offset-3">		       
               <h2>Tickets assign to you by admin</h2>
               <table>
		        <thead>
		          <tr>
		            <th className='paddingLeft'>{'Ticket Name'}</th>
		            <th className='paddingLeft'>{'Description'}</th>
		            <th className='paddingLeft'>{'Priority'}</th>
		            <th className='paddingLeft'>{'Request admin to order ticket'}</th>
		          </tr>
		        </thead>
		        <tbody>
		          {showData}
		        </tbody>
		       </table>
            </div>
    	)
    }
}
export default userDeshboard