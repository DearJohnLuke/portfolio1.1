"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "IT Project Management (CIT Projects)",
    description:
      "Planning, coordinating, and delivering IT projects with focus on efficiency, scalability, and stakeholder alignment.",
    href: "https://www.robust-code.com",
  },
  {
    num: "02",
    title: "Data Analytics & Business Intelligence",
    description:
      "Transforming raw data into actionable insights using SQL, Power BI, and data modeling techniques to support decision-making.",
    href: "https://www.robust-code.com",
  },
  {
    num: "03",
    title: "Cybersecurity & Risk Analysis",
    description:
      "Identifying vulnerabilities, securing systems, and applying cybersecurity best practices to protect digital infrastructures.",
    href: "https://www.robust-code.com",
  },
  {
    num: "04",
    title: "Mobile & Web Application Development",
    description:
      "Designing and developing scalable web and mobile applications focused on performance, usability, and modern architectures.",
    href: "https://www.robust-code.com",
  },
];

import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
