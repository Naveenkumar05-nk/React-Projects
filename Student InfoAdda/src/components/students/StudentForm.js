import React,{ useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import Input from '../layout/Input';
import { useFirestore } from "react-redux-firebase"

const StudentForm = () => {
    const firestore = useFirestore();
    //UseHistory is used to redirect to the homepage once the addition/updation of student is done
    let history = useHistory()

    const { id } = useParams();
    
    //Ternary operator to make sure whether to add or update student accn to the availability of the id
    const docRef = id ? firestore.collection("students").doc(id) : null;

    const [student, setStudent] = useState({
        name: "",
        email: "",
        standard: "",
        phone: "",
        address1: "",
        address2: "",
      });

    const onInputChange = (e) =>{
        setStudent({ ...student, [e.target.name] : e.target.value });
    }
    
    //To call the loadStudent only when its the updation of student data through id
    useEffect(()=>{
        if(id) {
          loadStudent();
        }
    }, [id]);

    //To fetch existing data from the database(firestore) for the update in student data
    const loadStudent = async () =>{
        try {
            
            const result = await docRef.get();

            if(result.exists) {
                setStudent(result.data());
            } else{
                alert("No Such Student!");
            }
        } catch (error) {
            console.log("error:", error);
        }
    };

    const submitForm = async (e) =>{
        e.preventDefault();
        
        //If id is there its for updation else for addition of the student
        if(id) {
            await docRef.update({ ...student, updatedAt: firestore.FieldValue.serverTimestamp() });
        } else{
            //Add a new student
            firestore.collection("students").add({ ...student, createdAt: firestore.FieldValue.serverTimestamp() });
        }
        history.push("/")
    };

    
    return (

        <div className="container">
            <div className="py-4">
                <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="card card-body shadow">
                    <form onSubmit = {submitForm}>
                        <div className="form-row form-group mb-4">
                        <div className="col-md-6">
                            <Input
                            placeholder="Enter Student Name"
                            name="name"
                            value={student.name}
                            onChange={onInputChange}
                            />                            
                        </div>

                        <div className="col-md-6">
                        <Input
                            placeholder="Enter Student Email"
                            name="email"
                            value={student.email}
                            onChange={onInputChange}
                            />
                        </div>

                        </div>
                        <div className="form-row form-group mb-4">
                        <div className="col-md-6">
                        <Input
                            placeholder="Enter Student Phone Number"
                            name="phone"
                            value={student.phone}
                            onChange={onInputChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <Input
                            placeholder="Enter Student Class"
                            name="standard"
                            value={student.standard}
                            onChange={onInputChange}
                            />
                        </div>
                        </div>

                        <div className="form-row form-group">
                        <div className="col-md-6">
                        <Input
                            placeholder="Enter Student Address Line 1"
                            name="address1"
                            value={student.address1}
                            onChange={onInputChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <Input
                            placeholder="Enter Student Address Line 2"
                            name="address2"
                            value={student.address2}
                            onChange={onInputChange}
                            />
                        </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                        {
                            id ? "update Student" : "Add Student"
                        }
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
       </div>
    )
}

export default StudentForm
