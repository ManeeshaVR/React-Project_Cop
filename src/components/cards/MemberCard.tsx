import AxiosInstance from "../../config/axiosInstance";

interface MemberProps {
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

function MemberCard(props: MemberProps) {

    const style: React.CSSProperties = {
        width: '18rem'
    }

    const nameStyle: React.CSSProperties = {
        color: '#560bad'
    }

    const listStyle: React.CSSProperties = {
        color: '#3c096c'
    }

    const emailStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: '#b388eb'
    }

    const bodyStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right'
    }

    const sendEmail = async (memberNo: number) => {
        const deposit = await AxiosInstance.get('/deposits/find-by-memberNo/' + memberNo);
        if (deposit){
            const response = await AxiosInstance.post('/members/mail',{
                memberNo: props.memberNo, name: props.name, email: props.email, shares: deposit.data.shares, comDeposits: deposit.data.comDeposits, specDeposits: deposit.data.specDeposits, penDeposits: deposit.data.penDeposits
            });
            if (response){
                alert('Email Sent')
            }
        }else {
            alert('No deposit found to this Member')
        }
    }

    return (
        <div className="card" style={style} key={props._id}>
            <img src={props.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h4 style={nameStyle} className="card-title">{props.name}</h4>
                <hr/>
            </div>
            <ul className="list-group list-group-flush">
                <li style={listStyle} className="list-group-item">Department : {props.department}</li>
                <li style={listStyle} className="list-group-item">Salary : {props.salary}</li>
                <li style={listStyle} className="list-group-item">Age : {props.age}</li>
                <li style={listStyle} className="list-group-item">Nic : {props.nic}</li>
            </ul>
            <div style={bodyStyle} className="card-body">
                <a style={emailStyle} href="#" className="card-link">{props.email}</a>
                <br/>
                <button  type="button" className="btn btn-outline-secondary"
                        onClick={(e)=>{
                            if (confirm('are you sure')){
                                sendEmail(props.memberNo)
                            }
                        }}
                >Mail</button>
            </div>
        </div>


    )
}

export default MemberCard;