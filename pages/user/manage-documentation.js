import { useEffect, useState } from "react";
import Meta from "@/components/Meta";
import axios from "axios";
import { server } from "@/config";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { TiDocumentDelete } from "react-icons/ti";
import { MdEditDocument } from "react-icons/md";
import { TbSettingsCode } from "react-icons/tb";
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
import { Toast } from "@/utils/Toast";

export default function manageDocumentation(props) {
  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(true);
  const [documentations, setDocumentations] = useState([]);
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage?.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : sessionStorage?.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : "";

    async function getDocumentationsById() {
      try {
        const response = await axios.get(
          `${server}/api/documentations/user/${storedUserId}`
        );
        const results = await response.data;
        setDocumentations(results);
      } catch (error) {
        console.error("Failed to fetch documentations", error);
        if (error.message) {
          alert(error.message);
        }
      } finally {
        setFetching(false);
      }
    }

    getDocumentationsById();
  }, []);

  async function deleteDocumentation(documentationId) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this documentation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(
            server + `/api/documentations/${documentationId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Toast.fire({
            icon: "success",
            title: response.data,
          });

          setDocumentations((prevData) =>
            prevData.filter(
              (documentation) => documentation.id !== documentationId
            )
          );
        } catch (error) {
          console.error("Failed to delete documentation", error);
        }
      } else {
        return;
      }
    });
  }

  return (
    <div>
      <Meta subTitle={"Manage Documentation"} />

      <div className="py-12 px-4 w-full bg-teal-500">
        <div className="container flex flex-col gap-4 w-full mx-auto px-4">
          <div className="flex items-center gap-2 text-3xl leading-none font-bold text-gray-50 md:text-text-[2.5rem]">
            <TbSettingsCode />
            <h2>Manage Documentation</h2>
          </div>
          <p className="text-gray-200 text-md md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 min-h-[calc(100svh-4.5rem)]">
        {!fetching && !documentations.length && (
          <div className="flex flex-col items-center justify-center w-full py-32">
            <img className="w-96 h-auto" src="/undraw_add_files.svg" />
            <Link
              className="mt-12 px-4 py-2 rounded-lg border border-teal-500 text-teal-500 hover:opacity-50 transition-all duration-300"
              href={"/create"}
            >
              Create documentation
            </Link>
          </div>
        )}

        {!fetching && documentations.length > 0 && (
          <section className="flex flex-col gap-6 py-12">
            {documentations.map((documentation, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-1 md:flex-row"
              >
                <Link
                  href={`/documentation/${documentation.slug}`}
                  key={documentation.slug}
                  className="group p-4 border shadow-lg rounded-md hover:bg-[rgba(20,184,166,0.1)] hover:shadow-xl transition-colors duration-300 w-full"
                >
                  <div className="flex-1 flex gap-4 w-full">
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
                    <h3 className="text-xl font-bold md:2xl w-full">
                      {documentation.title}
                    </h3>
                  </div>
                  <p className="mt-4 w-full">{documentation.description}</p>
                </Link>

                {/* Actions */}
                <div className="flex gap-1 mt-2 md:flex-col md:mt-0">
                  <Link
                    href={`/update/${documentation.slug}`}
                    className="cursor-pointer flex items-center justify-center border border-teal-500 rounded-md px-2 py-1 text-teal-500 hover:text-gray-50 hover:bg-teal-500 transition-color duration-300"
                  >
                    <MdEditDocument /> <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteDocumentation(documentation.id)}
                    className="flex items-center justify-center border border-red-500 rounded-md px-2 py-1 text-red-500 hover:text-gray-50 hover:bg-red-500 transition-color duration-300"
                  >
                    <TiDocumentDelete className="text-lg" /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
