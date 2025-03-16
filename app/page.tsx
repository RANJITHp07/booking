'use client'
import { DataTableDemo } from "@/components/data-table";
import Navbar from "@/components/navBar";
import Profile from "@/components/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("userInfo");

    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div>

    </div>
  );
}
