import { UserButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server'
import Link from "next/link";
import FileUpload from "@/components/FileUpload";
import { BackgroundLines } from "@/components/ui/background-lines";
import { navigateToChat } from '@/app/actions/handleRedirect'
import { BorderBeam } from "@/components/ui/border-beam";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default async function Home() {
  const { userId } = auth();

  const words = [
    {
      text: "Turn"
    },
    {
      text: "your"
    },
    {
      text: "PDFs"
    },
    {
      text: "into"
    },
    {
      text: "conversations.",
      className: "text-indigo-600 dark:text-indigo-600"
    }
  ]

  return (

    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundLines className="absolute h-screen inset-0 z-0">

        <div className="relative z-10 flex items-start justify-center w-full min-h-screen px-4 py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-5xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter dark:text-gray-200">
                  <span className="hidden sm:inline">
                    <TypewriterEffectSmooth words={words} />
                  </span>
                  <span className="sm:hidden">Turn your PDFs into</span>{' '}
                  <span className="sm:hidden text-indigo-600">conversations</span>
                </h1>
                <UserButton afterSwitchSessionUrl="/" />
              </div>
              <p className="max-w-[40rem] dark:text-gray-400 text-slate-800 mb-4 text-sm sm:text-base">
                Transform your PDF documents into interactive chat experiences. Documind allows you to ask questions, get instant answers, and explore content like never before.
              </p>
              <div className="flex mb-4">
                {userId && (
                  <form action={navigateToChat}>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm bg-indigo-600">
                      Go to chats
                    </button>
                  </form>
                )}
              </div>
              <div className="w-full flex justify-center">
                {userId ? (
                  <FileUpload />
                ) : (
                  <div className="gap-4 w-full flex flex-col items-center justify-center">

                    <Link className="whitespace-nowrap" href="/sign-in">
                      <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-xs md:text-sm font-medium text-white backdrop-blur-3xl">
                          Login to get started 🔑
                        </span>
                      </button>
                    </Link>

                    <div className="relative w-full max-w-3xl mt-8 rounded-md border-none p-1">
                      <img src="/heropdf.png" alt="Hero image" className="rounded-md w-full h-auto" />
                      <BorderBeam borderWidth={2} size={250} duration={12} delay={9} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}