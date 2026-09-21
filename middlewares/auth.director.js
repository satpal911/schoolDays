import jwt from 'jsonwebtoken'
const Director = require('../director.model')

const directorAuthentication = async (req, res, next) => {
  try {
    let token = null
    if (req.cookies?.token) {
      token = req.cookies.token
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split('')[0]
    }
    if (!token) {
      return res.status(400).json({ message: 'User not found, please login' })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: 'Middleware authentication error'
      })
    }

    const director = await Director.findById(decoded.id).select('-password')
    if (!director) {
      return res.status(401).json({
        status: 0,
        message: 'User not found. Please log in again.'
      })
    }
    req.director = director
    next()
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: 'Middleware authentication error'
    })
  }
}

export default directorAuthentication