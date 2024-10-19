import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen w-screen font-[family-name:var(--font-lato)]">
      <main className="flex flex-col justify-center">
        <div className="flex justify-between w-full p-20">
          <Image
            src={'/logos/jewel(black).svg'}
            alt="Jewel logo"
            width={132}
            height={66}
            priority
          />
          <nav className="flex gap-4">
            <Button variant="ghost" className="p-4" asChild><Link href="/signup" className="text-jewelBlack">About</Link></Button>
            <Button variant="ghost" className="p-4" asChild><Link href="/signup" className="text-jewelBlack">Suggestions</Link></Button>
            <Button variant="ghost" className="p-4" asChild><Link href="/signup" className="text-jewelBlack">FAQ</Link></Button>
            <Button asChild className="p-4 text-jewelBlack"><Link href="/signup">Log In</Link></Button>
          </nav>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col pb-20">
          <div className="text-6xl text-jewelBlack font-bold text-center mb-6">Unlock the Endless Possibilities of Journaling</div>
          <div className="text-center mb-6">Our journaling tool helps you reflect, grow, and achieve your goals with personalized prompts and AI-driven feedback. Gain valuable insights into your journey of self-improvement.</div>
          <Link href="/signup" className="mx-auto"><Button className="p-6 text-jewelBlack">Start Journaling Now</Button></Link>
        </div>

        <div className="w-screen h-24 bg-jewelBlack rounded-halfEllipse border-jewelPrimary"></div>

        <div className="bg-jewelBlack text-jewelWhite pb-20">
          <div className="text-2xl text-center font-semibold pb-8">How it Works</div>
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-8 pb-20">
            <Card className="w-64 p-10">
              <span className="rounded p-1 mr-2 bg-jewelPrimary">1</span><span className="rounded p-1 bg-jewelPrimary">Sign Up</span>
              <div>Create your account in minutes and embark on your journaling journey.</div>
            </Card>
            <Card className="w-64 p-10">
              <span className="rounded p-1 mr-2 bg-jewelPrimary">2</span><span className="rounded p-1 bg-jewelPrimary">Set your Goals</span>
              <div>Choose personalized goals to tailor your journaling experience.</div>
            </Card>
            <Card className="w-64 p-10">
              <span className="rounded p-1 mr-2 bg-jewelPrimary">3</span><span className="rounded p-1 bg-jewelPrimary">Reflect & Write</span>
              <div>Use our prompts to log your daily achievements and challenges.</div>
            </Card>
            <Card className="w-64 p-10">
              <span className="rounded p-1 mr-2 bg-jewelPrimary">4</span><span className="rounded p-1 bg-jewelPrimary">Receive Insights</span>
              <div>Get AI-generated feedback and summaries to help you track your growth.</div>
            </Card>
            <Card className="w-64 p-10">
              <span className="rounded p-1 mr-2 bg-jewelPrimary">5</span><span className="rounded p-1 bg-jewelPrimary">Improve & Achieve</span>
              <div>Regularly revisit your insights and continue your journey of self-improvement.</div>
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
            <Button asChild className="p-6 text-jewelBlack"><Link href="/signup">Start Journaling Now</Link></Button>
          </div>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-between bg-jewelBlack p-20">
        <Image
          src={'/logos/jewel(White).svg'}
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
