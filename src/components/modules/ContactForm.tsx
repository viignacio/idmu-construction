"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { css } from "@/styled-system/css";
import { getThemeColors } from "@/lib/theme";

const getSocialIcon = (url: string) => {
  const lowercaseUrl = url.toLowerCase();
  
  if (lowercaseUrl.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    );
  }
  if (lowercaseUrl.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    );
  }
  if (lowercaseUrl.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.981 0 1.771-.773 1.771-1.729V1.729C24 .774 23.207 0 22.225 0z"/></svg>
    );
  }
  if (lowercaseUrl.includes("twitter") || lowercaseUrl.includes(" x.com")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
    );
  }
  
  return "link"; // Material Symbol fallback
};

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(10, "Please provide at least 10 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the technical standards" }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  heading?: string;
  subheading?: string;
  mapEmbedUrl?: string;
  backgroundColor?: string;
  business?: any;
}

export default function ContactForm({
  heading = "Let's build the future.",
  subheading,
  mapEmbedUrl,
  backgroundColor = "background",
  business,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const theme = getThemeColors(backgroundColor);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "Commercial Construction",
      budget: "₱5M - ₱10M",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  return (
    <section
      className={css({
        width: "full",
        paddingY: { base: "6rem", md: "8rem" },
        paddingX: { base: "2rem", md: "6rem" },
        backgroundColor: theme.bg,
        color: theme.text,
      })}
    >
      <div
        className={css({
          maxWidth: "7xl",
          marginX: "auto",
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          gap: { base: "4rem", lg: "8rem" },
        })}
      >
        {/* Left Column: Context & Info */}
        <div className={css({ flex: "0 0 40%", spaceY: "3rem" })}>
          <header className={css({ spaceY: "1.5rem" })}>
            <h1
              className={css({
                fontFamily: "headline",
                fontSize: { base: "4xl", md: "6xl" },
                fontWeight: "black",
                letterSpacing: "tighter",
                lineHeight: "0.9",
                textTransform: "uppercase",
              })}
            >
              {heading}
            </h1>
            {subheading && (
              <p
                className={css({
                  fontFamily: "body",
                  fontSize: "lg",
                  lineHeight: "relaxed",
                  opacity: 0.8,
                  maxWidth: "md",
                })}
              >
                {subheading}
              </p>
            )}
          </header>

          <div className={css({ spaceY: "2.5rem" })}>
            {/* Address */}
            <div className={css({ display: "flex", gap: "1.5rem" })}>
              <div className={css({ 
                width: "3rem", 
                height: "3rem", 
                backgroundColor: "primary", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0
              })}>
                <span className="material-symbols-outlined" style={{ color: "#E09F3E", fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div>
                <span className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", marginBottom: "0.5rem", opacity: 0.6 })}>Office Location</span>
                <p className={css({ fontFamily: "headline", fontSize: "lg", fontWeight: "medium", whiteSpace: "pre-line" })}>
                  {business?.address || "Unit 1204, Makati Corporate Tower,\nAyala Avenue, Makati City"}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className={css({ display: "flex", gap: "1.5rem" })}>
              <div className={css({ 
                width: "3rem", 
                height: "3rem", 
                backgroundColor: "primary", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0
              })}>
                <span className="material-symbols-outlined" style={{ color: "#E09F3E", fontVariationSettings: "'FILL' 1" }}>call</span>
              </div>
              <div>
                <span className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", marginBottom: "0.5rem", opacity: 0.6 })}>Direct Line</span>
                <p className={css({ fontFamily: "headline", fontSize: "lg", fontWeight: "medium" })}>{business?.phone || "+63 2 8812 3456"}</p>
                <p className={css({ fontFamily: "headline", fontSize: "lg", fontWeight: "medium" })}>{business?.email || "contact@idmu.com.ph"}</p>
              </div>
            </div>

            {/* Social Links */}
            {business?.socials && (
              <div className={css({ display: "flex", gap: "1rem", paddingTop: "1rem" })}>
                {business.socials.map((social: any) => {
                  const icon = getSocialIcon(social.url);
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.platform || "Social Media"}
                      className={css({
                        width: "2.5rem",
                        height: "2.5rem",
                        backgroundColor: "rgba(13, 27, 42, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                        _hover: { 
                          backgroundColor: "tertiary", 
                          color: "primary",
                          transform: "translateY(-4px)" 
                        }
                      })}
                    >
                      {/* Using Material Symbols fallback or SVG for brands */}
                      {typeof icon === "string" ? (
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{icon}</span>
                      ) : (
                        <span className={css({ width: "20px", height: "20px" })}>{icon}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Map Embed */}
          {mapEmbedUrl && (
            <div className={css({ position: "relative", width: "full", paddingTop: "56.25%", backgroundColor: "rgba(13, 27, 42, 0.05)" })}>
              <iframe
                src={mapEmbedUrl}
                className={css({ position: "absolute", inset: 0, width: "full", height: "full", border: "none", filter: "grayscale(100%) contrast(1.2)" })}
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Right Column: The Form */}
        <div className={css({ flex: "1" })}>
          <div
            className={css({
              backgroundColor: "white",
              padding: { base: "2rem", md: "4rem" },
              boxShadow: "0 24px 48px rgba(13, 27, 42, 0.08)",
              color: "primary",
            })}
          >
            {isSubmitted ? (
              <div className={css({ textAlign: "center", spaceY: "2rem", paddingY: "4rem" })}>
                <div className={css({ 
                  width: "4rem", 
                  height: "4rem", 
                  backgroundColor: "tertiary", 
                  marginX: "auto", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                })}>
                  <span className="material-symbols-outlined" style={{ fontSize: "32px", fontWeight: "bold" }}>check</span>
                </div>
                <h2 className={css({ fontFamily: "headline", fontSize: "3xl", fontWeight: "black", letterSpacing: "tight", textTransform: "uppercase" })}>Blueprint Received.</h2>
                <p className={css({ fontFamily: "body", opacity: 0.8 })}>Our estimation team will review your project requirements and reach out within 48 business hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className={css({ 
                    backgroundColor: "primary", 
                    color: "white", 
                    paddingX: "2rem", 
                    paddingY: "1rem", 
                    fontFamily: "headline", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    fontSize: "xs", 
                    letterSpacing: "widest",
                    cursor: "pointer"
                  })}
                >
                  Submit Another Quote
                </button>
              </div>
            ) : (
              <>
                <h2 className={css({ fontFamily: "headline", fontSize: "2rem", fontWeight: "black", letterSpacing: "tight", marginBottom: "3rem", textTransform: "uppercase" })}>Get a Quote</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={css({ spaceY: "2rem" })}>
                  <div className={css({ display: "grid", gridTemplateColumns: { base: "1fr", md: "1fr 1fr" }, gap: "2rem" })}>
                    <div className={css({ spaceY: "0.5rem" })}>
                      <label className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", opacity: 0.6 })}>Your Name</label>
                      <input
                        {...register("name")}
                        className={inputStyles}
                        placeholder="Architect / Developer Name"
                      />
                      {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
                    </div>
                    <div className={css({ spaceY: "0.5rem" })}>
                      <label className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", opacity: 0.6 })}>Email Address</label>
                      <input
                        {...register("email")}
                        className={inputStyles}
                        placeholder="professional@email.com"
                        type="email"
                      />
                      {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
                    </div>
                    <div className={css({ spaceY: "0.5rem" })}>
                      <label className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", opacity: 0.6 })}>Project Type</label>
                      <select {...register("projectType")} className={inputStyles}>
                        <option>Commercial Construction</option>
                        <option>Residential Development</option>
                        <option>Interior Fit-out</option>
                        <option>Infrastructure & Civil Works</option>
                      </select>
                      {errors.projectType && <p className={errorStyles}>{errors.projectType.message}</p>}
                    </div>
                    <div className={css({ spaceY: "0.5rem" })}>
                      <label className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", opacity: 0.6 })}>Estimated Budget</label>
                      <select {...register("budget")} className={inputStyles}>
                        <option>₱5M - ₱10M</option>
                        <option>₱10M - ₱50M</option>
                        <option>₱50M - ₱100M</option>
                        <option>₱100M+</option>
                      </select>
                      {errors.budget && <p className={errorStyles}>{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div className={css({ spaceY: "0.5rem" })}>
                    <label className={css({ display: "block", fontFamily: "headline", fontWeight: "bold", fontSize: "xs", textTransform: "uppercase", letterSpacing: "widest", opacity: 0.6 })}>Project Description</label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      className={inputStyles}
                      placeholder="Tell us about your technical requirements and site location..."
                    />
                    {errors.description && <p className={errorStyles}>{errors.description.message}</p>}
                  </div>

                  <div className={css({ spaceY: "1.5rem" })}>
                    <div className={css({ display: "flex", gap: "1rem" })}>
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className={css({ marginTop: "0.25rem", accentColor: "primary" })}
                      />
                      <label className={css({ fontSize: "sm", opacity: 0.8, lineHeight: "relaxed" })}>
                        I agree to the <span className={css({ textDecoration: "underline", fontWeight: "bold" })}>Safety Standards</span> and <span className={css({ textDecoration: "underline", fontWeight: "bold" })}>Privacy Policy</span>. I understand my data will be used to generate a technical quote.
                      </label>
                    </div>
                    {errors.consent && <p className={errorStyles}>{errors.consent.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={css({
                      width: "full",
                      backgroundColor: "primary",
                      color: "white",
                      paddingY: "1.5rem",
                      fontFamily: "headline",
                      fontWeight: "black",
                      textTransform: "uppercase",
                      fontSize: "lg",
                      letterSpacing: "tighter",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      _hover: { backgroundColor: "secondary", transform: "translateY(-2px)" },
                      _disabled: { opacity: 0.5, cursor: "not-allowed" }
                    })}
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                    {!isSubmitting && <span className="material-symbols-outlined">arrow_forward</span>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyles = css({
  width: "full",
  backgroundColor: "transparent",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "2px solid",
  borderColor: "rgba(13, 27, 42, 0.1)",
  paddingY: "0.75rem",
  fontFamily: "body",
  outline: "none",
  transition: "all 0.3s",
  _focus: { borderColor: "tertiary" },
});

const errorStyles = css({
  color: "#ba1a1a",
  fontSize: "xs",
  fontFamily: "body",
  fontWeight: "bold",
  marginTop: "0.25rem",
});
