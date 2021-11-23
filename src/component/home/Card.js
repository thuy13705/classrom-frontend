import React,{useEffect} from 'react';
import './index.css';

function Card({items}) {

    return (
        <div className="card-wrapper">
            <div className="card-inner">
                <div className="card-name">
                    <h5>{items.nameClass}</h5>
                </div>
                <div className="card-teacher">
                <ul>
                {items.teachers && items.teachers.map((item, index) => (
                            <li key={index}>
                                <p>{item.username}</p>
                            </li>
                        ))}
                </ul>
  
                </div>

            </div>
        </div>

    )
}

export default Card
