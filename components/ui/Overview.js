import Link from "next/link";

import {
  FaGears,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaTabletScreenButton,
  FaBookOpenReader,
  FaLightbulb,
  FaBox,
  FaArrowDown,
} from "react-icons/fa6";

export default function Overview(props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 py-12">
      {props.documentations.map((documentation) => (
        <Link
          href={`/documentation/${documentation.slug}`}
          key={documentation.slug}
          className="group p-4 border shadow-lg rounded-md hover:bg-[rgba(20,184,166,0.1)] hover:shadow-xl transition-colors duration-300"
        >
          <div className="flex gap-4">
            <div className="bg-[rgba(20,184,166,0.1)] text-2xl p-4 rounded-full group-hover:bg-gray-50 h-fit">
              {(documentation.icon === "FaGears" && (
                <FaGears className="size-5 text-teal-500 md:size-6" />
              )) ||
                (documentation.icon === "FaLaptopCode" && (
                  <FaLaptopCode className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaScrewdriverWrench" && (
                  <FaScrewdriverWrench className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaTabletScreenButton" && (
                  <FaTabletScreenButton className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaBookOpenReader" && (
                  <FaBookOpenReader className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaLightbulb" && (
                  <FaLightbulb className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaBox" && (
                  <FaBox className="size-5 text-teal-500 md:size-6" />
                )) ||
                (documentation.icon === "FaArrowDown" && (
                  <FaArrowDown className="size-5 text-teal-500 md:size-6" />
                ))}
            </div>
            <h3 className="text-xl font-bold md:2xl">{documentation.title}</h3>
          </div>
          <p className="mt-4">{documentation.description}</p>
        </Link>
      ))}
    </section>
  );
}
