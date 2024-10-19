import Image from 'next/image';

export const Welcome = ({firstName}: {firstName: string}) => {
  return (
    <div className="font-[family-name:var(--font-lato)]">
      <main className="flex flex-col justify-center">
        <div className="flex justify-between w-full p-20">
          <h4>Dear {firstName}</h4>
          <br />

          <p>Welcome to the Jewel. Your home for work mindfulness. We hope you enjoy our product.</p>
          <br />

          <h5>Thank you</h5>

          <h5>Jewel Team</h5>
        </div>
      </main>
    </div>
  );
};