"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Shield } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  enquiryType: z.enum([
    "partnership",
    "engineering",
    "product_inquiry",
    "research",
    "other",
  ]),
  message: z.string().min(10, "Please describe your inquiry (minimum 10 characters)"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [ticketId, setTicketId] = useState<string>("");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      enquiryType: "engineering",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState("submitting");
    setServerErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmissionState("success");
        setTicketId(json.ticketId || `INAN-${Date.now().toString(36).toUpperCase()}`);
        reset();
      } else {
        setSubmissionState("error");
        setServerErrorMessage(json.error || "Failed to deliver inquiry. Please try again.");
      }
    } catch {
      setSubmissionState("error");
      setServerErrorMessage("Network error occurred. Please check your connection.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-foreground font-sans"
      aria-label="Section — Contact"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-xs tracking-widest text-[#BCECE2] uppercase font-bold">
                Contact
              </span>
              <span className="h-px w-10 bg-[#BCECE2]/50" />
              <span className="text-xs font-sans text-[#a1a1aa] uppercase font-semibold">
                Let's Build Something
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
              Have an idea{" "}
              <span className="text-[#BCECE2] font-black">worth building?</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#a1a1aa] font-medium leading-relaxed">
              Let's explore what we can create together. Whether you are seeking a
              technical partner, interested in our architecture, or exploring research
              collaboration.
            </p>
          </div>

          {/* Contact Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Channels */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="p-8 rounded-2xl border border-white/10 bg-[#05113A]/70 backdrop-blur-xl shadow-lg flex flex-col gap-6">
                <span className="font-sans text-xs uppercase tracking-wider text-[#BCECE2] font-bold">
                  COMMUNICATION CHANNELS
                </span>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#BCECE2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-sans text-[#a1a1aa]">ELECTRONIC TRANSMISSION</span>
                    <a
                      href="mailto:contact@inanlabs.com"
                      className="text-base font-bold text-foreground hover:text-[#BCECE2] transition-colors"
                    >
                      contact@inanlabs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#BCECE2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-sans text-[#a1a1aa]">HEADQUARTERS</span>
                    <span className="text-base font-bold text-foreground">
                      INAN LABS Engineering Group
                    </span>
                    <span className="text-xs text-[#a1a1aa] font-sans">
                      Global Remote & Bengaluru, IN
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-white/70">
                  <Shield className="w-4 h-4 text-[#BCECE2]" />
                  <span className="font-semibold">END-TO-END CRYPTOGRAPHIC ENCRYPTION</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-dashed border-[#BCECE2]/30 bg-[#05113A]/50 font-sans text-xs text-[#a1a1aa] flex flex-col gap-2">
                <span className="text-foreground font-bold">INDEPENDENT COMMITMENT</span>
                <p className="text-[12px] leading-relaxed">
                  We respect intellectual property. We do not distribute, sell, or
                  disclose inquiries to third parties.
                </p>
              </div>
            </div>

            {/* Functional Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#05113A]/70 backdrop-blur-xl shadow-lg relative">
              {submissionState === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#BCECE2]/15 border border-[#BCECE2] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-7 h-7 text-[#BCECE2]" />
                  </div>

                  <span className="font-sans text-xs text-[#BCECE2] font-bold tracking-widest uppercase mb-2">
                    TRANSMISSION CONFIRMED
                  </span>

                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Inquiry Successfully Received
                  </h3>

                  <p className="text-sm text-[#a1a1aa] max-w-md leading-relaxed mb-6 font-medium">
                    Thank you for reaching out to INAN LABS. Your dispatch has been logged
                    under ticket reference:
                  </p>

                  <div className="px-4 py-2 bg-black/60 rounded-lg font-sans text-xs font-bold text-[#BCECE2] border border-white/15 mb-8">
                    REF // {ticketId}
                  </div>

                  <button
                    className="px-6 py-2.5 rounded-full border border-[#BCECE2]/40 text-[#BCECE2] hover:bg-[#BCECE2]/10 text-xs font-sans tracking-wider uppercase font-bold transition-colors cursor-pointer"
                    onClick={() => setSubmissionState("idle")}
                  >
                    Submit Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 font-sans text-xs text-[#a1a1aa]">
                    <span className="font-semibold">DISPATCH FORM // SECURE INQUIRY</span>
                    <span className="text-[#BCECE2] font-bold">* REQUIRED</span>
                  </div>

                  {submissionState === "error" && (
                    <div className="p-4 rounded-lg bg-red-500/15 border border-red-500/40 flex items-center gap-3 text-sm text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{serverErrorMessage}</span>
                    </div>
                  )}

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="font-sans text-xs uppercase tracking-wider text-foreground font-bold">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Ada Lovelace"
                        {...register("name")}
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-[#BCECE2] transition-colors font-medium ${
                          errors.name ? "border-red-500/80" : "border-white/15"
                        }`}
                      />
                      {errors.name && (
                        <span className="font-sans text-[11px] text-red-400 font-semibold">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="font-sans text-xs uppercase tracking-wider text-foreground font-bold">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="ada@domain.com"
                        {...register("email")}
                        className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-[#BCECE2] transition-colors font-medium ${
                          errors.email ? "border-red-500/80" : "border-white/15"
                        }`}
                      />
                      {errors.email && (
                        <span className="font-sans text-[11px] text-red-400 font-semibold">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enquiry Type Selector */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-enquiry" className="font-sans text-xs uppercase tracking-wider text-foreground font-bold">
                      Inquiry Type *
                    </label>
                    <select
                      id="contact-enquiry"
                      {...register("enquiryType")}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-foreground focus:outline-none focus:border-[#BCECE2] transition-colors font-sans font-medium"
                    >
                      <option value="engineering">Software Systems & Engineering</option>
                      <option value="partnership">Strategic Partnership</option>
                      <option value="product_inquiry">Product Inquiries & Licences</option>
                      <option value="research">Technical R&D Collaboration</option>
                      <option value="other">General Inquiries</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="font-sans text-xs uppercase tracking-wider text-foreground font-bold">
                      Inquiry Details *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Describe your project, architectural goals, or question..."
                      {...register("message")}
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-[#BCECE2] transition-colors resize-none font-medium ${
                        errors.message ? "border-red-500/80" : "border-white/15"
                      }`}
                    />
                    {errors.message && (
                      <span className="font-sans text-[11px] text-red-400 font-semibold">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submissionState === "submitting"}
                      className="w-full py-4 rounded-xl text-white disabled:opacity-50 font-sans text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer bg-[#348D9F] hover:bg-[#066680] shadow-[0_0_24px_rgba(52,141,159,0.3)] font-bold border-none"
                    >
                      {submissionState === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Transmitting Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Inquiry</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
