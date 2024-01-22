import DefaultCard from "./cards/DefaultCard";
import DefaultLineChart from "./cards/DefaultLineChart";
import {useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {storage} from '../config/firebase.ts';
import DefaulPieChart from "./cards/DefaulPieChart";

const Home:React.FC=()=> {

    const [memberCount,setMemberCount]=useState<number>()
    const [depositCount,setDepositCount]=useState<number>()
    const [transactionCount,setTransactionCount]=useState<number>()
    const [userCount,setUserCount]=useState<number>()

    const [sharesAmount,setSharesAmount]=useState<number>()
    const [comDepositsAmount,setComDepositsAmount]=useState<number>()
    const [specDepositsAmount,setSpecDepositsAmount]=useState<number>()
    const [penDepositsAmount,setPenDepositsAmount]=useState<number>()

    const [depositsAmount,setDepositsAmount]=useState<number>()
    const [withdrawAmount,setWithdrawAmount]=useState<number>()

    useEffect(()=>{
        findDepositAmounts();
        findAllCounts();
        findWithdrawAmounts();
    }, [])


    const findAllCounts = async ()=>{
        const memberCount = await AxiosInstance.get('/members/find-count');
        setMemberCount(memberCount.data);

        const depositCount = await AxiosInstance.get('/deposits/find-count');
        setDepositCount(depositCount.data);

        const transactionCount = await AxiosInstance.get('/transactions/find-count');
        setTransactionCount(transactionCount.data);

        const userCount = await AxiosInstance.get('/users/find-count');
        setUserCount(userCount.data);
    }

    const findDepositAmounts = async ()=>{
        const sharesAmount = await AxiosInstance.get('/deposits/find-shares');
        setSharesAmount(sharesAmount.data.totalSum);

        const comDepositsAmount = await AxiosInstance.get('/deposits/find-comDeposits');
        setComDepositsAmount(comDepositsAmount.data.totalSum);

        const specDepositsAmount = await AxiosInstance.get('/deposits/find-specDeposits');
        setSpecDepositsAmount(specDepositsAmount.data.totalSum);

        const penDepositsAmount = await AxiosInstance.get('/deposits/find-penDeposits');
        setPenDepositsAmount(penDepositsAmount.data.totalSum);

        setDepositsAmount(sharesAmount+comDepositsAmount+specDepositsAmount+penDepositsAmount)
    }

    const findWithdrawAmounts = async ()=>{
        const withdrawAmount = await AxiosInstance.get('/transactions/find-amount');
        setWithdrawAmount(withdrawAmount.data.totalSum);
    }

    return (
        <>
            <br/><br/>
            <br/><br/>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/male-real-estate-agent-doing-business-showing-house-potential-buying-couple_23-2150164710.jpg?size=626&ext=jpg&ga=GA1.2.1120726907.1693514325&semt=sph'
                            description=''
                            title='Members'
                            value={memberCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/person-carrying-lot-cash_53876-65367.jpg?size=626&ext=jpg&ga=GA1.2.1120726907.1693514325&semt=sph'
                            description=''
                            title='Deposits'
                            value={depositCount}
                            key={4}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409471.jpg?size=626&ext=jpg&ga=GA1.2.1120726907.1693514325&semt=ais'
                            description=''
                            title='Transactions'
                            value={transactionCount}
                            key={3}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/person-carrying-lot-cash_53876-65367.jpg?size=626&ext=jpg&ga=GA1.2.1120726907.1693514325&semt=sph'
                            description=''
                            title='Users'
                            value={userCount}
                            key={4}
                        />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <div className="context">
                            <DefaultLineChart shares={sharesAmount} comDeposits={comDepositsAmount} specDeposits={specDepositsAmount} penDeposits={penDepositsAmount}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="context">
                            <DefaulPieChart withdraw={withdrawAmount} deposit={depositsAmount}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;