import React, { useState } from 'react'
import  {useAuthStore}  from "../store/useAuthStore.js"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import SkeletonPattern from './SkeletonPattern.jsx';

const ForgotPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [email, setEmail] = useState('');
    const { forgotPassword, isGettingEmail, gotEmail, resetPassword} = useAuthStore();

    const navigate = useNavigate();

    const handleForgotPassword = async (event) => {
        
        event.preventDefault();
        
        if(!email.trim()) 
            return toast.error("Email is a required field!");
        if (!/\S+@\S+\.\S+/.test(email)) 
            return toast.error("Enter a valid Email!");

        await forgotPassword({email});

    }


    const handleResetTokenSubmit = async (event) => {

      event.preventDefault();

      if(password !== confirmPassword)
        return toast.error("Password and Confirm Password Doesn't match!");

      await resetPassword(password, resetToken, navigate);
      
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
          {/* left side */}
          <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              {/* LOGO */}
              <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2 group">
                  <div
                    className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                  group-hover:bg-primary/20 transition-colors"
                  >
                    <MessageSquare className="size-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold mt-2">Forgot Your Password?</h1>
                  <p className="text-base-content/60">No worries here we can reset it!</p>
                </div>
              </div>
    
              {isGettingEmail && 
                
                <form onSubmit={handleForgotPassword} className="space-y-6">
                
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        className={`input input-bordered w-full pl-10`}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                      />
                    </div>
                  </div>
      
                
      
                  <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="size-5 animate-spin" /> : "Submit"}
                  </button>

                </form>
              }


              {gotEmail && 
              
                <form onSubmit={handleResetTokenSubmit} className="space-y-6">
                    
        
                  <div className="form-control">
                      <label className="label">
                      <span className="label-text font-medium">Reset Token</span>
                      </label>
                      <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Change the mail icon */}
                          <Mail className="size-5 text-base-content/40" />
                      </div>
                      <input
                          type="text"
                          className={`input input-bordered w-full pl-10`}
                          placeholder="123456789987654321"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          
                      />
                      </div>
                  </div>

                  <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">New Password</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`input input-bordered w-full pl-10`}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-5 text-base-content/40" />
                          ) : (
                            <Eye className="size-5 text-base-content/40" />
                          )}
                        </button>
                      </div>
                  </div>




                  <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Confirm New Password</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`input input-bordered w-full pl-10`}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setConfirmPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="size-5 text-base-content/40" />
                          ) : (
                            <Eye className="size-5 text-base-content/40" />
                          )}
                        </button>
                      </div>
                  </div>




      
                  
      
                  <button type="submit" className="btn btn-primary w-full" disabled={isGettingEmail}>
                      {isGettingEmail ? (
                      <>
                          <Loader2 className="size-5 animate-spin" />
                          Loading...
                      </>
                      ) : (
                      "Submit!"
                      )}
                  </button>
                </form>
              }
    
              {/* <div className="text-center">
                <p className="text-base-content/60">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary">
                    Sign in
                  </Link>
                </p>
              </div> */}
            </div>
          </div>
    
          {/* right side */}
    
          <SkeletonPattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
        </div>
      );
}

export default ForgotPassword

{/* <div className="form-control">
    <label className="label">
    <span className="label-text font-medium">Password</span>
    </label>
    <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="size-5 text-base-content/40" />
    </div>
    <input
        type={showPassword ? "text" : "password"}
        className={`input input-bordered w-full pl-10`}
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
    <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? (
        <EyeOff className="size-5 text-base-content/40" />
        ) : (
        <Eye className="size-5 text-base-content/40" />
        )}
    </button>
    </div>
</div> */}