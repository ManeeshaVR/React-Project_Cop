interface DefaultCardData {
    thumbnail:string,
    title:string,
    description:string,
    value:number
}

function DefaultCard(props:DefaultCardData) {

    const maxWidthStyle:React.CSSProperties={
        maxWidth:'540px'
    }

    const overflowStyle:React.CSSProperties={
        overflow:"hidden"
    }

    const topicStyle:React.CSSProperties={
        color: '#5e548e'
    }

    const valueStyle:React.CSSProperties={
        textAlign:"right",
        fontSize: '30px',
        color: '#9f86c0'
    }

    return(
        <div className="card mb-3" style={maxWidthStyle}>
            <div className="row g-3">
                <div className="col-md-4" style={overflowStyle}>
                    <img src={props.thumbnail} className="img-fluid rounded-start" alt={props.title}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <br/>
                        <h5 style={topicStyle} className="card-title">{props.title}</h5>
                        <p style={valueStyle} className="card-text"><small className="text-body-secondary">{props.value}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultCard