const router = require("express").Router();
const {
  updateStudent,
  deleteStudent,
  singleStudent,
  AllStudent,
  filterStudent,
  ApprovalOfStudent,
  searchStudent
} = require("../controllers/Student");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/allstudents")
  .get(
    authenticateUser,
    authorizePermissions(["admin", "employee"]),
    AllStudent
  );
router.route('/filter/data').post(authenticateUser,authorizePermissions(['admin','employee']),filterStudent)
router.route('/searchStudent').post(authenticateUser, authorizePermissions(["admin","employee"]),searchStudent)
router.route('/approval/:id').get(authenticateUser,authorizePermissions(['admin']),ApprovalOfStudent)

router
  .route("/:id")
  .get(authenticateUser, singleStudent)
  .patch(authenticateUser, updateStudent)
  .delete(authenticateUser, authorizePermissions(["admin"]), deleteStudent)
  
module.exports = router;
