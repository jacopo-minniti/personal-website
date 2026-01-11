import Image from "next/image";
import TerminalCard from "@/components/TerminalCard";
import NewsBoard from "@/components/NewsBoard";
import { QuotesBox, GalleryViewer } from "@/components/HomeWidgets";
import BioCard from "@/components/BioCard";

export default function Home() {
  return (
    <div className="min-h-screen pt-12 flex flex-col justify-center pb-12">

      {/* Introduction */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-stretch">

        {/* Profile Card */}
        <div className="md:col-span-5 flex">
          <TerminalCard title="user_profile.jpg" className="h-full">
            <div className="relative w-full h-full flex-1">
              <Image
                src="/profile.jpg"
                alt="Jacopo Minniti"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </TerminalCard>
        </div>

        {/* Bio / Terminal Output */}
        <div className="md:col-span-7 flex">
          <TerminalCard title="bio.md" className="h-full">
            <BioCard />
          </TerminalCard>
        </div>

      </div>

      {/* Widgets Row (Quotes + Gallery) */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 items-stretch">
        <div className="md:col-span-4">
          <QuotesBox />
        </div>
        <div className="md:col-span-8 overflow-hidden">
          <GalleryViewer />
        </div>
      </div>

      {/* News Board */}
      <div className="max-w-5xl mx-auto w-full mb-8">
        <NewsBoard />
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full mt-12 text-center text-xs text-muted font-mono opacity-50">
        <p>© {new Date().getFullYear()} Jacopo Minniti. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
