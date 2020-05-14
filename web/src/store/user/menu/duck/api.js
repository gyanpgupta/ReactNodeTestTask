import axios from "axios"

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME



 export const loginUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/login`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const registerUser = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/register`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const createTicket = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/createTicket`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const fetchTicket = data => {
 	return new Promise(async (resolve, reject) => {
     axios.get(`${HOSTNAME}/api/v1/auth/getTicket`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const updateTicket = data => {
 	return new Promise(async (resolve, reject) => {
     axios.put(`${HOSTNAME}/api/v1/auth/editTicket`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const deleteTicket = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/deleteTicket`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

export const fetchUsers = data => {
 	return new Promise(async (resolve, reject) => {
     axios.get(`${HOSTNAME}/api/v1/auth/getUsers`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

export const fetchUserTickets = data => {
	const userId = localStorage.getItem('token')
 	return new Promise(async (resolve, reject) => {
     axios.get(`${HOSTNAME}/api/v1/auth/getUserTickets/${userId}`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const createTicketsOrder = data => {
 	return new Promise(async (resolve, reject) => {
     axios.post(`${HOSTNAME}/api/v1/auth/createTicketsOrder`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}

 export const updateTicketOrder = data => {
 	return new Promise(async (resolve, reject) => {
     axios.put(`${HOSTNAME}/api/v1/auth/editTicketOrder`, data)
	  .then(function (response) {
	    resolve(response.data);
	  })
	  .catch(function (error) {
	    reject(error);
	  });
   })
}



