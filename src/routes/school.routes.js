const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');

// Create school using this route
router.post('/addSchool', schoolController.addSchool);

// Delete school using this route
router.delete('/delete-school/:id', schoolController.deleteSchool);

// Retrieve single school by id
router.get('/get-school-by-id/:id', schoolController.getSchoolById);

// Retrieve all school
router.get('/listSchools', schoolController.getAllSchools);

// Update school using this route
router.put('/update-school/:id', schoolController.updateSchool);

module.exports = router;