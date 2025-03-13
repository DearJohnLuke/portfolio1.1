import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/DearJohnLuke" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/jean-luc-luzemba-01a157233/" },
  { icon: <FaWhatsapp />, path: "https://wa.me/33745515093" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
