'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { login } from "./action";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64)
})

type FormSchema = z.infer<typeof formSchema>

export function LoginForm() {
    const router = useRouter()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })
    const handleSubmit = form.handleSubmit(async (data) => {
        startTransition(async () => {
            const { success } = await login(data)
            if (success) {
                router.replace('/journal')
            }
        })
    })
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="bob.ross@usejewel.app" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className="w-full">Log In</Button>
            </form>
        </Form>
    )
}