const router=require('express').Router()
const {CourseCreate,SingleCourse,AllCourse,UpdateCourse,deleteCourse} =require('../controllers/Course')
const {authenticateUser,authorizePermissions}=require('../middlewares/authentication')

router.route('/allcourse').get(AllCourse)
router.route('/Create').post(authenticateUser,authorizePermissions(['admin']),CourseCreate)
router.route('/:id').get(SingleCourse).patch(authenticateUser,authorizePermissions(['admin']),UpdateCourse).delete(authenticateUser,authorizePermissions(['admin']),deleteCourse)

module.exports=router