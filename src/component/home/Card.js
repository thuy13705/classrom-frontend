import React from 'react';
import './index.css';

function Card({items}) {

    return (
        <div className="card-wrapper">
            <div className="card-inner">
                <div style={{borderBottom:"1px solid #282c34"}} className="card-name">
                    <h5 style={{fontWeight:"500"}}>{items.nameClass}</h5>
                </div>
                <div className="card-teacher">
                <h5 style={{fontWeight:"400"}}>Teacher</h5>
                <ul>
                {items.teachers && items.teachers.map((item, index) => (
                            <li key={index}>
                                <p>{item.name}</p>
                            </li>
                        ))}
                </ul>
  
                </div>

            </div>
        </div>

    )
}

export default Card
