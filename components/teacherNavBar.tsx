import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'


function TeacherNavbar() {
    const router = useRouter()
    return (
        <nav className='flex justify-between items-center p-2'>
            <Image src={'/Logo.jpg'} height={200} width={200} alt='logo' onClick={() => router.push('/teacher-profile')} />
            <div className='flex gap-[4rem] mx-12 text-xl'>
                <p className='cursor-pointer' onClick={() => router.push('/teacher-profile')} >Home</p>
                <p className='cursor-pointer' onClick={() => router.push('/booking')}>Classroom Scheduler</p>
                <p className='cursor-pointer' onClick={() => {
                    localStorage.removeItem("userInfo");
                    router.push('/login')
                }}>Logout</p>
            </div>
        </nav>
    )
}

export default TeacherNavbar
