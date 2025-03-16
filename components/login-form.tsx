'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "react-toastify"
import { users } from "@/utils/user"
import { useRouter } from "next/navigation"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [formData, setFormData] = useState({
        email: null,
        password: null,
    })
    const router = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            toast.error('Both email and password are required');
            return
        }

        const user = users.find((user) => user.email === formData.email);
        if (!user) return toast.error('No such user exist')

        if (user?.password !== formData.password) {
            return toast.error('Wrong password')
        }
        localStorage.setItem('userInfo', JSON.stringify(user))
        router.push(user.route)
    }
    return (
        <div style={{ fontFamily: "var(--font-poppins)" }} className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    onChange={(e: any) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                // required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" placeholder="******" type="password" onChange={(e: any) => setFormData((prev) => ({ ...prev, password: e.target.value }))} />
                            </div>
                            <Button type="submit" className="w-full h-12 cursor-pointer">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
