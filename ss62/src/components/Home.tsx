import React, { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
interface Work{
    id:number;
    name:string;
    status:boolean;
    completed:boolean;
}
export default function Home() {
    const [getdata,setGetData]=useState<Work[]>([])
    const showWork =()=>{
        axios('http://localhost:8080/work')
        .then((res)=>{
            setGetData(res.data)
        }).catch(err=>console.log(err))
    }
    useEffect (()=>{
        showWork();
    })
    const deleteWork =(id: number)=>{
        if(window.confirm('bạn có muốm xóa công việc')){
            axios.delete(`http://localhost:8080/work/${id}`)
            .then(()=>{
                setGetData(getdata.filter((getdata) => getdata.id !== id))
            })
            .catch((err)=> console.log(err)
            )
        }
    }
  return ( 
    <div className='table'>
        <h2>Quản lí công việc</h2>
        <div className='add'>
            <input type="text" placeholder='Nhập tên công việc' />
            <br />
            <button>Thêm công việc</button>
        </div>
        <br />
        <div className='all'>
           
                <button>Tất cả</button>
                <button>Hoàn Thành</button>
                <button>Đang thực hiện</button>
           
        </div>
        <br />
        {getdata.map((job) => {
            return (
                <div className='checkbox' key={job.id}>
                    <input type="checkbox" className='input'  /> {job.name} 
                    <button><span className="material-symbols-outlined">border_color</span></button> 
                    <button onClick={()=> deleteWork(job.id)}><span className="material-symbols-outlined">delete</span></button>
                </div>
            )
        })}
        
        <br />
        <div className='delete'>
            <div><button>Xóa công việc hoàn thành</button></div>
            <div><button>Xóa tất cả công việc</button></div>
        </div>
    </div>
  )
}
