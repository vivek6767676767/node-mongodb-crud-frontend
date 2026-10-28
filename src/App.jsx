import { useEffect, useState } from "react";

const API = "https://node-mongodb-crud.onrender.com";

function App() {

    const [activeTab, setActiveTab] = useState("student");

    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(false);

    const [studentForm, setStudentForm] = useState({
        name: "",
        email: "",
        age: "",
        city: ""
    });

    const [teacherForm, setTeacherForm] = useState({
        name: "",
        email: "",
        subject: "",
        experience: "",
        city: ""
    });

    const [courseForm, setCourseForm] = useState({
        courseName: "",
        courseCode: "",
        duration: "",
        fees: "",
        category: "",
        mode: ""
    });

    const [editingStudent, setEditingStudent] = useState(null);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);


    // ======================================
    // GET STUDENTS
    // ======================================

    const getStudents = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/student/getdata`
            );

            const result = await response.json();

            setStudents(result.data || []);

        } catch (error) {

            console.log(error);
            alert("Unable to load students");

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // GET TEACHERS
    // ======================================

    const getTeachers = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/teacher/getdata`
            );

            const result = await response.json();

            setTeachers(result.data || []);

        } catch (error) {

            console.log(error);
            alert("Unable to load teachers");

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // GET COURSES
    // ======================================

    const getCourses = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/course/getdata`
            );

            const result = await response.json();

            setCourses(result.data || []);

        } catch (error) {

            console.log(error);
            alert("Unable to load courses");

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // LOAD DATA WHEN TAB CHANGES
    // ======================================

    useEffect(() => {

        if (activeTab === "student") {
            getStudents();
        }

        if (activeTab === "teacher") {
            getTeachers();
        }

        if (activeTab === "course") {
            getCourses();
        }

    }, [activeTab]);


    // ======================================
    // STUDENT FORM CHANGE
    // ======================================

    const handleStudentChange = (e) => {

        setStudentForm({
            ...studentForm,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // TEACHER FORM CHANGE
    // ======================================

    const handleTeacherChange = (e) => {

        setTeacherForm({
            ...teacherForm,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // COURSE FORM CHANGE
    // ======================================

    const handleCourseChange = (e) => {

        setCourseForm({
            ...courseForm,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // STUDENT POST
    // ======================================

    const addStudent = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/student/insertdata`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Student added successfully");

                setStudentForm({
                    name: "",
                    email: "",
                    age: "",
                    city: ""
                });

                getStudents();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // STUDENT PUT
    // ======================================

    const updateStudent = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/student/updatedata?name=${encodeURIComponent(editingStudent)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Student updated successfully");

                setEditingStudent(null);

                setStudentForm({
                    name: "",
                    email: "",
                    age: "",
                    city: ""
                });

                getStudents();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // STUDENT DELETE
    // ======================================

    const deleteStudent = async (name) => {

        const confirmDelete = window.confirm(
            `Delete student "${name}"?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API}/student/deletedata?name=${encodeURIComponent(name)}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Student deleted successfully");

                getStudents();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // EDIT STUDENT
    // ======================================

    const startStudentEdit = (student) => {

        setEditingStudent(student.name);

        setStudentForm({
            name: student.name || "",
            email: student.email || "",
            age: student.age || "",
            city: student.city || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ======================================
    // TEACHER POST
    // ======================================

    const addTeacher = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/teacher/insertdata`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(teacherForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Teacher added successfully");

                setTeacherForm({
                    name: "",
                    email: "",
                    subject: "",
                    experience: "",
                    city: ""
                });

                getTeachers();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // TEACHER PUT
    // ======================================

    const updateTeacher = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/teacher/updatedata?name=${encodeURIComponent(editingTeacher)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(teacherForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Teacher updated successfully");

                setEditingTeacher(null);

                setTeacherForm({
                    name: "",
                    email: "",
                    subject: "",
                    experience: "",
                    city: ""
                });

                getTeachers();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // TEACHER DELETE
    // ======================================

    const deleteTeacher = async (name) => {

        const confirmDelete = window.confirm(
            `Delete teacher "${name}"?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API}/teacher/deletedata?name=${encodeURIComponent(name)}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Teacher deleted successfully");

                getTeachers();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // EDIT TEACHER
    // ======================================

    const startTeacherEdit = (teacher) => {

        setEditingTeacher(teacher.name);

        setTeacherForm({
            name: teacher.name || "",
            email: teacher.email || "",
            subject: teacher.subject || "",
            experience: teacher.experience || "",
            city: teacher.city || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ======================================
    // COURSE POST
    // ======================================

    const addCourse = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/course/insertdata`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(courseForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Course added successfully");

                setCourseForm({
                    courseName: "",
                    courseCode: "",
                    duration: "",
                    fees: "",
                    category: "",
                    mode: ""
                });

                getCourses();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // COURSE PUT
    // ======================================

    const updateCourse = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${API}/course/updatedata?courseCode=${encodeURIComponent(editingCourse)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(courseForm)
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Course updated successfully");

                setEditingCourse(null);

                setCourseForm({
                    courseName: "",
                    courseCode: "",
                    duration: "",
                    fees: "",
                    category: "",
                    mode: ""
                });

                getCourses();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // COURSE DELETE
    // ======================================

    const deleteCourse = async (courseCode) => {

        const confirmDelete = window.confirm(
            `Delete course "${courseCode}"?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API}/course/deletedata?courseCode=${encodeURIComponent(courseCode)}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert("Course deleted successfully");

                getCourses();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };


    // ======================================
    // EDIT COURSE
    // ======================================

    const startCourseEdit = (course) => {

        setEditingCourse(course.courseCode);

        setCourseForm({
            courseName: course.courseName || "",
            courseCode: course.courseCode || "",
            duration: course.duration || "",
            fees: course.fees || "",
            category: course.category || "",
            mode: course.mode || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ======================================
    // CANCEL EDIT
    // ======================================

    const cancelEdit = () => {

        setEditingStudent(null);
        setEditingTeacher(null);
        setEditingCourse(null);

        setStudentForm({
            name: "",
            email: "",
            age: "",
            city: ""
        });

        setTeacherForm({
            name: "",
            email: "",
            subject: "",
            experience: "",
            city: ""
        });

        setCourseForm({
            courseName: "",
            courseCode: "",
            duration: "",
            fees: "",
            category: "",
            mode: ""
        });

    };


    return (

        <div className="app">

            {/* HEADER */}

            <header className="header">

                <div>

                    <h1>CRUD Management System</h1>

                    <p>
                        Student • Teacher • Course
                    </p>

                </div>

            </header>


            {/* NAVIGATION */}

            <nav className="navigation">

                <button
                    className={activeTab === "student" ? "active" : ""}
                    onClick={() => setActiveTab("student")}
                >
                    👨‍🎓 Students
                </button>

                <button
                    className={activeTab === "teacher" ? "active" : ""}
                    onClick={() => setActiveTab("teacher")}
                >
                    👨‍🏫 Teachers
                </button>

                <button
                    className={activeTab === "course" ? "active" : ""}
                    onClick={() => setActiveTab("course")}
                >
                    📚 Courses
                </button>

            </nav>


            <main className="container">


                {/* ======================================
                    STUDENT
                ====================================== */}

                {activeTab === "student" && (

                    <>

                        <section className="form-card">

                            <div className="section-title">

                                <div>
                                    <h2>
                                        {editingStudent
                                            ? "Update Student"
                                            : "Add New Student"}
                                    </h2>

                                    <p>
                                        {editingStudent
                                            ? `Editing ${editingStudent}`
                                            : "Enter student information"}
                                    </p>
                                </div>

                            </div>


                            <form
                                onSubmit={
                                    editingStudent
                                        ? updateStudent
                                        : addStudent
                                }
                                className="form-grid"
                            >

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Student Name"
                                    value={studentForm.name}
                                    onChange={handleStudentChange}
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={studentForm.email}
                                    onChange={handleStudentChange}
                                    required
                                />

                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={studentForm.age}
                                    onChange={handleStudentChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={studentForm.city}
                                    onChange={handleStudentChange}
                                    required
                                />

                                <div className="form-buttons">

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        {editingStudent
                                            ? "Update Student"
                                            : "Add Student"}
                                    </button>

                                    {editingStudent && (

                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </form>

                        </section>


                        <section className="table-card">

                            <div className="table-header">

                                <div>
                                    <h2>Students</h2>
                                    <span>
                                        {students.length} records
                                    </span>
                                </div>

                                <button
                                    className="refresh-btn"
                                    onClick={getStudents}
                                >
                                    ↻ Refresh
                                </button>

                            </div>


                            {loading ? (

                                <div className="loading">
                                    Loading students...
                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Age</th>
                                                <th>City</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {students.map((student) => (

                                                <tr key={student._id}>

                                                    <td>{student.name}</td>

                                                    <td>{student.email}</td>

                                                    <td>{student.age}</td>

                                                    <td>{student.city}</td>

                                                    <td>

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                startStudentEdit(student)
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteStudent(student.name)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>

                    </>

                )}


                {/* ======================================
                    TEACHER
                ====================================== */}

                {activeTab === "teacher" && (

                    <>

                        <section className="form-card">

                            <h2>
                                {editingTeacher
                                    ? "Update Teacher"
                                    : "Add New Teacher"}
                            </h2>

                            <p>
                                {editingTeacher
                                    ? `Editing ${editingTeacher}`
                                    : "Enter teacher information"}
                            </p>


                            <form
                                onSubmit={
                                    editingTeacher
                                        ? updateTeacher
                                        : addTeacher
                                }
                                className="form-grid"
                            >

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Teacher Name"
                                    value={teacherForm.name}
                                    onChange={handleTeacherChange}
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={teacherForm.email}
                                    onChange={handleTeacherChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={teacherForm.subject}
                                    onChange={handleTeacherChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="experience"
                                    placeholder="Experience"
                                    value={teacherForm.experience}
                                    onChange={handleTeacherChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={teacherForm.city}
                                    onChange={handleTeacherChange}
                                    required
                                />

                                <div className="form-buttons">

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        {editingTeacher
                                            ? "Update Teacher"
                                            : "Add Teacher"}
                                    </button>

                                    {editingTeacher && (

                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </form>

                        </section>


                        <section className="table-card">

                            <div className="table-header">

                                <div>
                                    <h2>Teachers</h2>
                                    <span>
                                        {teachers.length} records
                                    </span>
                                </div>

                                <button
                                    className="refresh-btn"
                                    onClick={getTeachers}
                                >
                                    ↻ Refresh
                                </button>

                            </div>


                            {loading ? (

                                <div className="loading">
                                    Loading teachers...
                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Subject</th>
                                                <th>Experience</th>
                                                <th>City</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {teachers.map((teacher) => (

                                                <tr key={teacher._id}>

                                                    <td>{teacher.name}</td>

                                                    <td>{teacher.email}</td>

                                                    <td>{teacher.subject}</td>

                                                    <td>{teacher.experience}</td>

                                                    <td>{teacher.city}</td>

                                                    <td>

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                startTeacherEdit(teacher)
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteTeacher(teacher.name)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>

                    </>

                )}


                {/* ======================================
                    COURSE
                ====================================== */}

                {activeTab === "course" && (

                    <>

                        <section className="form-card">

                            <h2>
                                {editingCourse
                                    ? "Update Course"
                                    : "Add New Course"}
                            </h2>

                            <p>
                                {editingCourse
                                    ? `Editing ${editingCourse}`
                                    : "Enter course information"}
                            </p>


                            <form
                                onSubmit={
                                    editingCourse
                                        ? updateCourse
                                        : addCourse
                                }
                                className="form-grid"
                            >

                                <input
                                    type="text"
                                    name="courseName"
                                    placeholder="Course Name"
                                    value={courseForm.courseName}
                                    onChange={handleCourseChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="courseCode"
                                    placeholder="Course Code"
                                    value={courseForm.courseCode}
                                    onChange={handleCourseChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Duration"
                                    value={courseForm.duration}
                                    onChange={handleCourseChange}
                                    required
                                />

                                <input
                                    type="number"
                                    name="fees"
                                    placeholder="Fees"
                                    value={courseForm.fees}
                                    onChange={handleCourseChange}
                                    required
                                />

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={courseForm.category}
                                    onChange={handleCourseChange}
                                    required
                                />

                                <select
                                    name="mode"
                                    value={courseForm.mode}
                                    onChange={handleCourseChange}
                                    required
                                >
                                    <option value="">
                                        Select Mode
                                    </option>

                                    <option value="Online">
                                        Online
                                    </option>

                                    <option value="Offline">
                                        Offline
                                    </option>

                                    <option value="Hybrid">
                                        Hybrid
                                    </option>

                                </select>


                                <div className="form-buttons">

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                    >
                                        {editingCourse
                                            ? "Update Course"
                                            : "Add Course"}
                                    </button>

                                    {editingCourse && (

                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </form>

                        </section>


                        <section className="table-card">

                            <div className="table-header">

                                <div>
                                    <h2>Courses</h2>
                                    <span>
                                        {courses.length} records
                                    </span>
                                </div>

                                <button
                                    className="refresh-btn"
                                    onClick={getCourses}
                                >
                                    ↻ Refresh
                                </button>

                            </div>


                            {loading ? (

                                <div className="loading">
                                    Loading courses...
                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>
                                                <th>Course</th>
                                                <th>Code</th>
                                                <th>Duration</th>
                                                <th>Fees</th>
                                                <th>Category</th>
                                                <th>Mode</th>
                                                <th>Actions</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {courses.map((course) => (

                                                <tr key={course._id}>

                                                    <td>{course.courseName}</td>

                                                    <td>
                                                        <span className="badge">
                                                            {course.courseCode}
                                                        </span>
                                                    </td>

                                                    <td>{course.duration}</td>

                                                    <td>₹{course.fees}</td>

                                                    <td>{course.category}</td>

                                                    <td>{course.mode}</td>

                                                    <td>

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                startCourseEdit(course)
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteCourse(course.courseCode)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>

                    </>

                )}

            </main>

        </div>

    );

}

export default App;