import {Director} from '../models/director.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginDirector = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existDirector = await Director.findOne({ email: emailLower })
    if (!existDirector) {
      return res.status(400).json({ message: 'Director not registered' })
    }

    const isMatch = await bcrypt.compare(password, existDirector.password)
    if (!isMatch) {
      return res.status(403).json({ message: 'email or password is incorrect' })
    }

    const token = jwt.sign(
      {
        id: existDirector._id,
        role: 'director'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie("token",token,{httpOnly:true})

    const directorData = existDirector.toObject()
    delete directorData.password
    
    res.status(200).json({
      status: 1,
      message: 'Director loggedIn successfully',
      data: directorData,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const registerDirector = async(req,res) =>{
    const { name, email,  password } = req.body
    try {
      const directorExists = await Director.exists({})
      if (directorExists) {
        return res.status(403).json({ message: "A director is already registered" })
      }

      if(!name || !email  || !password ){
            return res.status(400).json({
        status:0,
    message: "All fields are required"}
        )}
         const emailLower = email.trim().toLowerCase()
         const existDirector = await Director.findOne({email: emailLower})
         if(existDirector){
            return res.status(400).json({message: "Director already registered"})
         }

        const hashedPassword = await bcrypt.hash(password,10)

         const newDirector = await Director.create({
                name,
                email: emailLower,
                password: hashedPassword
         })
        
        res.status(201).json({
            status: 1,
            message: "Director registered successfully",
            data: { id: newDirector._id, name: newDirector.name, email: newDirector.email }
        })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: `server error ${error}`
        })
    }
}

const logoutDirector = async(req,res) =>{
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Director logged out successfully' });
    } catch (error) {
        console.error('Error in logoutDirector:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { loginDirector, registerDirector, logoutDirector }