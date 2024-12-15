"use client";

import Typewriter from "typewriter-effect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Calendar, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

export default function LandingPage() {
  const introduceText = [
    "PlanVerse",
    "PMS",
    "Project Management System",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-primary-foreground py-4">
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Welcome&nbsp;
            <span className="text-[#3B82F6] dark:text-[#3B82F6]">
              <Typewriter
                options={{
                  strings: introduceText,
                  cursor: " <",
                  delay: 80,
                  loop: true,
                  autoStart: true,
                  pauseFor: 1500,
                }}
              />
              </span>
          </h2>
          <p className="text-xl text-muted-foreground">Streamline your projects with our powerful management system</p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Task Management", icon: CheckCircle, description: "Organize and track tasks efficiently" },
            { title: "Analytics", icon: BarChart2, description: "Gain insights with powerful analytics" },
            { title: "Team Collaboration", icon: Users, description: "Work together seamlessly" },
            { title: "Scheduling", icon: Calendar, description: "Plan and schedule with ease" },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h3>
          <PrimaryButton>
            <Link href="/signin">Get Started Now</Link>
          </PrimaryButton>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2024 PlanVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
