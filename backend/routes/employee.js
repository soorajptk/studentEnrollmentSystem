const router = require("express").Router();
const {
  AllEmployee,
  DeleteEmployee,
  SingleEmployee,
  UpdateEmployee,
  ApprovalOfEmployee,
  FilterEmployee,
  searchEmployee
} = require("../controllers/Employee");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
router
  .route("/searchemployee")
  .post(authenticateUser, authorizePermissions(["admin"]),searchEmployee);
router
  .route("/filter/employee")
  .post(authenticateUser, authorizePermissions(["admin"]), FilterEmployee);
router
  .route("/allemployee")
  .get(authenticateUser, authorizePermissions(["admin"]), AllEmployee);

router
  .route("/approvalofemployee/:id")
  .get(authenticateUser, authorizePermissions(["admin"]), ApprovalOfEmployee);
router
  .route("/:id")
  .get(
    authenticateUser,
    authorizePermissions(["admin", "employee"]),
    SingleEmployee
  )
  .patch(
    authenticateUser,
    authorizePermissions(["admin", "employee"]),
    UpdateEmployee
  )
  .delete(authenticateUser, authorizePermissions(["admin"]), DeleteEmployee);

module.exports = router;
