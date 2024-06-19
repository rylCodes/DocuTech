import Hero from "@/components/ui/Hero";
import CallToAction from "@/components/ui/CallToAction";
import Overview from "@/components/ui/Overview";
import { useState } from "react";
import Meta from "@/components/Meta";
import axios from "axios";
import { server } from "@/config";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

let isFetching = false;

export default function Home(props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentations, setDocumentations] = useState(props.documentations);
  const { isAuthenticated } = useAuth();

  async function onSearchDocumentation() {
    if (query.trim() === "") {
      setDocumentations(props.documentations);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${server}/api/documentations`, {
        params: { query },
      });
      setDocumentations(response.data);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Meta />
      <Hero
        onSearchDocumentation={onSearchDocumentation}
        query={query}
        setQuery={setQuery}
      />
      <div className="container max-w-7xl mx-auto px-4">
        {(!isFetching || !loading) && documentations.length > 0 ? (
          <Overview documentations={documentations} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full my-32">
            <img className="w-96 h-auto" src="/undraw_add_files.svg" />
            <Link
              className="mt-12 px-4 py-2 rounded-lg border border-teal-500 text-teal-500 hover:opacity-50 transition-all duration-300"
              href={"/create"}
            >
              Create documentation
            </Link>
          </div>
        )}
      </div>
      <CallToAction isAuthenticated={isAuthenticated} />
    </div>
  );
}

export async function getStaticProps() {
  isFetching = true;
  try {
    const response = await axios.get(server + "/api/documentations");
    const documentations = await response.data;

    return {
      props: {
        documentations: documentations,
      },
    };
  } catch (error) {
    console.error("Failed to fetch documentations", error);
    return {
      props: {
        documentations: [],
      },
    };
  } finally {
    isFetching = false;
  }
}
