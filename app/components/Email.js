"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
function Email() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_z7peq3f", "template_9wdgph2", form.current, {
        publicKey: process.env.NEXT_PUBLIC_SENDGRID_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Thank you for joining our newsletter");

          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="text-2xl font-bold mb-4 flex gap-2">
        <Input
          type="email"
          name="user_email"
          placeholder="Enter your email address"
          className="bg-white text-black"
        />
        <Button type="submit" value="Send">
          Join now
        </Button>
      </div>
    </form>
  );
}

export default Email;
