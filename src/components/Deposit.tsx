import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheckDollar} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {storage} from '../config/firebase.ts';
import {Modal} from "react-bootstrap";
import Member from "./Member";

interface Deposit {
    _id: string,
    memberNo: number,
    name: string,
    shares: number,
    comDeposits: number,
    specDeposits: number,
    penDeposits: number,
    monthlyShares: number,
    monthlyComDeposits: number,
    monthlySpecDeposits: number,
    monthlyPenDeposits: number
}

const Deposit: React.FC = () => {

    const styleObj: React.CSSProperties = {
        marginBottom: '20px'
    }

    const topicStyle: React.CSSProperties = {
        color: '#5e548e',
        justifyContent: 'center'
    }

    const titleStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center'
    }

    const modalStyle: React.CSSProperties = {
        zIndex: "9999",
    }

    const tableHeadStyle: React.CSSProperties = {
        color: '#7400b8',
        textAlign: 'center'
    }

    const tableBodyStyle: React.CSSProperties = {
        color: '#870781',
        textAlign: 'center'
    }

    const [members, setMembers] = useState<Member[]>([])
    const [deposits, setDeposits] = useState<Deposit[]>([])

    const [updateModalState, setUpdateModalState] = useState<boolean>(false);
    const [withdrawModalState, setWithdrawModalState] = useState<boolean>(false);

    const [memberNo, setMemberNo] = useState<number | ''>('');
    const [name, setName] = useState('');
    const [salary, setSalary] = useState<number | ''>('');
    const [shares, setShares] = useState<number | ''>('');
    const [comDeposits, setComDeposits] = useState<number | ''>('');
    const [specDeposits, setSpecDeposits] = useState<number | ''>('');
    const [penDeposits, setPenDeposits] = useState<number | ''>('');
    const [monthlyShares, setMonthlyShares] = useState<number | ''>('');
    const [monthlyComDeposits, setMonthlyComDeposits] = useState<number | ''>('');
    const [monthlySpecDeposits, setMonthlySpecDeposits] = useState<number | ''>('');
    const [monthlyPenDeposits, setMonthlyPenDeposits] = useState<number | ''>('');

    const [withdraw, setWithdraw] = useState<number | ''>('');

    const [selectedDepositId, setSelectedDepositId] = useState('');
    const [updateMemberNo, setUpdateMemberNo] = useState<number | ''>('');
    const [updateName, setUpdateName] = useState('');
    const [updateShares, setUpdateShares] = useState<number | ''>('');
    const [updateComDeposits, setUpdateComDeposits] = useState<number | ''>('');
    const [updateSpecDeposits, setUpdateSpecDeposits] = useState<number | ''>('');
    const [updatePenDeposits, setUpdatePenDeposits] = useState<number | ''>('');
    const [updateMonthlyShares, setUpdateMonthlyShares] = useState<number | ''>('');
    const [updateMonthlyComDeposits, setUpdateMonthlyComDeposits] = useState<number | ''>('');
    const [updateMonthlySpecDeposits, setUpdateMonthlySpecDeposits] = useState<number | ''>('');
    const [updateMonthlyPenDeposits, setUpdateMonthlyPenDeposits] = useState<number | ''>('');

    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    useEffect(() => {
        findAllMembers();
        findAllDeposits();
    }, [])

    const loadWithdrawModal = async (id: string) => {
        const deposit = await AxiosInstance.get('/deposits/find-by-id/' + id);
        console.log(deposit.data)
        setSelectedDepositId(deposit.data._id)
        setUpdateMemberNo(deposit.data.memberNo)
        setUpdateName(deposit.data.name)
        setUpdateSpecDeposits(parseFloat(deposit.data.specDeposits))


        setWithdrawModalState(true);
    }

    const loadUpdateModal = async (id: string) => {
        const deposit = await AxiosInstance.get('/deposits/find-by-id/' + id);
        console.log(deposit.data)
        setSelectedDepositId(deposit.data._id)
        setUpdateMemberNo(deposit.data.memberNo)
        setUpdateName(deposit.data.name)
        setUpdateShares(parseFloat(deposit.data.shares))
        setUpdateComDeposits(parseFloat(deposit.data.comDeposits))
        setUpdateSpecDeposits(parseFloat(deposit.data.specDeposits))
        setUpdatePenDeposits(parseFloat(deposit.data.penDeposits))
        setUpdateMonthlyShares(parseFloat(deposit.data.monthlyShares))
        setUpdateMonthlyComDeposits(parseFloat(deposit.data.monthlyComDeposits))
        setUpdateMonthlySpecDeposits(parseFloat(deposit.data.monthlySpecDeposits))
        setUpdateMonthlyPenDeposits(parseFloat(deposit.data.monthlyPenDeposits))

        setUpdateModalState(true);
    }

    const findAllDeposits = async () => {
        const responese = await AxiosInstance.get('/deposits/find-all');
        setDeposits(responese.data);
    }

    const findAllMembers = async () => {
        const responese = await AxiosInstance.get('/members/find-all');
        setMembers(responese.data);
    }

    const withdrawMoney = async () => {
        try {
            const responese = await AxiosInstance.post('/transactions/create',{
                memberNo: updateMemberNo, name: updateName, amount: withdraw, date:new Date()
            });

            await AxiosInstance.put('/deposits/update-specDeposit/' + selectedDepositId, {
                specDeposits: (updateSpecDeposits-withdraw)
            });

            setWithdrawModalState(false);

            findAllDeposits();
        }catch (e){
            console.log(e)
        }

    }

    const getMemberById = async (id: string) => {
        const member = await AxiosInstance.get('/members/find-by-id/' + id);
        setSelectedMember(member.data);
        setName(member.data.name);
        setMemberNo(member.data.memberNo)
        setSalary(parseFloat(member.data.salary))
    }

    const saveDeposit = async () => {
        try {
            const responese = await AxiosInstance.post('/deposits/create', {
                memberNo,
                name,
                shares,
                comDeposits,
                specDeposits,
                penDeposits,
                monthlyShares,
                monthlyComDeposits,
                monthlySpecDeposits,
                monthlyPenDeposits
            });

            console.log(responese);
            findAllDeposits();
            setMemberNo('');
            setName('');
            setShares('');
            setComDeposits('');
            setSpecDeposits('');
            setPenDeposits('');
            setMonthlyShares('');
            setMonthlyComDeposits('');
            setMonthlySpecDeposits('');
            setMonthlyPenDeposits('');
        } catch (e) {
            console.log(e)
        }
    }

    const updateMonthlyDeposits = async () => {
        try {
            for (const deposit of deposits) {
                await AxiosInstance.put('/deposits/update-deposits/' + deposit._id, {
                    shares: (deposit.shares+deposit.monthlyShares),
                    comDeposits: (deposit.comDeposits+deposit.monthlyComDeposits),
                    specDeposits: (deposit.specDeposits+deposit.monthlySpecDeposits),
                    penDeposits: (deposit.penDeposits+deposit.monthlyPenDeposits),
                });
            }
            findAllDeposits();
        } catch (error) {
            console.error(error);
        }

    }

    const updateDeposit = async () => {
        try {

            await AxiosInstance.put('/deposits/update/' + selectedDepositId, {
                memberNo: updateMemberNo,
                name: updateName,
                shares: updateShares,
                comDeposits: updateComDeposits,
                specDeposits: updateSpecDeposits,
                penDeposits: updatePenDeposits,
                monthlyShares: updateMonthlyShares,
                monthlyComDeposits: updateMonthlyComDeposits,
                monthlySpecDeposits: updateMonthlySpecDeposits,
                monthlyPenDeposits: updateMonthlyPenDeposits
            });
            setUpdateModalState(false);
            findAllDeposits();

        } catch (e) {
            console.log(e)
        }
    }

    const deleteDeposit = async (id) => {
        await AxiosInstance.delete('/deposits/delete-by-id/' + id);
        findAllDeposits();
    }

    return (
        <>
            <br/><br/><br/><br/><br/>
            <div style={titleStyle} className="topic">
                <FontAwesomeIcon icon={faMoneyCheckDollar} bounce size="2xl"
                                 style={{color: "#7256c8", marginRight: "20px", marginTop: "10px"}}/>
                <h1 style={topicStyle}>Deposits</h1>
            </div>
            <hr/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="member">Select Member</label>
                            <select id="member" className='form-control' onChange={(e) => {
                                getMemberById(e.target.value);
                            }}>
                                <option value="">Select Value</option>
                                {members.map((member, index) => (
                                    <option key={index} value={member._id}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="name">Member No</label>
                            <input value={memberNo} disabled type="text" className='form-control' id='name'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="salary">Member Salary</label>
                            <input value={salary} disabled type="number" className='form-control' id='salary'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="shares">Shares</label>
                            <input value={shares} onChange={(e) => {
                                setShares(parseInt(e.target.value))
                            }} type="number" className='form-control' id='shares'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="comDep">Compulsory Deposits</label>
                            <input value={comDeposits} onChange={(e) => {
                                setComDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='comDep'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="specDep">Special Deposits</label>
                            <input value={specDeposits} onChange={(e) => {
                                setSpecDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='specDep'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="penDep">Pension Deposits</label>
                            <input value={penDeposits} onChange={(e) => {
                                setPenDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='penDep'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="monthShares">Monthly Shares</label>
                            <input value={monthlyShares} onChange={(e) => {
                                setMonthlyShares(parseInt(e.target.value))
                            }} type="number" className='form-control' id='monthShares'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="monthComDep">Monthly Compulsory Deposits</label>
                            <input value={monthlyComDeposits} onChange={(e) => {
                                setMonthlyComDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='monthComDep'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="monthSpecDep">Monthly Special Deposits</label>
                            <input value={monthlySpecDeposits} onChange={(e) => {
                                setMonthlySpecDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='monthSpecDep'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3" style={styleObj}>
                        <div className="form-group">
                            <label htmlFor="monthPenDep">Monthly Pension Deposits</label>
                            <input value={monthlyPenDeposits} onChange={(e) => {
                                setMonthlyPenDeposits(parseInt(e.target.value))
                            }} type="number" className='form-control' id='monthPenDep'/>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-success col-12' onClick={saveDeposit}>Save Deposit</button>
                    </div>
                </div>
                <hr/><br/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-info col-12'
                                onClick={(e)=>{
                                    if (confirm('are you sure')){
                                        updateMonthlyDeposits()
                                    }
                                }}
                        >Update Monthly Deposits</button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th style={tableHeadStyle}>Member No</th>
                                <th style={tableHeadStyle}>Name</th>
                                <th style={tableHeadStyle}>Shares</th>
                                <th style={tableHeadStyle}>Com Deposits</th>
                                <th style={tableHeadStyle}>Spec Deposits</th>
                                <th style={tableHeadStyle}>Pen Deposits</th>
                                <th style={tableHeadStyle}>Delete</th>
                                <th style={tableHeadStyle}>Update</th>
                                <th style={tableHeadStyle}>Withdraw</th>
                            </tr>
                            </thead>
                            <tbody>
                            {deposits.map((deposit) =>
                                <tr key={deposit._id}>
                                    <td style={tableBodyStyle}>{deposit.memberNo}</td>
                                    <td style={tableBodyStyle}>{deposit.name}</td>
                                    <td style={tableBodyStyle}>{deposit.shares}</td>
                                    <td style={tableBodyStyle}>{deposit.comDeposits}</td>
                                    <td style={tableBodyStyle}>{deposit.specDeposits}</td>
                                    <td style={tableBodyStyle}>{deposit.penDeposits}</td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-danger btn-sm'
                                                onClick={(e)=>{
                                                    if (confirm('are you sure')){
                                                        deleteDeposit(deposit._id)
                                                    }
                                                }}
                                        >Delete</button>
                                    </td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-success btn-sm'
                                                onClick={() => {
                                                    loadUpdateModal(deposit._id);
                                                }}
                                        >Update
                                        </button>
                                    </td>
                                    <td style={tableBodyStyle}>
                                        <button className='btn btn-outline-secondary btn-sm'
                                                onClick={() => {
                                                    loadWithdrawModal(deposit._id);
                                                }}
                                        >Withdraw
                                        </button>
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
                    <h2>Update Deposit</h2>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input type="number" disabled defaultValue={updateMemberNo}
                                       onChange={(e) => setUpdateMemberNo(parseInt(e.target.value))}
                                       className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <input type="text" disabled defaultValue={updateName}
                                       onChange={(e) => setUpdateName(e.target.value)}
                                       className='form-control'/>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateShares(parseFloat(e.target.value))}
                                    type="text" defaultValue={updateShares} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateComDeposits(parseFloat(e.target.value))}
                                    type="number" defaultValue={updateComDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateSpecDeposits(parseFloat(e.target.value))}
                                    type="number" defaultValue={updateSpecDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdatePenDeposits(parseFloat(e.target.value))}
                                    type="number" defaultValue={updatePenDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateMonthlyShares(parseFloat(e.target.value))}
                                    type="email" defaultValue={updateMonthlyShares} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateMonthlyComDeposits(parseFloat(e.target.value))}
                                    type="email" defaultValue={updateMonthlyComDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateMonthlySpecDeposits(parseFloat(e.target.value))}
                                    type="email" defaultValue={updateMonthlySpecDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <input
                                    onChange={(e) => setUpdateMonthlyPenDeposits(parseFloat(e.target.value))}
                                    type="email" defaultValue={updateMonthlyPenDeposits} className='form-control'/>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-outline-primary btn col-12'
                                onClick={() => updateDeposit()}
                        >Update Deposit
                        </button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-outline-secondary btn col-12'
                                onClick={() => setUpdateModalState(false)}>Close
                        </button>
                    </div>

                </div>

            </Modal>

            <Modal style={modalStyle} show={withdrawModalState}>

                <div className='p-4'>
                    <h2>Withdraw Money</h2>
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
                                onChange={(e) => setUpdateSpecDeposits(parseFloat(e.target.value))}
                                type="number" defaultValue={updateSpecDeposits} className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input
                                onChange={(e) => setWithdraw(parseFloat(e.target.value))}
                                type="number" value={withdraw} placeholder='Enter Withdraw Amount' className='form-control'/>
                        </div>
                        <br/>
                    </div>
                    <div className="col-12">
                        <button type='button' className='btn-outline-primary btn col-12'
                                onClick={()=>withdrawMoney()}
                        >Withdraw Money</button>
                        <br/>
                        <br/>
                        <button type='button' className='btn-outline-secondary btn col-12' onClick={()=>setWithdrawModalState(false)}>Close</button>
                    </div>

                </div>

            </Modal>

        </>
    )
}

export default Deposit;