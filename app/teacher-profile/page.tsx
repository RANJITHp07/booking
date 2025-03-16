'use client'
import { DataTableDemo, teacherColumns } from '@/components/data-table'
import Navbar from '@/components/navBar'
import Profile from '@/components/profile'
import TeacherNavbar from '@/components/teacherNavBar'
import { Button } from '@/components/ui/button'
import { initialTeacherTimeTable } from '@/utils/user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const mapSlotToTime = (slot: number): any => {
    const slotTimes: Record<number, string> = {
        1: "09:00-10:30",
        2: "10:45-12:15",
        3: "13:00-14:30",
        4: "14:45-16:15"
    };
    return slotTimes[slot] || null;
};

export const mergeBookingsIntoTimetable = (timetable: any[], bookings: any[]) => {
    return timetable.map(day => {
        const formattedDate = day.date.split("-").reverse().join("/"); // Convert to "DD/MM/YYYY" format

        const matchingBookings = bookings.filter(b => b.date === formattedDate && b.class === day.class);

        matchingBookings.forEach(booking => {
            const timeSlot = mapSlotToTime(booking.slot);
            console.log()
            if (timeSlot && day[timeSlot]) {
                day[timeSlot].bookedBy = booking.teacher;
                day[timeSlot].subject = booking.subject.replace(/-/g, " "); // Formatting subject
            }
        });


        return day;
    });
};


function page() {
    const [userInfo, setUserInfo] = useState<any>(null)
    const [timetable, setTimetable] = useState<any>([])
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem("userInfo");

        if (!user) {
            router.push("/login");
        } else {
            let userParse = JSON.parse(user)
            const data = {
                Name: userParse.name,
                Email: userParse.email,
                'Phone Number': userParse.phone,
            }
            setUserInfo(data)
        }

    }, []);

    useEffect(() => {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedTimetable = mergeBookingsIntoTimetable(initialTeacherTimeTable, bookings);
        setTimetable(updatedTimetable)
    }, [])


    if (!userInfo) return <p>Loading...</p>

    return (
        <div style={{ fontFamily: "var(--font-poppins)" }}>
            <TeacherNavbar />
            <Profile user={userInfo} />
            <div className='p-10'>
                <div className='flex justify-between'>
                    <p className='text-xl font-semibold mb-4'>Time table</p>
                    <Button onClick={() => {
                        localStorage.removeItem('bookings')
                        window.location.reload()
                    }}>
                        Cancel Slot
                    </Button>
                </div>
                <DataTableDemo data={timetable} columns={teacherColumns} />

            </div>
        </div>
    )
}

export default page
