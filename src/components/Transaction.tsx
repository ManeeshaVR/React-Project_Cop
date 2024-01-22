import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "../config/axiosInstance";

interface Transaction {
    _id: string,
    memberNo: number,
    name: string,
    amount: number,
    date: Date
}

const Transaction: React.FC = () => {

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

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        findAllTransactions();
    }, [])

    const findAllTransactions = async () => {
        const responese = await AxiosInstance.get('/transactions/find-all');
        setTransactions(responese.data);
    }

    return(
        <>
            <br/><br/><br/><br/><br/>
            <div style={titleStyle} className="topic">
                <FontAwesomeIcon icon={faMoneyBillTransfer} bounce size="2xl" style={{color: "#7256c8", marginRight: "20px", marginTop: "10px"}} />
                <h1 style={topicStyle}>Transactions</h1>
            </div>
            <hr/>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th style={tableHeadStyle}>MemberNo</th>
                                <th style={tableHeadStyle}>Name</th>
                                <th style={tableHeadStyle}>Withdraw Amount</th>
                                <th style={tableHeadStyle}>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map((transaction) =>
                                <tr key={transaction._id}>
                                    <td style={tableBodyStyle}>{transaction.memberNo}</td>
                                    <td style={tableBodyStyle}>{transaction.name}</td>
                                    <td style={tableBodyStyle}>{transaction.amount}</td>
                                    <td style={tableBodyStyle}>{transaction.date}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Transaction;