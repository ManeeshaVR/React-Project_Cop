import React, {useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {storage} from '../config/firebase.ts';
import {Modal} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

interface Member {
    _id: string,
    memberNo: number,
    name: string,
    department: string,
    salary: number,
    age: number,
    nic: string,
    email: string,
    image: string
}

const Member: React.FC = () => {

    const titleStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center'
    }

    const topicStyle: React.CSSProperties = {
        color: '#5e548e',
        justifyContent: 'center'
    }

    const tableHeadStyle: React.CSSProperties = {
        color: '#7400b8',
        textAlign: 'center'
    }

    const tableBodyStyle: React.CSSProperties = {
        color: '#870781',
        textAlign: 'center'
    }

    const nameStyle: React.CSSProperties = {
        color: '#560bad'
    }

    const emailStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: '#b388eb'
    }

    const viewStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center'
    }

    const viewStyle2: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'right'
    }

    const tableStyle: React.CSSProperties = {
        textAlign: 'center'
    }

    const modalStyle: React.CSSProperties = {
        zIndex: "9999",
    }

    const [members, setMembers] = useState<Member[]>([])

    const [updateModalState, setUpdateModalState] = useState<boolean>(false);
    const [viewModalState, setViewModalState] = useState<boolean>(false);

    const [memberNo, setMemberNo] = useState<number | ''>('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState<number | ''>('');
    const [age, setAge] = useState<number | ''>('');
    const [nic, setNic] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [updateMemberNo, setUpdateMemberNo] = useState<number | ''>('');
    const [updateName, setUpdateName] = useState('');
    const [updateDepartment, setUpdateDepartment] = useState('');
    const [updateSalary, setUpdateSalary] = useState<number | ''>('');
    const [updateAge, setUpdateAge] = useState<number | ''>('');
    const [updateNic, setUpdateNic] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updateImage, setUpdateImage] = useState<File | null>(null);

    useEffect(() => {
        findAllMembers();
    }, [])

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImage(event.target.files[0]);
    }

    const loadViewModal = async (id: string) => {
        const member = await AxiosInstance.get('/members/find-by-id/' + id);
        console.log(member.data)
        setSelectedMemberId(member.data._id)
        setUpdateMemberNo(member.data.memberNo)
        setUpdateName(member.data.name)
        setUpdateDepartment(member.data.department)
        setUpdateSalary(parseFloat(member.data.salary))
        setUpdateAge(parseInt(member.data.age))
        setUpdateNic(member.data.nic)
        setUpdateEmail(member.data.email)
        setUpdateImage(member.data.image)

        setViewModalState(true);
    }

    const loadUpdateModal = async (id: string) => {
        const member = await AxiosInstance.get('/members/find-by-id/' + id);
        console.log(member.data)
        setSelectedMemberId(member.data._id)
        setUpdateMemberNo(member.data.memberNo)
        setUpdateName(member.data.name)
        setUpdateDepartment(member.data.department)
        setUpdateSalary(parseFloat(member.data.salary))
        setUpdateAge(parseInt(member.data.age))
        setUpdateNic(member.data.nic)
        setUpdateEmail(member.data.email)

        setUpdateModalState(true);
    }

    const findAllMembers = async () => {
        const responese = await AxiosInstance.get('/members/find-all');
        setMembers(responese.data);
    }

    const updateMember = async () => {
        try {

            await AxiosInstance.put('/members/update/' + selectedMemberId, {
                memberNo: updateMemberNo, name: updateName, department: updateDepartment, salary: updateSalary, age: updateAge, nic: updateNic, email: updateEmail
            });
            setUpdateModalState(false);
            findAllMembers();

        } catch (e) {
            console.log(e)
        }
    }

    const deleteMember = async (id) => {
        await AxiosInstance.delete('/members/delete-by-id/' + id);
        findAllMembers();
    }

    const saveMember = async () => {
        let imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHZTQs8ojYjldwZDeEM73Fk6h4BOOXGRL1A&usqp=CAU';
        if (image) {
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random() + '-' + image.name}`);
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL();
                console.log(imageUrl);
            } catch (e) {
                console.log(e)
            }
        }

        try {
            const responese = await AxiosInstance.post('/members/create', {
                memberNo, name, department, salary, age, nic, email, image: imageUrl
            });

            console.log(responese);

            findAllMembers();
            setMemberNo('');
            setName('');
            setDepartment('');
            setSalary('');
            setAge('');
            setNic('');
            setEmail('');
        } catch (e) {
            console.log(e)
        }
    }

    const styleObj: React.CSSProperties = {
        marginBottom: '20px'
    }

    return (
        <>
            <br/><br/><br/><br/><br/>
            <div className="topic" style={titleStyle}>
                <FontAwesomeIcon icon={faUser} bounce size="2xl"
                                 style={{color: "#7256c8", marginRight: "20px", marginTop: "10px"}}/>
                <h1 style={topicStyle}>Members</h1>
            </div>
            <hr/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberNo">Member No</label>
                            <input value={memberNo} onChange={(e)=>{
                                setMemberNo(parseInt(e.target.value))
                            }} type="number" className="form-control" id="memberNo"/>
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberName">Member Name</label>
                            <input value={name} onChange={(e)=>{
                                setName(e.target.value)
                            }} type="text" className="form-control" id="memberName"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberDepartment">Member Department</label>
                            <input value={department} onChange={(e)=>{
                                setDepartment(e.target.value)
                            }} type="text" className="form-control" id="memberDepartment"/>
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberAge">Member Age</label>
                            <input value={age} onChange={(e)=>{
                                setAge(parseInt(e.target.value))
                            }} type="text" className="form-control" id="memberAge"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberSalary">Member Salary</label>
                            <input value={salary} onChange={(e)=>{
                                setSalary(parseFloat(e.target.value))
                            }} type="text" className="form-control" id="memberSalary"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="memberNic">Member NIC</label>
                            <input value={nic} onChange={(e)=>{
                                setNic(e.target.value)
                            }} type="text" className="form-control" id="memberNic"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6">
                        <div className="form-group">
                            <label htmlFor="memberEmail">Member Email</label>
                            <input value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }} type="email" className="form-control" id="memberEmail"/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="image">Member Image</label>
                            <input onChange={handleFile} type="file" className='form-control' id='image'/>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-12">
                        <button onClick={saveMember} className='btn btn-success col-12'>Save Member</button>
                    </div>
                </div>
                <hr/><br/><br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th style={tableHeadStyle}>No</th>
                                <th style={tableHeadStyle}>Name</th>
                                <th style={tableHeadStyle}>Department</th>
                                <th style={tableHeadStyle}>Salary</th>
                                <th style={tableHeadStyle}>Nic</th>
                                <th style={tableHeadStyle}>Delete</th>
                                <th style={tableHeadStyle}>Update</th>
                                <th style={tableHeadStyle}>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((member) =>
                                <tr key={member._id}>
                                    <td style={tableBodyStyle}>{member.memberNo}</td>
                                    <td style={tableBodyStyle}>{member.name}</td>
                                    <td style={tableBodyStyle}>{member.department}</td>
                                    <td style={tableBodyStyle}>{member.salary}</td>
                                    <td style={tableBodyStyle}>{member.nic}</td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-danger btn-sm'
                                                onClick={(e)=>{
                                                    if (confirm('are you sure')){
                                                        deleteMember(member._id)
                                                    }
                                                }}
                                        >Delete</button>
                                    </td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-primary btn-sm'
                                                onClick={()=>{
                                                    loadUpdateModal(member._id);
                                                }}
                                        >Update</button>
                                    </td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-info btn-sm'
                                                onClick={()=>{
                                                    loadViewModal(member._id);
                                                }}
                                        >View</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal style={modalStyle} show={updateModalState}>

                <div className='p-4'>
                    <h2>Update Member</h2>
                    <hr/>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="number" disabled defaultValue={updateMemberNo}
                                   onChange={(e)=>setUpdateMemberNo(parseInt(e.target.value))}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" defaultValue={updateName}
                                   onChange={(e)=>setUpdateName(e.target.value)}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateDepartment(e.target.value)}
                                type="text" defaultValue={updateDepartment} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateSalary(parseFloat(e.target.value))}
                                type="number" defaultValue={updateSalary} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="number" defaultValue={updateAge}
                                   onChange={(e)=>setUpdateAge(parseInt(e.target.value))}
                                   className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateNic(e.target.value)}
                                type="text" defaultValue={updateNic} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e)=>setUpdateEmail(e.target.value)}
                                type="email" defaultValue={updateEmail} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-outline-primary btn col-12'
                                onClick={()=>updateMember()}
                        >Update Member</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-outline-secondary btn col-12' onClick={()=>setUpdateModalState(false)}>Close</button>
                    </div>

                </div>

            </Modal>

            <Modal style={modalStyle} show={viewModalState}>

                <div className='p-4'>
                    <img src={updateImage} className="card-img-top" alt=""/>
                    <br/><br/>
                    <h2 style={nameStyle} className="card-title">{updateName}</h2>
                    <hr/>
                    <br/>
                    <div  className="col-12">
                        <div style={viewStyle} className="form-group">
                            <h6>Department : </h6>
                            <br/>
                            <p>{updateDepartment}</p>
                        </div>
                    </div>
                    <div  className="col-12">
                        <div style={viewStyle} className="form-group">
                            <h6>Salary : </h6>
                            <br/>
                            <p>{updateSalary}</p>
                        </div>
                    </div>
                    <div  className="col-12">
                        <div style={viewStyle} className="form-group">
                            <h6>Age : </h6>
                            <p>{updateAge}</p>
                        </div>
                    </div>
                    <div  className="col-12">
                        <div style={viewStyle} className="form-group">
                            <h6>Nic : </h6>
                            <br/>
                            <p>{updateNic}</p>
                        </div>
                    </div>
                    <div  className="col-12">
                        <div style={viewStyle2} className="form-group">
                            <h5 style={emailStyle}>{updateEmail}</h5>
                        </div>
                    </div>

                    <div className="col-12">
                        <br/>
                        <button type='button' className='btn-outline-secondary btn col-12' onClick={()=>setViewModalState(false)}>Close</button>
                    </div>

                </div>

            </Modal>


        </>
    )
}

export default Member;