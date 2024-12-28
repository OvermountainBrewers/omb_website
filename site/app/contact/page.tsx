"use client";
/**
 * Contact Form Page
 *
 * A responsive contact form that sends messages to ombrewers@gmail.com.
 * Features:
 * - Form validation for name, email, and message
 * - Bot protection via honeypot field ("website")
 *   - Bots will fill in the hidden field and the form will be submitted without sending an email
 * - Loading states during submission
 * - Success message after sending
 * - Error handling for failed submissions
 *
 * Uses Resend API for email delivery (configured in /api/contact/route.ts)
 */
import { Metadata } from "next";
import { H1, H2, P } from "@/components/typography";
import { Card } from "@/components/card";
import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const FormField = ({
  label,
  name,
  type = "text",
  required = true,
  rows,
  className,
}: FormFieldProps) => (
  <div className="grid w-full gap-1.5">
    <Label.Root
      htmlFor={name}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </Label.Root>
    {rows ? (
      <Textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    ) : (
      <Input
        type={type}
        id={name}
        name={name}
        required={required}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    )}
  </div>
);

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // If the honeypot field is filled, silently reject in api/contact/route.ts
    if (formData.get("website")) {
      setSubmitted(true);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Main>
      <H1>Contact</H1>
      <section>
        {submitted ? (
          <Card>
            <div className="text-center py-8">
              <H2>Thank You!</H2>
              <P>We&apos;ll get back to you as soon as possible.</P>
            </div>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <FormField label="Name" name="name" />
              <FormField label="Email" name="email" type="email" />
              <FormField
                label="Message"
                name="message"
                rows={4}
                className="min-h-[160px]"
              />

              {/* Honeypot field */}
              <div className="hidden">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        )}
      </section>
    </Main>
  );
}
