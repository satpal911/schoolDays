import studentAuthentication from './auth.student.js'
import teacherAuthentication from './auth.teacher.js'
import directorAuthentication from './auth.director.js'

const authMiddleware = {
   studentAuthentication,
   teacherAuthentication,
   directorAuthentication
}

export default authMiddleware