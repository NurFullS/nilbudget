'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [inputUsername, setInputUsername] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [showMessage, setShowMessage] = useState('')
    const [showMessageError, setShowMessageError] = useState('')
    const router = useRouter()
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    const handleRegister = async () => {
        setShowMessage('')
        setShowMessageError('')

        if (!inputUsername.trim() || !inputEmail.trim() || !inputPassword.trim()) {
            setShowMessageError('All fields must be filled in!')
            return
        }
        if (!validateEmail(inputEmail)) {
            setShowMessageError('Please enter a valid email!')
            return
        }
        if (inputPassword.length < 6) {
            setShowMessageError('The password must be at least 6 characters!')
            return
        }

        try {
            const res = await axios.post(
                `${BASE_URL}/auth/register`,
                {
                    username: inputUsername,
                    email: inputEmail,
                    password: inputPassword
                }
            )
            setShowMessage(res.data.message || 'Registration successful!')
            setTimeout(() => router.push('/auth/login'), 1000)
        } catch (error: any) {
            if (error.response) {
                setShowMessageError(error.response.data.message || 'Server error!')
            } else {
                setShowMessageError('Network error!')
            }
        }
    }

    return (
        <div className='flex justify-around items-start mt-10'>
            <div className='mt-3'>
                <img
                    className='w-[500px] h-[600px]'
                    src="https://media.licdn.com/dms/image/v2/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=L4d5P81GijVgU4u1yJtFLVsIqATkfWTrymEPSd_C6_o"
                    alt="registration" 
                />
            </div>
            <div className='grid mt-20 mr-50 gap-10'>
                <h1 className='text-center text-3xl font-extrabold'>Register</h1>
                <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder='Username...'
                    className='border border-gray-500 outline-none p-4 w-[350px] h-[60px] rounded-2xl'
                />
                <input
                    type="text"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder='Email...'
                    className='border border-gray-500 outline-none p-4 w-[350px] h-[60px] rounded-2xl'
                />
                <input
                    type="password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder='Password...'
                    className='border border-gray-500 outline-none p-4 w-[350px] h-[60px] rounded-2xl'
                />
                <button
                    onClick={handleRegister}
                    className='bg-blue-800 rounded-2xl h-16 text-2xl text-white font-mono cursor-pointer'
                >
                    Register
                </button>

                {showMessageError && <p className='text-red-700 text-center text-[18px]'>{showMessageError}</p>}

                {showMessage && <p className='text-green-700 text-center text-[18px]'>{showMessage}</p>}

                <div className='justify-center items-center text-center'>
                    <p>Already have an account?<a href="/auth/login" className='ml-2 text-blue-700'>LogIn.</a></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
