
import Image from "next/image";
import { LoginForm } from "./form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col md:flex-row">
            <header className="p-4 absolute top-0 left-0 right-0 z-10">
                <Image src="/logos/jewel(white).svg" alt="Jewel" className="h-8" width={50} height={50} />
            </header>
            <div className="w-full md:w-1/2 h-64 md:h-screen relative">
                <svg width="100%" height="100%" viewBox="0 0 720 1024" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_23_1215)">
                        <rect width="720" height="1024" fill="#191A23"/>
                        <circle cx="-8.08493" cy="1047.42" r="410.415" fill="#283314"/>
                        <circle cx="-8.08536" cy="1047.42" r="324.251" fill="#191A23"/>
                        <circle cx="-8.08475" cy="1047.42" r="248.29" fill="#283314"/>
                        <path
                            d="M407.367 72.1065C337.527 78.6991 290.022 26.7824 275 0L720 1.80266V371.606H670.298C516.402 352.034 542.309 274.005 574.499 237.436C593.299 211.77 627.292 149.93 612.87 107.902C594.844 55.3675 494.667 63.8657 407.367 72.1065Z"
                            fill="#283314"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_23_1215">
                            <rect width="720" height="1024" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <LoginForm />
                    <div className="flex gap-4 items-center">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground">Don&apos;t have an account?</span>
                    <Separator className="flex-1" />
                    </div>
                    <div>
                        <Link className={buttonVariants({ variant: 'outline', className: 'w-full'})} href='/signup'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}