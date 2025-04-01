function loadStudents() {
    fetch('http://localhost:5000/students')
        .then(response => response.json())
        .then(data => {
            const studentTable = document.getElementById('studentTable');
            studentTable.innerHTML = "";
            data.forEach(student => {
                studentTable.innerHTML += `
                    <tr>
                        <td>${student.rollno}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.course}</td>
                        <td>${student.address}</td>

                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id}, '${student.rollno}', '${student.name}', '${student.email}', '${student.phone}', '${student.course}','${student.address}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>`;
            });
        });
}

function saveStudent() {
    const id = document.getElementById('studentId').value;
    const rollno = document.getElementById('rollno').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    const address = document.getElementById('address').value;

    const studentData = { rollno, name, email, phone, course, address };

    if (id) {
        // Update student
        fetch(`http://localhost:5000/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        }).then(() => {
            clearForm();
            loadStudents();
        });
    } else {
        // Add new student
        fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        }).then(() => {
            clearForm();
            loadStudents();
        });
    }
}

function editStudent(id, rollno, name, email, phone, course, address) {
    document.getElementById('studentId').value = id;
    document.getElementById('rollno').value = rollno;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('course').value = course;
    document.getElementById('address').value = address;
}

function deleteStudent(id) {
    fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' })
        .then(() => loadStudents());
}

function clearForm() {
    document.getElementById('studentId').value = "";
    document.getElementById('rollno').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('course').value = "";
    document.getElementById('address').value = "";
}

function logout() {
    window.location.href = "index.html"; // Redirect to login page
}

function searchStudent(event) {
    event.preventDefault(); // Prevent page reload

    const query = document.getElementById("searchInput").value.toLowerCase();

    fetch(`http://localhost:5000/students`) // Fetch all students
        .then(response => response.json())
        .then(data => {
            const filteredStudents = data.filter(student => 
                student.name.toLowerCase().includes(query) || 
                student.rollno.toLowerCase().includes(query)
            );

            displayStudents(filteredStudents);
        });
}

function cancelSearch() {
    document.getElementById("searchInput").value = ""; // Clear input
    loadStudents(); // Reload all students
}

function displayStudents(students) {
    const studentTable = document.getElementById("studentTable");
    studentTable.innerHTML = ""; // Clear previous results

    students.forEach(student => {
        studentTable.innerHTML += `
            <tr>
                <td>${student.rollno}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${student.address}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id}, '${student.rollno}', '${student.name}', '${student.email}', '${student.phone}', '${student.course}', '${student.address}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>`;
    });
}


loadStudents();