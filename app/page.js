"use client";

// import Typewriter from "typewriter-effect";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart2, Calendar, CheckCircle, Users } from "lucide-react";
// import Link from "next/link";
// import PrimaryButton from "@/components/PrimaryButton";

const Section = ({ bgColor, children }) => (
  <section className={`w-full h-dvh ${bgColor} flex items-center justify-center gap-4 text-secondary-500 px-6`}>
    {children}
  </section>
);

export default function LandingPage() {
  // const introduceText = [
  //   "PlanVerse",
  //   "PMS",
  //   "Project Management System",
  // ];

  return (
    <div className="w-full h-full min-h-dvh">
      <main>
        <Section bgColor="bg-primary-100">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold whitespace-pre-wrap mb-4">
              {`업무 관리에 더 이상\n많은 시간을 쓰지 마세요`}
            </h1>
            <h3 className="text-2xl font-semibold">
              {`planVerse로 업무의 효율을 늘려보세요`}
            </h3>
          </div>
          <div className="flex items-center justify-center w-1/2 h-[512px] bg-gray-100">
            이미지 영역
          </div>
        </Section>
        <Section bgColor="bg-white">
          <div className="flex items-center justify-center w-1/2 h-[512px] bg-gray-100">
            이미지 영역
          </div>
          <div className="w-1/2">
            <h1 className="text-5xl font-bold mb-4 text-right">
              {`빠르게.`}
            </h1>
            <h3 className="text-2xl font-semibold whitespace-pre-wrap text-right">
              {`필수 기능만 탑재하여\n더욱 빠른 로딩 속도를 경험해보세요`}
            </h3>
          </div>
        </Section>
        <Section bgColor="bg-primary-100">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold whitespace-pre-wrap mb-4">
              {`간편하게.`}
            </h1>
            <h3 className="text-2xl font-semibold">
              {`처음 사용해도 어렵지 않아요`}
            </h3>
          </div>
          <div className="flex items-center justify-center w-1/2 h-[512px] bg-gray-100">
            이미지 영역
          </div>
        </Section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-secondary-400">
          &copy; 2024 PlanVerse. All rights reserved.
        </div>
      </footer>
    </div>
    // <div className="flex flex-col min-h-screen">
    //   <main className="flex-grow container mx-auto px-4 py-8">
    //     <section className="text-center mb-12">
    //       <h2 className="text-4xl font-bold mb-4">
    //         Welcome&nbsp;
    //         <span className="text-[#3B82F6] dark:text-[#3B82F6]">
    //           <Typewriter
    //             options={{
    //               strings: introduceText,
    //               cursor: " <",
    //               delay: 80,
    //               loop: true,
    //               autoStart: true,
    //               pauseFor: 1500,
    //             }}
    //           />
    //           </span>
    //       </h2>
    //       <p className="text-xl text-muted-foreground">Streamline your projects with our powerful management system</p>
    //     </section>

    //     <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    //       {[
    //         { title: "Task Management", icon: CheckCircle, description: "Organize and track tasks efficiently" },
    //         { title: "Analytics", icon: BarChart2, description: "Gain insights with powerful analytics" },
    //         { title: "Team Collaboration", icon: Users, description: "Work together seamlessly" },
    //         { title: "Scheduling", icon: Calendar, description: "Plan and schedule with ease" },
    //       ].map((feature, index) => (
    //         <Card key={index}>
    //           <CardHeader>
    //             <CardTitle className="flex items-center gap-2">
    //               <feature.icon className="h-6 w-6" />
    //               {feature.title}
    //             </CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <CardDescription>{feature.description}</CardDescription>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </section>

    //     <section className="text-center">
    //       <h3 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h3>
    //       <PrimaryButton>
    //         <Link href="/signin">Get Started Now</Link>
    //       </PrimaryButton>
    //     </section>
    //   </main>
  );
}
