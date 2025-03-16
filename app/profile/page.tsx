'use client'
import { DataTableDemo, qualificationColumns } from "@/components/data-table";
import Navbar from "@/components/navBar";
import Profile from "@/components/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_BAR = [

]

export default function Home() {
    const [userInfo, setUserInfo] = useState<any>(null)
    const [qualification, setQualification] = useState([])
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
                Age: userParse.age,
                'Academic Bank of Credits(ABC) ID': userParse.ABC,
                Class: userParse.class
            }
            setUserInfo(data)
            setQualification(userParse.qualifications)
        }

    }, []);

    if (!userInfo) return <p>Loading...</p>
    return (
        <div style={{ fontFamily: "var(--font-poppins)" }}>
            <Navbar />
            <Profile user={userInfo} />
            <div className='my-5 px-10'>
                <p className='text-xl font-semibold'>Qualifications</p>
                <DataTableDemo data={qualification} columns={qualificationColumns} />
            </div>
        </div>
    );
}
