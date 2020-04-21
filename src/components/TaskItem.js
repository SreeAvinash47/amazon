import React from 'react'
import './TaskItem.css';

export default function TaskItem({index, task}) {
    const onCheck = e =>{
        let items = document.querySelectorAll(`.task-item`)
        items.forEach(item=>{
            if(item.getAttribute('name')===index){
                item.classList.toggle('strike')
            }
        })
    }
    return (
        <div className='task-container'>
           <input type="checkbox" onChange={onCheck} name={index} className='input-container' />
           <div className='task-item' name={index}>{task}</div> 
        </div>
    )
}
