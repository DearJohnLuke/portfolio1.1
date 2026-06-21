"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Fullstack",
    title: "project 1",
    description:
      "e-services Cd a Digital Administrative Document Wallet — iOS & Android",
    stack: [{ name: "Node.js" }, { name: "PostgreSQL" }, { name: "Flutter" }],
    image: "/assets/work/logo_rdc.png",
    live: "https://ma-commune-bourgmestre-frontend-c5tqva997-robust-codes-projects.vercel.app",
    github: "https://github.com/RobustCode-Incorporated/ma-commune-backend",
  },
  {
    num: "02",
    category: "Fullstack",
    title: "project 2",
    description:
      "Robust School Management",
    stack: [{ name: "vue" }, { name: "Dart" }, { name: "Javascript" }],
    image: "/assets/work/1.jpg",
    live: "https://youtu.be/b5HQeWyw0Iw?si=WpL1Ec6mo4twJ6_g",
    github: "https://github.com/RobustCode-Incorporated/ROBUSTSCHOOLMANAGEMENT-APP-v1",
  },
  {
    num: "03",
    category: "Frontend",
    title: "project 3",
    description:
      "Barber& Tatto shop Hag-Ink",
    stack: [{ name: "Html 5" }, { name: "Css 3" }, { name: "Javascript" }],
    image: "/assets/work/thumb1.png",
    live: "https://www.hag-ink.com/",
    github: "https://github.com/RobustCode-Incorporated/Hag-Ink",
  },
  {
    num: "04",
    category: "Data Analytics, Data Engineering",
    title: "Project 4",
    description:
      "End-to-end data engineering and analytics project simulating digital wallet adoption in Kinshasa by building ETL pipelines, analyzing real-world datasets (e.g. GSMA data), and developing predictive models and KPIs to forecast user growth and support data-driven decision-making.",
    stack: [{ name: "Python" }, { name: "PowerBi" }, { name: "PostgreSQL" }],
    image: "/assets/work/logo_rdc.png",
    live: "https://github.com/RobustCode-Incorporated/data-platform-Kinshasa-",
    github: "https://github.com/RobustCode-Incorporated/data-platform-Kinshasa-",
  },
  {
    num: "05",
    category: "Data Engineering",
    title: "project 5",
    description:
      "Data engineering project simulating digital wallet adoption in Europe (with a focus on Belgium), building scalable data pipelines and analytical models to evaluate market fit, adoption scenarios, and potential industry verticals for SaaS commercialization and go-to-market strategy.",
    stack: [{ name: "JavaScript" }],
    image: "/assets/work/1.jpg",
    live: "https://github.com/RobustCode-Incorporated/data-platform",
    github: "https://github.com/RobustCode-Incorporated/data-platform",
  },
  {
    num: "06",
    category: "Fullstack",
    title: "project 6",
    description:
      "Robust Enterprise Management: SaaS platform for wholesalers and multi-sector SMEs Inventory management, invoicing, reseller coordination, and business operations unified within a single system .",
    stack: [{ name: "typeScript" }, { name: "Dart" }, { name: "python" }, { name: "Node.js" }, { name: "Vue.js" }],
    image: "/assets/work/REM Dashboard.png",
    live: "https://rem-core-frontend.vercel.app/",
    github: "https://github.com/RobustCode-Incorporated/Robust-Enterprise-Management",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
