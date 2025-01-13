import express from 'express';
import {createEmployee, readEmployees, editEmployee, deleteEmployee } from '../controllers/employeeController.js';

const router = express.Router();

// API Endpoints
router.post('/', createEmployee); 
router.get('/', readEmployees); 
router.put('/:id', editEmployee); 
router.delete('/:id', deleteEmployee);

export default router;
