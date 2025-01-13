const API_URL = 'http://localhost:3300/employees';



//Read operation: (for read/fatch all data from database)
document.addEventListener('DOMContentLoaded', fetchEmployees);
async function fetchEmployees() {
   
    const response = await fetch(API_URL);
    const employees = await response.json();

    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';

    employees.forEach((employee) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${employee.department}</td>
            <td>${new Date(employee.joiningDate).toLocaleDateString()}</td>
            <td>
                <button class="deleteBtn" onclick="deleteEmployee('${employee._id}')">Delete</button>
            </td>
            <td>
                <button class ="editBtn" onclick="editEmployee('${employee._id}')">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Store the ID of the employee being edited
let currentEditingId = null; 


//Creat & Update operation: (to add emp-data to database edit/creat)
document.getElementById('employeeForm').addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const department = document.getElementById('department').value;
    const joiningDate = document.getElementById('joiningDate').value;

    if (currentEditingId) {
        // Edit existing employee

        const response = await fetch(`${API_URL}/${currentEditingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role, department, joiningDate }),
        });

        if (response.ok) {
            fetchEmployees();
            e.target.reset();
            document.getElementById('submitBtn').innerText = 'Add Employee';
            currentEditingId = null; // Reset editing ID
        }
    } else {
        // Add new employee
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role, department, joiningDate }),
        });

        if (response.ok) {
            fetchEmployees();
            e.target.reset();
        }
    }
}

// Delete operation: (by id)
async function deleteEmployee(id) {
    // Delete employee
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    // Update the list of employees
    fetchEmployees();
}

// Edit operation: (by id)
async function editEmployee(id) {

    document.getElementById('submitBtn').innerText = 'Update';

    // Fetch employee data by id
    const response = await fetch(`${API_URL}/${id}`, { method: 'PUT' });

    //String to JSON
    const employee = await response.json();

    // Populate the form
    document.getElementById('name').value = employee.name;
    document.getElementById('role').value = employee.role;
    document.getElementById('department').value = employee.department;
    document.getElementById('joiningDate').value = employee.joiningDate.split('T')[0];

    // Set the editing id
    currentEditingId = id; 
}
