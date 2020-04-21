import React, {useState, useEffect} from 'react'
import TaskItem from './TaskItem';
import './ToDo.css';

export default function Header() {
    let [projects, setProjects] = useState([]);
    let [selectedItem, setSelectedItem] = useState('');
    let [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch('http://www.mocky.io/v2/5e90316a330000741327d563')
            .then(res=>res.json())
            .then(data=>{
                setProjects(()=>data.projects)
            })
    }, [])

    useEffect(()=>{
        const selected = document.querySelector(".selected");
        const optionsContainer = document.querySelector(".options-container");

        const optionsList = document.querySelectorAll(".option");

        selected.addEventListener("click", () => {
          optionsContainer.classList.toggle("active");
        });

        optionsList.forEach(o => {
          o.addEventListener("click", () => {
            let k = o.querySelector('label');
            selected.innerHTML = k.innerHTML;
            optionsContainer.classList.remove("active");
            setSelectedItem(k.innerText)
          });
        });
    }, [])

    useEffect(()=>{
        let taskList=[]
        let tasks=[]
        for (let obj in projects){
            if(projects[obj].name===selectedItem){
                tasks = projects[obj].tasks
                break
            }
        }    
        tasks.forEach(item=>{
            taskList.push(item.taskName)})
        setTasks(()=>taskList)
    },[selectedItem])

    return (
        <div className="container">
      <div className="select-box">
        <div className="selected">
          Select Projects
        </div>
        <div className="options-container">
          <div className="option">
            <input type="radio" className="radio" id="home"/>
            <label htmlFor="home">Home</label>
          </div>
          <div className="option">
            <input type="radio" className="radio" id="work"/>
            <label htmlFor="work">Work</label>
          </div>
        </div>
      </div>
      {tasks.map((item, index)=><TaskItem key={index} task={item} index={String(index)} />)}
    </div>
    )
}
