import { useState,useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(12);
  const [numAllow,setNumAllow]=useState(false);
  const [charAllow,setCharAllow]=useState(false);
  const [password,setPassword]=useState("");
  const passRef=useRef(null);
  const passGen=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow){
      str+="0123456789";
    }
    if(charAllow){
      str+="!@#$%^&*()-_+=[]{}|;:',.<>?/";
    }
    for (let i = 0; i <length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,charAllow,numAllow]);

  const copyPass = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);
  useEffect(()=>{
    passGen();
  },[length,numAllow,charAllow])
  return (
    <>
        <div className='w-full h-40 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-blue-300'>
        <h1 className='text-black text-center text-4xl my-4'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type='text' value={password} readOnly 
            ref={passRef} placeholder='password' className='outline-none w-full py-1 px-3'/>
            <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' onClick={copyPass}
            >copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
            <input type='range' min={10} max={50} value={length} className='curser-pointer'onChange={(e)=>{
              setLength(e.target.value);
            }}/>
            <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={numAllow}
                        id="numberInput"
                        onChange={() => {
                            setNumAllow((prev) => !prev);
                        }}
                    />
                    <label>Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={charAllow}
                        id="characterInput"
                        onChange={() => {
                            setCharAllow((prev) => !prev )
                        }}
                    />
                    <label>Characters</label>
                </div>
        </div>
        </div>
    
    </>
)
}

export default App
