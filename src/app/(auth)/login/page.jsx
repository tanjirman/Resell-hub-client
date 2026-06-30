"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";
import { FaEnvelope, FaLock, FaStore } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      toast.error("Login failed. Please check your credentials.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  // Shared professional input styles
  const inputStyles = "w-full bg-slate-950 border border-white/20 text-white placeholder:text-slate-500 rounded-xl transition-all focus:border-pink-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <Card className="w-full max-w-md border border-white/10 bg-slate-900/40 backdrop-blur-lg shadow-2xl p-6">
        <CardHeader className="flex flex-col gap-2 items-center pb-8 text-center">
          <div className="bg-gradient-to-tr from-pink-500 to-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-pink-500/20">
            <FaStore size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Access your account to start trading.</p>
        </CardHeader>

        <CardBody className="gap-5">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-slate-300 ml-1">Email Address</Label>
              <Input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="name@company.com"
                className={inputStyles}
              />
              {errors.email && <p className="text-red-400 text-[10px] ml-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-slate-300 ml-1">Password</Label>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className={inputStyles}
              />
              {errors.password && <p className="text-red-400 text-[10px] ml-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="w-full bg-white text-slate-900 font-bold h-12 mt-4 hover:bg-slate-200"
            >
              Sign In
            </Button>
          </Form>

          <p className="text-center text-sm text-slate-400 mt-4">
            New at Resell Hub?{" "}
            <Link href="/register" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}