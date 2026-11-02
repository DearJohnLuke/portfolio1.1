"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub, BsLockFill, BsPlayFill } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { projects, archive } from "@/lib/projects";

const RoundBtn = ({ href, label, onClick, children }) => {
  const inner = (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          aria-label={label}
          className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group"
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  return href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </Link>
  ) : (
    inner
  );
};

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const videos = useRef([]);

  const handleSlideChange = (swiper) => {
    // pause any playing demo when leaving its slide
    videos.current.forEach((v) => v && !v.paused && v.pause());
    setProject(projects[swiper.activeIndex]);
  };

  const playCurrent = () => {
    const v = videos.current[projects.indexOf(project)];
    if (v) v.play();
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
          <div className="w-full xl:w-[50%] xl:min-h-[520px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[24px]">
              {/* outline num */}
              <div className="flex items-end gap-4">
                <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                  {project.num}
                </div>
                <span className="text-white/40 mb-2">/ {projects.length}</span>
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <h3 className="text-xl text-white">{project.title}</h3>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* proof */}
              {project.proof?.length > 0 && (
                <div>
                  <p className="uppercase text-sm tracking-widest text-white/40 mb-2">
                    Proof
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.proof.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/80">
                        <span className="mt-[9px] w-[6px] h-[6px] shrink-0 rounded-full bg-accent"></span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {project.live && (
                  <RoundBtn href={project.live} label="Live project">
                    <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                  </RoundBtn>
                )}
                {project.video && (
                  <RoundBtn label="Play demo video" onClick={playCurrent}>
                    <BsPlayFill className="text-white text-3xl group-hover:text-accent" />
                  </RoundBtn>
                )}
                {project.github ? (
                  <RoundBtn href={project.github} label="Github repository">
                    <BsGithub className="text-white text-3xl group-hover:text-accent" />
                  </RoundBtn>
                ) : (
                  <RoundBtn label="Private repository — code walkthrough on request">
                    <BsLockFill className="text-white text-2xl group-hover:text-accent" />
                  </RoundBtn>
                )}
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
              {projects.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {item.video ? (
                        <video
                          ref={(el) => (videos.current[index] = el)}
                          src={item.video}
                          poster={item.image}
                          controls
                          playsInline
                          preload="none"
                          className="w-full h-full object-cover bg-black"
                        />
                      ) : (
                        <>
                          {/* overlay */}
                          <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                          {/* image */}
                          <div className="relative w-full h-full">
                            <Image
                              src={item.image}
                              fill
                              sizes="(min-width: 1200px) 50vw, 100vw"
                              className="object-cover object-top"
                              alt={`${item.title} screenshot`}
                            />
                          </div>
                        </>
                      )}
                      {!item.github && (
                        <span className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-primary/90 text-white/80 text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                          <BsLockFill className="text-accent" /> Private repo
                        </span>
                      )}
                      {item.video && (
                        <span className="absolute top-4 right-4 z-20 bg-accent text-primary text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                          Demo video
                        </span>
                      )}
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

        {/* archive */}
        <div className="mt-16 flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2 text-center xl:text-left">
            <h3 className="text-4xl font-bold">More projects</h3>
            <p className="max-w-[700px] text-white/60 mx-auto xl:mx-0">
              Other client and internal builds from the Robust Code GitHub organisation.
              Private repositories are marked with a lock; code walkthrough on request.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
            {archive.map((item, index) => {
              const card = (
                <div className="bg-[#232329] h-full py-6 px-8 rounded-xl flex flex-col gap-2 group">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg leading-snug group-hover:text-accent transition-all duration-300">
                      {item.name}
                    </h4>
                    {item.github ? (
                      <BsGithub className="shrink-0 text-xl text-white/60 group-hover:text-accent" />
                    ) : (
                      <BsLockFill className="shrink-0 text-lg text-white/40" />
                    )}
                  </div>
                  <span className="text-accent text-sm">{item.stack}</span>
                  <p className="text-white/60 text-sm leading-relaxed">{item.note}</p>
                </div>
              );
              return (
                <li key={index}>
                  {item.github ? (
                    <Link href={item.github} target="_blank" rel="noopener noreferrer">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
