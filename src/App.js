//main
import {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [title,setTitle] = useState("");
  const [des,setDes] = useState("");
  const [hide,setHide] =useState(false);
  const [data,setData] =useState([]);


  const getData = (e) =>{
    axios.get('http://127.0.0.1:3001/getAllUsers')
    .then (res =>{
      setData(res.data);
      console(res.data);
    })
  }

  useEffect(()=>{
    getData()
},[])

const submitUser=(e)=>{
  // e.preventDefault();

  let details={
    "title":title,
    "des":des
  }
  // console.log(details);
  axios.post("http://127.0.0.1:3001/createUser",details)
  .then(res=>{
    console.log(res);
  })
   getData();
}

const deleteUser =(id)=>{
  axios.delete(`http://127.0.0.1:3001/deleteUser`,{data: {"id":id}})
  .then(res=> getData())
}

const truncate = (e) =>{
  axios.delete('http://127.0.0.1:3001/clearAll')
  .then(res=> getData())
}

  const date=new Date();
  const h=date.getHours();
  var msg ="";

  if(h>0&&h<12)
  {
     msg="Hey! Good Morning";
  }
  else if(h>=12&&h<17)
  {
     msg="Hey! Good AfterNoon..";
  }

  else{
     msg="Hey! Good Evening..";
  }

  return (
    <div className="App">
      <div className="header">
        <h2 className="geet">
          {msg}
        </h2>
      </div>

      {
        hide?
        (
          <div className='body'>
        <center>
        <form action="">
            <table>
              <tr>
                <th colSpan={2}>
                  <h1>TODO LIST</h1>
                </th>
              </tr>
              <tr>
                <td><label htmlFor="Title">Title: </label></td>
                <td> <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} /></td>
              </tr>

              <tr>
                <td><label htmlFor="des">Description: </label></td>
                <td> <input type="text" value={des} onChange={(e)=>setDes(e.target.value)}/></td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <button className='btn' 
                  onClick={(e)=>{submitUser(e)}}
                  >Submit</button>
                </th>
              </tr>
            </table>
          </form>
        </center>
      </div>
        )
        :
        (
          <div className='list_content'>
            <center>

            
              <table className='task_list'>
                <tr>
                  <th className='td' colSpan={4}>Task List</th>
                </tr>
                <tr>
                  <td className='td'>S.No</td>
                  <td className='td'>Title</td>
                  <td className='td'>Description</td>
                  <td className='td'>Operation</td>
                </tr>
                
                  {
                    data.map((row)=>{ return(
                      <tr className='td'><td className='td'>{row.id}</td><td td className='td'>{row.title}</td><td className='td'>{row.des}</td><td className='td'><button onClick={()=>{deleteUser(row.id)}}>Delete</button></td></tr>
                    )})
                  }

                  <tr >
                    <td className='list_options'colSpan={2}>  <button onClick={()=>{setHide(!hide)}}>add</button></td>
                    <td className='list_options'colSpan={2}> <button onClick={()=>{truncate()}}>Clear All</button></td>
                  </tr>
                
              </table>

              </center>
                  
              </div>
              
        )
      }

      


    </div>
  );
}

export default App;
