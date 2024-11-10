'use client';
import { useCall } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );
  }

  // Only show the Join Stream button
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Ready to Join Live Stream !</h1>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true); // Mark setup as complete after joining
        }}
      >
        Join Stream
      </Button>
    </div>
  );
};

export default MeetingSetup;
