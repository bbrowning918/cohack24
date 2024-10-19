import Image from 'next/image';

export const Feedback = ({firstName}: {firstName: string}) => {
    return (
        <div className="font-[family-name:var(--font-lato)]">
            <main className="flex flex-col justify-center">
                <div className="flex justify-between w-full p-20">
                    <Image
                        src={'/logos/jewel(black).svg'}
                        alt="Jewel logo"
                        width={132}
                        height={66}
                        priority
                    />
                    Dear {firstName}
                </div>
            </main>
        </div>
    );
};