import { Header } from "@/components/shared/header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Valencia",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense>
        <Header />
      </Suspense>
      <div className="flex-grow">{children}</div>
      <Footer />
    </main>
  );
}
