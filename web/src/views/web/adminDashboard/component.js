import React, { Component } from "react"
import 'antd/dist/antd.css';
import _ from 'lodash'
import { DeleteFilled , EditFilled , ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal , Button  , Select , notification} from 'antd';


const { Option } = Select;
const { confirm } = Modal;

class adminDeshboard extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      createTicketModal:false,
	      ticketName:'',
	      ticketDescription:'',
	      err:{},
	      editTicketModal:false,
	      editData:'',
	      notificationShown:false
	    }
    }
    componentDidMount(){
        const {fetchTicket , fetchUsers} = this.props
    	fetchTicket()
    	fetchUsers()
    }
	createTicketModal = () => {
	    this.setState({
	      createTicketModal: true
	    });
	};

    handleCancel = () => {
    	const {editData} = this.state
	    this.setState({
	      createTicketModal: false,
	      ticketName:_.get(editData , 'name' , ''),
	      ticketDescription:_.get(editData , 'ticketDescription' , ''),
	      editTicketModal: false
		 });
	 };

	 handleChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value })
  }

	handleSubmit=()=> {
	    // event.preventDefault()
	    const err = {}
	    const {ticketName , ticketDescription} = this.state
	    if (ticketName === '') {
	      err.ticketName = 'Enter Ticket Name'
	    }
	    
	    this.setState({ err })
	    
	    if (!Object.keys(err).length) {
	        const { createTicket } = this.props
	        const obj = {
	          name: ticketName,
	          description:ticketDescription
	        }
	        createTicket(obj)
	        this.setState({
		      createTicketModal: false,
		      ticketName:'',
		      ticketDescription:'',
		      err:{}
		    });
	    }
	  }

	  handleTicketEdit=()=> {
	    // event.preventDefault()
	    const err = {}
	    const {ticketName , ticketDescription , editData} = this.state
	    if (ticketName === '') {
	      err.ticketName = 'Enter Ticket Name'
	    }
	    
	    this.setState({ err })	    
	    if (!Object.keys(err).length) {
	        const { updateTicket } = this.props
	        const obj = {
	          name: ticketName,
	          description:ticketDescription,
	          id:_.get(editData,'id',''),
	        }
	        updateTicket(obj)
	        this.setState({
		      editTicketModal: false,
		      ticketName:'',
		      ticketDescription:'',
		      err:{}
		    });
	    }
	  }

    showDeleteConfirm=(data)=> {
	    const {deleteTicket} = this.props
	    confirm({
	      title: 'Are you sure delete this Ticket?',
	      icon: <ExclamationCircleOutlined />,
	      content: '',
	      okText: 'Yes',
	      okType: 'danger',
	      cancelText: 'No',
	      onOk() {
	        deleteTicket({id:data.id})
	      },
	      onCancel() {
	        console.log('Cancel');
	      },
	    });
	  }

	showEditModal = (data) => {
	    this.setState({
	      editTicketModal: true,
	      editData:data,
	      ticketName:_.get(data,'name',''),
	      ticketDescription:_.get(data,'description','')
	    });
	  };

	handleTicket=(userId , ticketValue )=> {
	  const { updateTicket } = this.props
      const obj = {
	      userId:userId,
	      id:_.get(ticketValue,'id',''),
	    }
	    updateTicket(obj)
	}

	handleTicketOrder=(value , ticketValue )=> {
	  const { updateTicket } = this.props
      const obj = {
	      ticketOrder:value,
	      id:_.get(ticketValue,'id',''),
	    }
	    updateTicket(obj)
	}

	componentWillReceiveProps(nextProps){
	    const {ticketsOrder} = nextProps
	    const {notificationShown} = this.state
	    if(ticketsOrder && ticketsOrder.length > 0 && !notificationShown){
	    	ticketsOrder.map((data , i)=>{
               notification['info']({
               	onClick:()=>this.callFunction(data),
			    message: 'Order For Tickets',
			    description:
			      	`${data['User.name']} order for ticket ${data['Ticket.name']}.`,
			  });
	    	})
	    	this.setState({notificationShown:true})
	    }
	  }

	  callFunction=(data)=>{
	     const {updateTicketOrder} = this.props
	     updateTicketOrder({id:data.id})
	  }

	render() {  
	    const {createTicketModal , err , ticketName , ticketDescription , editTicketModal} = this.state
        const {tickets , users} = this.props
        const showOptions = users.length > 0 && users.map((userData , i)=>{
            return(
            	<Option key = {i} value={_.get(userData,'uid','')}>{_.get(userData,'name','')}</Option>
            )
        })
        const sortByArray =  ['High','Medium','low'];
		const sortTicketArray = _.sortBy(tickets, (item) => {
			 if(item.ticketOrder){
		        return sortByArray.indexOf(item.ticketOrder)
		     }
			
		 })
	    const showData = sortTicketArray.length > 0 && sortTicketArray.map((data , i)=>{
	      return(
	      <tr key = {i}>
	        <td className='paddingLeft'>{_.get(data,'name' , '')}</td>
	        <td className='paddingLeft'>{_.get(data,'description' , '')}</td>
	        <td className='paddingLeft'><EditFilled onClick={()=>this.showEditModal(data)}/></td>
	        <td className='paddingLeft'><DeleteFilled onClick={()=>this.showDeleteConfirm(data)}/></td>
	        <td className='paddingLeft'>
	        <Select value={data['User.name'] ? data['User.name'] : 'NA' } style={{ width: 120 }} onChange={(value)=>this.handleTicket(value , data)}>
		      {showOptions}
		    </Select>
	        </td>
	        <td className='paddingLeft'>
		        <Select value={data && data.ticketOrder ? data.ticketOrder : 'low'} style={{ width: 120 }} onChange={(value)=>this.handleTicketOrder(value , data)}>
			      <Option value={'low'}>{'low'}</Option>
			      <Option value={'Medium'}>{'Medium'}</Option>
			      <Option value={'High'}>{'High'}</Option>
			    </Select>
	        </td>
	      </tr>
	      )
	    })
        return(
            <div className="col-md-6 col-md-offset-3">
               <h2>Create Ticket by clicking on create ticket</h2>
		      <form  name="form">
		        <div className="form-group">
		         <Button  className="btn btn-primary" onClick={()=>this.createTicketModal()}>Create Ticket</Button>
		        </div>
		      </form>
		      <table>
		        <thead>
		          <tr>
		            <th className='paddingLeft'>{'Ticket Name'}</th>
		            <th className='paddingLeft'>{'Description'}</th>
		            <th className='paddingLeft'>{'Edit'}</th>
		            <th className='paddingLeft'>{'Delete'}</th>
		            <th className='paddingLeft'>{'Assign'}</th>
		            <th className='paddingLeft'>{'Set Priority'}</th>
		          </tr>
		        </thead>
		        <tbody>
		          {showData}
		        </tbody>
		       </table>
			  <Modal
		          title="Create Ticket"
		          visible={createTicketModal}
		          onOk={()=>this.handleSubmit()}
		          onCancel={()=>this.handleCancel()}
	           >
			       <form  onSubmit={this.handleSubmit}>
			          <div className={'form-group'}>
			            <label htmlFor="ticketName">Ticket Name</label>
			            <input type="text" className="form-control" name="ticketName" value={ticketName} onChange={this.handleChange.bind(this)} />
			            { err && err.ticketName ?
			             <div className="help-block">{err.ticketName}</div> : ''
			             }   
			          </div> 
			          <div className={'form-group'}>
			            <label htmlFor="ticketDescription">Ticket Description</label>
			            <input type="text" className="form-control" name="ticketDescription" value={ticketDescription} onChange={this.handleChange.bind(this)} />
			            { err && err.ticketDescription ?
			             <div className="help-block">{err.ticketDescription}</div> : ''
			             }   
			          </div>  
			      </form> 
	           </Modal>
	           <Modal
		          title="Edit Ticket"
		          visible={editTicketModal}
		          onOk={()=>this.handleTicketEdit()}
		          onCancel={()=>this.handleCancel()}
	           >
			       <form  onSubmit={this.handleSubmit}>
			          <div className={'form-group'}>
			            <label htmlFor="ticketName">Ticket Name</label>
			            <input type="text" className="form-control" name="ticketName" value={ticketName} onChange={this.handleChange.bind(this)} />
			            { err && err.ticketName ?
			             <div className="help-block">{err.ticketName}</div> : ''
			             }   
			          </div> 
			          <div className={'form-group'}>
			            <label htmlFor="ticketDescription">Ticket Description</label>
			            <input type="text" className="form-control" name="ticketDescription" value={ticketDescription} onChange={this.handleChange.bind(this)} />
			            { err && err.ticketDescription ?
			             <div className="help-block">{err.ticketDescription}</div> : ''
			             }   
			          </div>  
			      </form> 
	           </Modal>
            </div>
     	)
	}
}

export default adminDeshboard