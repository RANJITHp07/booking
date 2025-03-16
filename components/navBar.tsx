'use client'
import Image from 'next/image'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter()
    return (
        <nav className='flex justify-between items-center p-2'>
            <Image src={'/Logo.jpg'} height={200} width={200} alt='logo' onClick={() => router.push('/profile')} />
            <div className='flex gap-[4rem] mx-12 text-xl'>
                <p className='cursor-pointer' onClick={() => router.push('/profile')}>Home</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <p className='cursor-pointer'>Attendance</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={{ fontFamily: "var(--font-poppins)" }} className="w-56">
                        <DropdownMenuRadioGroup value={'bottom'} onValueChange={() => { }}>
                            <DropdownMenuRadioItem value="top">ATTENDANCE</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom" onClick={() => router.push('/table')}>VIEW MY TIMETABLE</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="right">ABSENCE DETAIL</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p className='cursor-pointer' onClick={() => router.push('/profile')}>Downloads</p>
                <p className='cursor-pointer' onClick={() => router.push('/profile')}>Apply Online</p>
                <p className='cursor-pointer' onClick={() => router.push('/profile')}>Student Support</p>
                <p className='cursor-pointer' onClick={() => {
                    localStorage.removeItem("userInfo");
                    router.push('/login')
                }}>Logout</p>
            </div>
        </nav>
    )
}

export default Navbar
