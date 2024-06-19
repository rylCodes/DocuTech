import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default function CallToAction(props) {
  return (
    <section className="py-12 px-4 w-full bg-teal-500">
      <div className="flex flex-col items-center gap-4 justify-center w-full max-w-4xl mx-auto text-center">
        <h2 className="text-3xl leading-none font-bold text-gray-50">
          Document Your Tech
        </h2>
        <p className="text-gray-200 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          nostrum ea, officiis laboriosam neque voluptatem enim a itaque aliquam
          reiciendis quod, temporibus et iusto veniam voluptatibus error ad
          aspernatur repudiandae!
        </p>
        {props.isAuthenticated ? (
          <Link
            href={"/create"}
            className="flex items-center px-4 py-2 gap-1 rounded-md text-teal-500 bg-gray-50 shadow-lg"
          >
            <span className="font-semibold">Create</span>
            <FaPenToSquare className="text-base md:text-lg" />
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="flex items-center px-4 py-2 gap-1 rounded-md text-teal-500 bg-gray-50 shadow-lg"
          >
            <span className="font-semibold">Get Started</span>
            <FaArrowAltCircleRight className="text-lg" />
          </Link>
        )}
      </div>
    </section>
  );
}
