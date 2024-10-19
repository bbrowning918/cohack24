import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import jewelLogo from './Jewel Logo (Black).svg'
import jewelLogoInverse from './Jewel Logo (White).svg'

export default function Home() {
  return (
    <div className="min-h-screen w-screen font-[family-name:var(--font-lato)]">
      <main className="flex flex-col justify-center">
        <div className="flex justify-between w-full p-20">
          <Image
            src={jewelLogo}
            alt="Jewel logo"
            width={132}
            height={66}
            priority
          />
          <nav className="flex gap-4">
            <Link href="/signup" className="text-jewelBlack">About</Link>
            <Link href="/signup" className="text-jewelBlack">Suggestions</Link>
            <Link href="/signup" className="text-jewelBlack">FAQ</Link>
            <Link href="/signup"><Button className="p-6 bg-jewelPrimary text-jewelBlack">Log In</Button></Link>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col pb-20">
          <div className="text-6xl text-jewelBlack font-bold text-center mb-6">Unlock the Endless Possibilities of Journaling</div>
          <div className="text-center mb-6">Our journaling tool helps you reflect, grow, and achieve your goals with personalized prompts and AI-driven feedback. Gain valuable insights into your journey of self-improvement.</div>
          <Link href="/signup" className="mx-auto"><Button className="p-6 bg-jewelPrimary text-jewelBlack">Start Journaling Now</Button></Link>
        </div>

        <div className="w-screen h-24 bg-jewelBlack rounded-halfEllipse border-jewelPrimary"></div>

        <div className="bg-jewelBlack text-jewelWhite flex flex-col pb-20">
          <div className="text-2xl text-center font-semibold pb-8">How it Works</div>
          <div className="columns-2 gap-8 mx-auto pb-20">
            <Card>
              <CardContent>
                Sign Up
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Set your Goals
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Reflect & Write
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Receive Insights
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                Improve & Achieve
              </CardContent>
            </Card>
          </div>

          <div className="w-1/3 mx-auto text-center">
            <div className="text-2xl font-semibold pb-8">Our Story</div>
            <div className="pb-4">In today&#39;s fast-paced world, it&#39;s easy to let daily achievements slip by unnoticed. Jewel was born from
              a simple belief: your work holds hidden gems-achievements, lessons, and moments of growth-that can shape
              your future success.
            </div>
            <div className="pb-4">Our AI-powered journal helps you mine those gems, turning everyday tasks into valuable insights, so you
              can see how far you&#39;ve come and where you need to go.
            </div>
            <Link href="/signup"><Button className="p-6 bg-jewelPrimary text-jewelBlack">Start Journaling Now</Button></Link>
          </div>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-between bg-jewelBlack p-20">
        <Image
            src={jewelLogoInverse}
          alt="Jewel logo"
          width={132}
          height={66}
          priority
        />
        <div className="text-jewelWhite">© 2024</div>
      </footer>
    </div>
  );
}
