import "@/styles/globals.css";
import Layout from "@/components/ui/Layout";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SidebarProvider>
    </AuthProvider>
  );
}
