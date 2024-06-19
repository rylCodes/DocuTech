import { FaGithub, FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-gray-50 border-t drop-shadow-md">
      <div className="w-fit mx-auto">
        <ul className="flex items-center gap-4 mx-auto w-fit">
          <li className="p-1.5 rounded-full bg-[rgba(20,184,166,0.1)]">
            <a href="#">
              <FaGithub className="size-[1.125rem] text-teal-500 hover:text-teal-600 transition-colors duration-300" />
            </a>
          </li>
          <li className="p-1.5 rounded-full bg-[rgba(20,184,166,0.1)]">
            <a href="#">
              <FaFacebook className="size-[1.125rem] text-teal-500 hover:text-teal-600 transition-colors duration-300" />
            </a>
          </li>
          <li className="p-1.5 rounded-full bg-[rgba(20,184,166,0.1)]">
            <a href="#">
              <FaDiscord className="size-[1.125rem] text-teal-500 hover:text-teal-600 transition-colors duration-300" />
            </a>
          </li>
          <li className="p-1.5 rounded-full bg-[rgba(20,184,166,0.1)]">
            <a href="#">
              <FaLinkedin className="size-[1.125rem] text-teal-500 hover:text-teal-600 transition-colors duration-300" />
            </a>
          </li>
        </ul>
        <div className="mt-6 text-sm">
          &copy; DocuTech 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
