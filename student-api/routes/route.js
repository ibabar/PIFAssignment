const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.get('/api/getAllCourses', controller.getAllCourses);
router.post('/api/addStudent' , controller.addStudent);
router.post('/api/addCourse',controller.addCourse);
router.post('/api/deleteStudent' , controller.deleteStudent);
router.put('/api/updateData' , controller.updateData);

module.exports = router;