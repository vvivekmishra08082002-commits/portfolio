"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone === "8103791984") {
      setStep(2);
      setError("");
    } else {
      setError("Unrecognized Phone Number");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn("credentials", {
      phone,
      otp,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid OTP Code");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass p-8 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        
        <h1 className="text-3xl font-black mb-2 relative z-10">Admin Access</h1>
        <p className="text-muted-foreground mb-8 relative z-10">Secure OTP Verification</p>

        {error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-xl mb-6 text-sm font-bold">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter 10-digit number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-4 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              className="mt-4 p-4 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-primary/20"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 relative z-10">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl mb-2">
              <p className="text-xs text-muted-foreground mb-1">Code sent to:</p>
              <p className="font-mono font-bold text-lg">{phone}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Enter 6-digit OTP</label>
              <input 
                type="text" 
                placeholder="• • • • • •" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="p-4 bg-background border border-border rounded-xl text-center font-mono text-xl tracking-[0.5em] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="mt-4 p-4 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="mt-2 text-sm text-muted-foreground hover:text-primary font-medium"
            >
              &larr; Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
