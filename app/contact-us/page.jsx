"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-yellow-300 to-green-400 p-4 md:p-8 flex flex-col md:flex-row items-center justify-center">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
            Contact our awesome team!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Full name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700"
              >
                Subject
              </Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className="md:w-1/2 relative">
          <Image
            src="/childrenstorylogo.webp?height=600&width=600"
            alt="Colorful abstract shapes"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <p className="text-white text-2xl font-bold text-center px-4">
              We cant wait to hear from you!
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
