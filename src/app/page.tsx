import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const HomeCard = ({stepNum, stepText, description, imgSrc}) => {
  return (
    <Card className="w-96 p-10">
      <span className="font-semibold rounded p-1 mr-2 bg-jewelPrimary">{stepNum}</span><span className="font-semibold rounded p-1 bg-jewelPrimary">{stepText}</span>
      <div>{description}</div>
      <Image
        src={imgSrc}
        alt="alt :)"
        width={128}
        height={128}
        priority
      />
    </Card>
  );
};

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
          <div className="text-6xl text-jewelBlack font-extrabold text-center mb-6">Unlock the Endless Possibilities of Journaling</div>
          <div className="text-center mb-6">Our journaling tool helps you reflect, grow, and achieve your goals with personalized prompts and AI-driven feedback. Gain valuable insights into your journey of self-improvement.</div>
          <Link href="/signup" className="mx-auto"><Button className="p-6 text-jewelBlack">Start Journaling Now</Button></Link>
        </div>

        <Image
          src={'/home/Elipse.svg'}
          alt="alt :)"
          width={1920}
          height={1080}
          priority
        />

        <div className="bg-jewelBlack text-jewelWhite pb-20">
          <div className="text-2xl text-center font-bold pb-8">How it Works</div>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 pb-20">
            <HomeCard
              stepNum={1}
              stepText={'Sign Up'}
              description={'Create your account in minutes and embark on your journaling journey.'}
              imgSrc={'/home/Sign Up.svg'}
            />
            <HomeCard
              stepNum={2}
              stepText={'Set your Goals'}
              description={'Choose personalized goals to tailor your journaling experience.'}
              imgSrc={'/home/Set Your Goals.svg'}
            />
            <HomeCard
              stepNum={3}
              stepText={'Reflect & Write'}
              description={'Use our prompts to log your daily achievements and challenges.'}
              imgSrc={'/home/Reflect and Write.svg'}
            />
            <HomeCard
              stepNum={4}
              stepText={'Receive Insights'}
              description={'Get AI-generated feedback and summaries to help you track your growth.'}
              imgSrc={'/home/Receive Insights.svg'}
            />
            <HomeCard
              stepNum={5}
              stepText={'Improve & Achieve'}
              description={'Regularly revisit your insights and continue your journey of self-improvement.'}
              imgSrc={'/home/Improve and Achieve.svg'}
            />
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
