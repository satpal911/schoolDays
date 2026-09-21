import jwt from 'jsonwebtoken'
import { Principal } from '../models/principal.model.js'

const principalAuthentication = async (req, res, next) => {
  try {
    let token = null
    if (req.cookies?.token) {
      token = req.cookies.token
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return res.status(400).json({ message: 'User not found, please login' })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(401).json({
        status: 0,
        message: 'Invalid or expired token'
      })
    }

    if (decoded.role !== 'principal') {
      return res.status(403).json({ message: 'Principal access required' })
    }

    const principal = await Principal.findById(decoded.id).select('-password')
    if (!principal) {
      return res.status(401).json({
        status: 0,
        message: 'User not found. Please log in again.'
      })
    }
    req.principal = principal
    next()
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: 'Middleware authentication error'
    })
  }
}

export default principalAuthentication