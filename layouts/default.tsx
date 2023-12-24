import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Head />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/siddhartha-up80"
          title="siddhartha's github"
        >
          <span className="text-default-600">Visit: </span>
          <span className="text-primary">My Github</span>
        </Link>
      </footer>
    </div>
  );
}
