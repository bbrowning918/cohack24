import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props = {
    firstName: string,
    startDate?: string
    endDate?: string
    selectedGoal?: string,
    goalImportance?: string,
    tasksCompleted?: string,
    challengesFaced?: string,
    timeManagement?: string,
    collaboration?: string,
    suggestions?: string,
    emotionalWellbeing?: string,
    conclusion?: string
};

export const Feedback = ({
    firstName,
    startDate = 'Oct 12',
    endDate = 'Oct 19',
    selectedGoal = 'Improve My Daily Productivity',
    goalImportance = 'This goal helps you enhance your efficiency and achieve your daily tasks more effectively.',
    tasksCompleted = '[A list of top tasks during this period]',
    challengesFaced = '[Overview of notable changes]',
    timeManagement = '[Insights on how time was allocated]',
    collaboration = '[Feedback on any team interactions]',
    suggestions = '[Personalized recommendations tied to selectedGoal]',
    emotionalWellbeing = '[Acknowledge how the user felt during the week]',
    conclusion = '[Wrap up of the week insights]'
}: Props) => {
    return (
        <div className="font-[family-name:var(--font-lato)]">
            <div className="flex flex-col justify-center w-full p-20">
                <Image
                    className="pb-8"
                    src={'/logos/jewel(black).svg'}
                    alt="Jewel logo"
                    width={132}
                    height={66}
                    priority
                />
                <div className="pb-4">Dear {firstName},</div>
                <div className="pb-4">This summary covers your progress from {startDate} to {endDate}. <br /> Keep up the good work!</div>
                <div className="pb-4">Before we dive into it, lets look over the goal you set for yourself:</div>
                <ul className="list-disc pb-4 ml-5">
                    <li>
                        <div className="flex">
                            <div className="pr-2">Selected Goal:</div>
                            <div>{selectedGoal}</div>
                        </div>
                    </li>
                    <li>
                        <div className="flex">
                            <div className="pr-2">Importance:</div>
                            <div>{goalImportance}</div>
                        </div>
                    </li>
                </ul>
                <div className="text-2xl text-jewelSecondary pb-4">Key Insights</div>

                <div className="text-jewelSecondary pb-2">Tasks Completed</div>
                <div className="pb-4">{tasksCompleted}</div>

                <div className="text-jewelSecondary pb-2">Challenges Faced</div>
                <div className="pb-4">{challengesFaced}</div>

                <div className="text-jewelSecondary pb-2">Time Management Patterns</div>
                <div className="pb-4">{timeManagement}</div>

                <div className="text-jewelSecondary pb-2">Collaboration & Support</div>
                <div className="pb-4">{collaboration}</div>

                <div className="text-jewelSecondary pb-2">Suggestions for Improvement</div>
                <div className="pb-4">{suggestions}</div>

                <div className="text-jewelSecondary pb-2">Emotional Wellbeing</div>
                <div className="pb-4">{emotionalWellbeing}</div>

                <div className="text-jewelSecondary pb-2">Conclusion</div>
                <div className="pb-4">{conclusion}</div>

                <div className="font-bold text-center m-4">What do you feel about this feedback?</div>
                <div className="flex justify-center gap-4 pb-4">
                    <div className="text-center">
                        <div>&#x1F616;</div>
                        <div className="text-jewelSecondary font-semibold">Terrible</div>
                    </div>
                    <div className="text-center">
                        <div>&#x1F61F;</div>
                        <div className="text-jewelSecondary font-semibold">Not So Good</div>
                    </div>
                    <div className="text-center">
                        <div>&#x1F610;</div>
                        <div className="text-jewelSecondary font-semibold">Indifferent</div>
                    </div>
                    <div className="text-center">
                        <div>&#x1F604;</div>
                        <div className="text-jewelSecondary font-semibold">Looks Good</div>
                    </div>
                    <div className="text-center">
                        <div>&#x1F60D;</div>
                        <div className="text-jewelSecondary font-semibold">Excellent</div>
                    </div>
                </div>

                <div className="font-bold text-center m-4 pb-4">Is there anything you&#39;d like to add or modify in this summary?<br /> Your thoughts are valuable to
                    help refine future reflections!
                </div>
                <Button className="p-4">Give us your Feedback!</Button>
            </div>
            <div className="flex gap-6 flex-wrap items-center justify-between bg-jewelBlack p-20">
                <Image
                    src={'/logos/jewel(White).svg'}
                    alt="Jewel logo"
                    width={132}
                    height={66}
                    priority
                />
                <div className="text-jewelWhite">© 2024</div>
            </div>
        </div>
    );
};