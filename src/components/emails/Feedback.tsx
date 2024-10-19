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
                    src={'/logos/jewel(black).svg'}
                    alt="Jewel logo"
                    width={132}
                    height={66}
                    priority
                />
                <div>Dear {firstName},</div>
                <div>This summary covers your progress from {startDate} to {endDate}. Keep up the good work!</div>
                <div>Before we dive into it, lets look over the goal you set for yourself:</div>
                <ul className="list-disc">
                    <li>Selected Goal: {selectedGoal}</li>
                    <li>Importance: {goalImportance}</li>
                </ul>
                <div className="text-2xl text-jewelSecondary pb-4">Key Insights</div>

                <div className="text-jewelSecondary pb-2">Tasks Completed</div>
                <div>{tasksCompleted}</div>

                <div className="text-jewelSecondary pb-2">Challenges Faced</div>
                <div>{challengesFaced}</div>

                <div className="text-jewelSecondary pb-2">Time Management Patterns</div>
                <div>{timeManagement}</div>

                <div className="text-jewelSecondary pb-2">Collaboration & Support</div>
                <div>{collaboration}</div>

                <div className="text-jewelSecondary pb-2">Suggestions for Improvement</div>
                <div>{suggestions}</div>

                <div className="text-jewelSecondary pb-2">Emotional Wellbeing</div>
                <div>{emotionalWellbeing}</div>

                <div className="text-jewelSecondary pb-2">Conclusion</div>
                <div>{conclusion}</div>

                <div>What do you feel about this feedback?</div>
                <span>&#x1F616; Terrible</span>
                <span>&#x1F61F; Not So Good</span>
                <span>&#x1F610; Indifferent</span>
                <span>&#x1F604; Looks Good</span>
                <span>&#x1F60D; Excellent</span>

                <div>Is there anything you&#39;d like to add or modify in this summary? Your thoughts are valuable to
                    help refine future reflections!
                </div>
                <Button>Give us your Feedback!</Button>
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