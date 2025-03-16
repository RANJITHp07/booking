import Image from 'next/image'
import React from 'react'

function Profile({ user }: any) {
    return (
        <div className='p-10'>
            <div className='flex gap-10'>
                <Image src={'/profile.jpg'} width={200} height={200} alt='profile-img' className='border border-slate-300 ' />
                <div className='text-xl flex flex-col gap-3 text-gray-800'>
                    {
                        Object.keys(user).map((item) => {
                            return <p key={item}><span className='font-semibold'>{item} : </span>{user[item]}</p>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
