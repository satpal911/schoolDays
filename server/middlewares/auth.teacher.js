import jwt from 'jsonwebtoken'
import { Teacher } from '../models/teacher.model.js'

const teacherAuthentication = async (req, res, next) => {
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

      if (decoded.role !== 'teacher') {
        return res.status(403).json({ message: 'Teacher access required' })
      }

    const teacher = await Teacher.findById(decoded.id).select('-password')
    if (!teacher) {
      return res.status(401).json({
        status: 0,
        message: 'User not found. Please log in again.'
      })
    }
    req.teacher = teacher
    next()
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: 'Middleware authentication error'
    })
  }
}

export default teacherAuthentication