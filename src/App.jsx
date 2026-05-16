import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Components/Card";
const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1)

  const getData = async () => {

    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=15`);
    setUserData(response.data);    
  };

  let printUser = <h1 className="text-gray-500 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">Loading.......</h1>;

  if (userData.length > 0) {
    printUser = userData.map((elem, idx) => {
      return (
        <div key={idx}>
          <Card elem={elem}/>
        </div>
      );
    });
  }

  useEffect(()=>{
    getData();
  },[index])

  return (
    <div className="h-screen w-full overflow-auto bg-slate-900 p-4 text-white">
      <h1 className="text-5xl font-bold text-center underline ">Gallery Project</h1>
      <div className="flex flex-wrap gap-4 mt-5">{printUser}</div>
      <div className="flex justify-center items-center p-5 gap-4">

        <button
        style={{opacity: index == 1 ? 0.5:1 }} 
        className="text-2xl active:scale-95 bg-amber-300 font-semibold rounded px-5 py-2 text-black "
        onClick={()=>{
          if(index>1){
            setIndex(index-1)
            setUserData([])
          }
        }}
        >
          Prev
        </button>
        <h1 className="font-semibold text-xl">Page {index}</h1>
        <button 
        className="text-2xl active:scale-95 bg-amber-300 font-semibold rounded px-5 py-2 text-black"
        onClick={()=>{
          setUserData([])
          setIndex(index+1)
        }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
