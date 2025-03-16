'use client'
import { DataTableDemo, teacherColumns, timeTableColumns } from '@/components/data-table'
import Navbar from '@/components/navBar'
import React, { useEffect, useState } from 'react'
import { mergeBookingsIntoTimetable } from '../teacher-profile/page';
import { initialTeacherTimeTable } from '@/utils/user';

function Page() {
    const [timetable, setTimetable] = useState<any>([])


    useEffect(() => {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedTimetable = mergeBookingsIntoTimetable(initialTeacherTimeTable, bookings);
        setTimetable(updatedTimetable)
    }, [])
    return (
        <div style={{ fontFamily: "var(--font-poppins)" }}>
            <Navbar />
            <div className='p-10'>
                <p className='text-xl font-semibold mb-4'>Time table</p>
                <DataTableDemo data={timetable} columns={teacherColumns} />

            </div>
        </div>
    )
}

export default Page
