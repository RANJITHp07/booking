'use client'
import TeacherNavbar from '@/components/teacherNavBar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { classes, initialTeacherTimeTable } from '@/utils/user'
import { Button } from '@/components/ui/button'
import { toast, ToastContainer } from 'react-toastify'
import { mapSlotToTime } from '../teacher-profile/page'

function formatDate(inputDate: string) {
    const [day, month, year] = inputDate.split("/");
    return `${year}-${month}-${day}`;
}

function Booking() {
    const [dept, setDept] = useState<any>(null);
    const [subject, setSubject] = useState<string | null>(null);
    const [cls, setCls] = useState<string | null>(null);
    const [date, setDate] = useState<any>(new Date())
    const [dateButton, setDateButton] = useState(false)
    const [slot, setSlot] = useState<any>([])
    const [existingSlot, setExisitngSlot] = useState<any>([])

    useEffect(() => {
        const bookings = localStorage.getItem("bookings");
        const formattedDate = date?.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

        let _bookings = bookings ? JSON.parse(bookings) : [];
        setExisitngSlot(_bookings.filter((item: any) => item.date === formattedDate).map((item: any) => item.slot))
    }, [date])

    const handleSlots = (slot: number) => {
        if (existingSlot.includes(slot)) return

        setSlot((prev: any) => {
            if (prev.includes(slot)) {
                return prev.filter((item: any) => item != slot)
            }

            return [...prev, slot]
        })
    }

    const isAlreadyBooked = (date: any, slot: number) => {
        const formatDay = formatDate(date)
        const existingDate: any = initialTeacherTimeTable.find((item) => item.date === formatDay);

        if (existingDate && existingDate?.[mapSlotToTime(slot)]?.subject != '') {
            return false
        }

        return true
    }

    const handleButtonClcik = () => {

        if (!dept || !subject || !cls || !date) {
            return toast.error("Please ensure that all required fields are selected.")
        }

        if (slot.length == 0) {
            return toast.error("Slot is not selected")
        }



        const bookings = localStorage.getItem("bookings");
        const formattedDate = date?.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

        let _bookings = bookings ? JSON.parse(bookings) : [];
        const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

        if (_bookings) {
            const books = _bookings.filter((item: any) => item.teacher == user.email)
            if (books.length + slot.length > 2) return toast.error("Maximum two classes can only be booked")
        }

        // Find if the selected slot is already booked for the class on this date
        const existingBooking = _bookings.find(
            (booking: any) =>
                booking.date === formattedDate &&
                booking.class === cls &&
                slot.includes(booking.slot)
        );

        if (existingBooking) {
            return toast.error("This slot is already booked for the selected class.");
        }

        let b = false
        slot.forEach((item: any) => {
            const book = isAlreadyBooked(formattedDate, item)
            if (!book) {
                b = true
                toast.error("You already have class at that slot"); // Stops execution
            }
        })
        if (b) return;
        // Store the new booking
        slot.forEach((item: any) => {
            const newBooking = {
                date: formattedDate,
                class: cls,
                subject: subject,
                department: dept,
                teacher: user.email,
                slot: item
            };


            _bookings.push(newBooking);
            localStorage.setItem("bookings", JSON.stringify(_bookings));
        })

        !b && toast.success("Slot successfully booked!");
    }


    return (
        <div style={{ fontFamily: "var(--font-poppins)" }}>
            <TeacherNavbar />
            <div className='p-10'>
                <p className='text-xl font-semibold mb-4'>Class Scheduler</p>
                <div className='flex gap-3 my-5 mb-12'>
                    <Select onValueChange={(value) => setDept(value)}>
                        <SelectTrigger className="w-1/2 p-4">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Business Analytics">Business Analytics</SelectItem>
                            <SelectItem value="Lean Operating System">Lean Operating System</SelectItem>
                            <SelectItem value="Human Resources">Human Resources</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select disabled={!dept} onValueChange={(value) => setSubject(value)}>
                        <SelectTrigger className="w-1/4">
                            <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Technology of HR">Technology of HR</SelectItem>
                            <SelectItem value="Business Sustainability, Governance, and Ethics">Business Sustainability, Governance, and Ethics</SelectItem>
                            <SelectItem value="Workplace Wellbeing">Workplace Wellbeing</SelectItem>
                            <SelectItem value="Innovation and Design Thinking">Innovation and Design Thinking</SelectItem>
                            <SelectItem value="E-Business">E-Business</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select disabled={!dept} onValueChange={(value) => setCls(value)}>
                        <SelectTrigger className="w-1/4">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                (classes[dept as keyof typeof classes] as any)?.map((item: any) => {
                                    return <SelectItem key={item} value={item}>{item}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>
                    <div className='relative'>
                        <Button onClick={() => setDateButton(!dateButton)}>Date</Button>
                        {
                            dateButton && <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(e) => {
                                    console.log("Selected Date:", e);
                                    setDate(e);
                                    setDateButton(false)
                                }}
                                className="absolute right-0 top-full mt-2 w-max rounded-md border bg-white shadow-md"
                            />
                        }

                    </div>
                </div>
                <p className='text-lg mb-4'>Class Timing : {date?.toLocaleDateString('en-GB')}</p>
                <div className='flex gap-3'>
                    <div className={`h-16 border cursor-pointer ${!existingSlot.includes(1) && !slot.includes(1) ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'} w-60 rounded-xl p-3`} onClick={() => handleSlots(1)}>
                        <p>9:00 - 10:30</p>
                        <p>{existingSlot.includes(1) && slot.includes(1) ? 'Booked' : 'Not Booked'}</p>
                    </div>
                    <div className={`h-16 border cursor-pointer ${!existingSlot.includes(2) && !slot.includes(2) ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'} w-60 rounded-xl p-3`} onClick={() => handleSlots(2)}>
                        <p>10:45 - 12:15</p>
                        <p>{existingSlot.includes(2) || slot.includes(2) ? 'Booked' : 'Not Booked'}</p>
                    </div>
                    <div className={`h-16 border cursor-pointer ${!existingSlot.includes(3) && !slot.includes(3) ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'} w-60 rounded-xl p-3`} onClick={() => handleSlots(3)}>
                        <p>13:00 - 14:30</p>
                        <p>{existingSlot.includes(3) || slot.includes(3) ? 'Booked' : 'Not Booked'}</p>
                    </div>
                    <div className={`h-16 border cursor-pointer ${!existingSlot.includes(4) && !slot.includes(4) ? 'text-red-600 border-red-600' : 'text-green-600 border-green-600'} w-60 rounded-xl p-3`} onClick={() => handleSlots(4)}>
                        <p>14:45 - 16:15</p>
                        <p>{existingSlot.includes(4) || slot.includes(4) ? 'Booked' : 'Not Booked'}</p>
                    </div>
                </div>
                <Button className='my-5' onClick={handleButtonClcik}>Book the schedule</Button>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Booking
