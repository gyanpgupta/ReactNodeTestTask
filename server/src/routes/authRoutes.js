import express from 'express'
import AuthController from './../controllers/authControllers'

const router = express.Router()

const baseUrl = '/auth'

router.post(baseUrl + '/login', AuthController.userLogin)
router.post(baseUrl + '/register', AuthController.userRegistration)
router.post(baseUrl + '/createTicket', AuthController.createTicket)
router.get(baseUrl + '/getTicket', AuthController.getTicket)
router.post(baseUrl + '/deleteTicket', AuthController.deleteTicket)
router.put(baseUrl + '/editTicket', AuthController.editTicket)
router.get(baseUrl + '/getUsers', AuthController.getUsers)
router.get(baseUrl + '/getUserTickets/:userId', AuthController.getUserTickets)
router.post(baseUrl + '/createTicketsOrder', AuthController.createTicketsOrder)
router.put(baseUrl + '/editTicketOrder', AuthController.editTicketOrder)
export default router
