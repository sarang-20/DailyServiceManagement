import React from 'react'

function Checkmail  ()  {
    const handle=()=>{
        window.location.href="/login"
    }
  return (
    <div>
        <h1> Check mail and update the password and click below to login</h1><br/><br/>
        <button
          type="submit" value="submit" onClick={handle}
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Login
        </button>
    </div>
  )
}
export default Checkmail