import Bcrypt from 'bcryptjs'
import _ from 'lodash'
// User registration and create user account

// sequelize imports

import db from '../models'

const userRegistration = async (req, res) => {
  try {
    const body = req.body
    let user = await db.User.findOne({
      where: { mail: body.mail },
      raw: true
    })
    let userType = await db.UserType.findOne({
      where: { name: body.role },
      raw: true
    })
    if (!user) {
      if (!userType) {
        userType = await db.UserType.create({ name: body.role},{raw: true})
      }
      const salt = await Bcrypt.genSalt(10)
      body.pass = await Bcrypt.hash(body.pass, salt)
      body.idTypeUser = userType.id
      user = await db.User.create(body)

      return res.status(200).json({
        status: true,
        message: "User created successfully.",
        data: user
      })
    } else {
      return res.status(200).json({
        status: false,
        message: "User already exists with this email address!!!",
        data: []
      })
    }
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: ''
    })
  }
}

// login with email and password and return token
const userLogin = async (req, res) => {
  try {
    const body = req.body
    const user = await db.User.findOne({
      limit: 1,
      where: { mail: body.mail }
      //order: [['createdAt', 'DESC' ], ['updateAt', 'DESC']] // { createdAt: 0, updateAt: 0 }
    })
    if (user) {
      const passwordCheck = await Bcrypt.compare(body.pass, user.pass)
      if (passwordCheck) {
        // const token = Helper.createJwtAuthToken(user)
        const users = await db.User.findOne({
          where: { uid: user.uid },
          raw: true,
          include: [{
            model: db.UserType,
            attributes: ['name']
          }]
        })
        return res.status(200).send({
          status: true,
          message: "Logged-in successfully.",
          data: { user: users }
        })
      } else {
        return res.status(200).send({
          status: false,
          message: "Wrong Password. Please try again.",
          data: {}
        })
      }
    } else {
      return res.status(200).send({
        status: false,
        message: "Username not found. Please register.",
        data: {}
      })
    }

  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

// create ticket
const createTicket = async (req, res) => {
  try {
    const ticket = await db.Ticket.create(req.body)
    return res.status(200).json({
      status: true,
      message: "Ticket created successfully.",
      data: ticket
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

// fetch ticket
const getTicket = async (req, res) => {
  try {
    const tickets = await db.Ticket.findAll({
      raw: true,
      include: [{
        model: db.User,
        attributes: ['name']
      }]
    })

    const ticketsOrder = await db.TicketsOrder.findAll({
      where: { showAdmin: false },
      raw: true,
      include: [
        {
          model: db.Ticket
        },
        {
          model: db.User
        }
      ]
    })

    return res.status(200).json({
      status: true,
      message: "Ticket created successfully.",
      data: tickets,
      ticketsOrder: ticketsOrder
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

//Delete Ticket
const deleteTicket = async (req, res) => {
  try {
    await db.Ticket.update({userId:null}, {
      where: { id: req.body.id }
    })
    await db.TicketsOrder.destroy({
      where: { ticketId: req.body.id }
    })
    const tickets = await db.Ticket.destroy({
      where: { id: req.body.id },
      raw: true
    })

    return res.status(200).json({
      status: true,
      message: "Ticket deleted successfully.",
      data: tickets
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

const editTicket = async (req, res) => {
  try {
    await db.Ticket.update(req.body, {
      where: { id: req.body.id }
    })

    return res.status(200).send({
      status: true,
      message: "Ticket Updated.",
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

//To get all users
const getUsers = async (req, res) => {
  try {
    const userType = await db.UserType.findOne({
      where: { name: 'User' }
    })
    const users = await db.User.findAll({
      where: { idTypeUser: userType.id },
      raw: true
    })
    return res.status(200).json({
      status: true,
      message: "Users found successfully.",
      data: users
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

//To get user tickets
const getUserTickets = async (req, res) => {
  try {
    const tickets = await db.Ticket.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: db.User,
        attributes: ['name'],
        where: { uid: req.params.userId }
      }],
      raw: true
    })
    return res.status(200).json({
      status: true,
      message: "Ticket found successfully.",
      data: tickets
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

// create ticket
const createTicketsOrder = async (req, res) => {
  try {
    const ticketOrder = await db.TicketsOrder.findOne({
      where: { userId: req.body.userId , ticketId:req.body.ticketId},
      raw: true
    })

    if (!ticketOrder) {
      const ticket = await db.TicketsOrder.create(req.body)
      return res.status(200).json({
        status: true,
        message: "Request sent successfully.",
        data: ticket
      })
    } else {
      return res.status(200).json({
        status: true,
        message: "You have already sent request.",
        data: ticketOrder
      })
    }
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

//edit ticket order

const editTicketOrder = async (req, res) => {
  try {
    await db.TicketsOrder.update({
      showAdmin: true,
    }, {
      where: { id: req.body.id }
    })

    return res.status(200).send({
      status: true,
      message: "Ticket order Updated.",
    })
  } catch (error) {
    return res.status(200).send({
      status: false,
      message: error.message,
      data: []
    })
  }
}

export default {
  userRegistration,
  userLogin,
  createTicket,
  getTicket,
  deleteTicket,
  editTicket,
  getUsers,
  getUserTickets,
  createTicketsOrder,
  editTicketOrder
}
