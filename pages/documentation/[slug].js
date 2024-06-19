import { useMemo } from "react";
import axios from "axios";
import { server } from "@/config";
import DocumentationDetail from "@/components/ui/DocumentationDetail";
import Head from "next/head";
import Meta from "@/components/Meta";
import SideBar from "@/components/ui/SideBar";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";

export default function Documentation(props) {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const { isSideBarOpen, toggleSidebar } = useSidebar();

  const pageContent = useMemo(() => {
    return (
      props.documentation && (
        <div className="flex-1">
          <DocumentationDetail documentation={props.documentation} />
        </div>
      )
    );
  }, [props.documentation]);

  return (
    <div className="flex w-full min-h-svh px-10 py-6 lg:py-8 lg:px-12">
      <Meta subTitle={props.documentation && props.documentation.title} />
      {/* SideBar */}
      <aside className="fixed top-[4.5rem] left-0 w-80 h-full">
        <SideBar
          isAuthenticated={isAuthenticated}
          isSideBarOpen={isSideBarOpen}
          toggleSidebar={toggleSidebar}
        />
      </aside>

      {/* Hollow Sidebar */}
      <div className="hidden w-80 h-full lg:block"></div>

      {/* Page Content */}
      {pageContent || <p>Loading...</p>}
    </div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  try {
    const response = await axios.get(
      `${server}/api/documentations/slug/${slug}`
    );
    const documentation = response.data.data;
    return {
      props: {
        documentation,
      },
    };
  } catch (error) {
    console.error("Failed to fetch documentation", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(`${server}/api/documentations`);
    const documentations = response.data;

    if (!response.ok) {
      console.error("Failed to fetch documentation detail");
      return {
        paths: [],
        fallback: false,
      };
    }

    const slugs = documentations.map((documentation) => documentation.slug);

    const paths = slugs.map((slug) => ({
      params: {
        slug: slug.toString(),
      },
    }));

    return {
      paths,
      fallback: true, // true if you want to enable ISR (Incremental Static Regeneration)
    };
  } catch (error) {
    console.error("Failed to fetch documentations", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
