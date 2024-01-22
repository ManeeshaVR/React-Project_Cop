import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import Member from "./Member";
import AxiosInstance from "../config/axiosInstance";
import MemberCard from "./cards/MemberCard";

const View: React.FC = () => {

    const titleStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center'
    }

    const topicStyle: React.CSSProperties = {
        color: '#5e548e',
        justifyContent: 'center'
    }

    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        findAllMembers();
    }, [])

    const findAllMembers = async () => {
        const responese = await AxiosInstance.get('/members/find-all');
        setMembers(responese.data);
    }

    return (
        <>
            <br/><br/><br/><br/><br/>
            <div style={titleStyle} className="topic">
                <FontAwesomeIcon icon={faAt} bounce size="2xl"
                                 style={{color: "#7256c8", marginRight: "20px", marginTop: "10px"}}/>
                <h1 style={topicStyle}>View</h1>
            </div>
            <hr/>
            <br/><br/>
            <div className="container">
                <div className="row">
                    {members.map((member) =>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={member._id}>
                            <MemberCard _id={member._id} memberNo={member.memberNo} name={member.name}
                                        image={member.image} department={member.department} salary={member.salary}
                                        age={member.age} nic={member.nic} email={member.email} key={member._id}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default View;