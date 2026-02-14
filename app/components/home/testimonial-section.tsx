"use client";

import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "Chai! This Alleloquent Farms sef! Their plantain sweet die! My family can't stop asking for more. The eggs are fresh, rice quality is top-notch. I don't stress going to market anymore! 🙌",
      author: "Mama Chioma",
      role: "Busy Mom of 3, Lagos",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      rating: 5,
    },
    {
      quote:
        "As a restaurant owner, I need reliable suppliers. These guys deliver on time, EVERY TIME! Their chicken is fresh, healthy, and my customers love it. Best decision I made for my business! 💯",
      author: "Alhaji Musa Ibrahim",
      role: "Restaurant Owner, Abuja",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      rating: 5,
    },
    {
      quote:
        "I've been ordering from them for 6 months now. Quality never disappoints! Fresh eggs, sweet plantain, premium rice - everything is always on point. Plus their customer service is amazing! ⭐",
      author: "Ada Nkem",
      role: "Food Blogger, Port Harcourt",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full p-6 shadow-2xl">
              <Quote className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative border border-slate-100">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-8 text-xl md:text-2xl font-medium text-slate-700 leading-relaxed text-center">
              {current.quote}
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-orange-100">
                <Image
                  src={current.image}
                  alt={current.author}
                  fill
                  quality={95}
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-slate-900">
                  {current.author}
                </p>
                <p className="text-slate-600">{current.role}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                size="icon"
                variant="outline"
                onClick={prevTestimonial}
                className="rounded-full h-12 w-12 border-2 hover:bg-orange-50 hover:border-orange-500 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-orange-500"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <Button
                size="icon"
                variant="outline"
                onClick={nextTestimonial}
                className="rounded-full h-12 w-12 border-2 hover:bg-orange-50 hover:border-orange-500 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
              5,000+
            </p>
            <p className="text-slate-600 font-medium">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
              4.9/5
            </p>
            <p className="text-slate-600 font-medium">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
              99.8%
            </p>
            <p className="text-slate-600 font-medium">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
