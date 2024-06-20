import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import Meta from "@/components/Meta";
import Hero from "@/components/ui/Hero";
import CallToAction from "@/components/ui/CallToAction";
import Overview from "@/components/ui/Overview";
import { useAuth } from "../context/AuthContext";
import { server } from "@/config";

export default function Home(props) {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentations, setDocumentations] = useState(props.documentations);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastDocumentationElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadDocumentations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/api/documentations`, {
          params: { query, page, pageSize: 5 },
        });
        setDocumentations((prevDocs) => {
          return [...prevDocs, ...response.data.data];
        });
        setHasMore(response.data.data.length > 0);
      } catch (error) {
        console.error("Failed to fetch documentations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) {
      loadDocumentations();
    }
  }, [page, query]);

  const onSearchDocumentation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/api/documentations`, {
        params: { query, page: 1, pageSize: 5 },
      });
      setDocumentations(response.data.data);
      setPage(1);
      setHasMore(response.data.data.length > 0);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Meta />
      <Hero
        onSearchDocumentation={onSearchDocumentation}
        query={query}
        setQuery={setQuery}
      />
      <div className="container max-w-7xl mx-auto px-4 min-h-[75vh] py-12">
        <Overview
          documentations={documentations}
          lastDocumentationElementRef={lastDocumentationElementRef}
          loading={loading}
        />
      </div>
      <CallToAction isAuthenticated={isAuthenticated} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(`${server}/api/documentations`, {
      params: { page: 1, pageSize: 5 },
    });
    const documentations = await response.data.data;

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
  }
}
