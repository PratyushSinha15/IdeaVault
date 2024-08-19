import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import { SigninInput, SignupInput } from '@pratyushxdev/medium-common'
import axios from 'axios'
import { BACKEND_URL } from '../Config'



const Auth = ({type} : {type: "signup" | "signin"}) => {
    const navigate= useNavigate();
    const [postInputs,setpostInputs]= useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/blogs")
        }
    }, [])

    async function sendRequest(){
        try {
            if(type==="signup"){
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
                const jwt = response.data.jwt;
                localStorage.setItem("token", jwt);
                navigate("/blogs")
                console.log(response.data)
            }else{

                //if the user has jwt token then he is already signed in
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
                const jwt = response.data.jwt;
                localStorage.setItem("token", jwt);
                navigate("/blogs")
                console.log(response.data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div>

                <div className='px-10' >
                    <div className='text-3xl font-bold text-center'>
                        {type==="signup"? "Create an account": "Sign In"}
                    </div>
                    <div className='text-gray-600 text-center'>{type==="signup"? "Already have an account?": "Don't have an account?"} 
                        <Link className='ml-1 font-semibold underline' to={type==="signin"?"/signup":"/signin"}>
                            {type==="signin"? "Sign up": "Sign in"}
                        </Link>
                    </div>
                </div>
                <div>
                    {type==="signup"? < Input  label='Name'type='Name' placeholder='' onChange={(e)=>{
                        setpostInputs({...postInputs, name: e.target.value})
                    }}/>:null}
                    < Input  label='Username'  placeholder='' onChange={(e)=>{
                        setpostInputs({...postInputs, username: e.target.value})
                    }}/>
                    < Input  label='Password' type={"password"} placeholder=''  onChange={(e)=>{
                        setpostInputs({...postInputs, password: e.target.value})
                    }}/>
                    <div className='flex justify-center'>
                        <button onClick={sendRequest} type="button" className=" w-72 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"? "Sign Up": "Sign In"}</button>
                    </div>

                </div>
            </div>
        </div>
           
    </div>
  )
}

export default Auth