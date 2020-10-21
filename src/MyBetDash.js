import React, {useEffect, useState} from 'react'



const MyBetDash = (props) => {

    const [currentbet, setBet] = useState({})
    const [betStatus, setStatus] = useState(false)

    
    useEffect(() => {

        fetch(`http://localhost:3000/api/v1/bets/${props.bet[0].id}`,{
            method:'GET',
            headers: {  
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(bet => {
            console.log(bet)
            setBet(bet)
            })
    }, [])


    return(<div>

    <h1>My Bet Dash</h1>
        {/* <div>
        <h2>{currentbet.win_or_lose}</h2>
        <p>{`Bet Amount ${currentbet.amount}`}</p>
        <p>{`Reserve Amount ${currentbet.reserve}`}</p>
        </div> */}

<div className='bet-card'>
                    <p className='bet-status'>{currentbet.win_or_lose}</p>
                {/* <div className='bet-image-div'>
                    <img className='card-image' src={props.currentUser.image} height="190px" width="190px"></img>      
                </div>    */}

                <div className='bet-info-div'>
                    <p>{`Days Remaining: ${currentbet.days_left}`}</p>
                    <p>{`Bet Amount: $${currentbet.amount}`}</p>
                </div>
            </div>
    
    </div>)
}

export default MyBetDash

