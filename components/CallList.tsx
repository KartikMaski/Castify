'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To capture error messages

  // Helper function to fetch recordings with retry logic to handle rate limits
  const fetchRecordings = async (retryCount = 0): Promise<void> => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second
  
    try {
      const callData = await Promise.all(
        callRecordings?.map((stream) => stream.queryRecordings()) ?? []
      );
  
      const filteredRecordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);
  
      setRecordings(filteredRecordings);
    } catch (error: any) {
      if (error.code === 9 && retryCount < MAX_RETRIES) {
        console.warn(`Rate limit hit. Retrying in ${RETRY_DELAY}ms...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return fetchRecordings(retryCount + 1);
      } else {
        setErrorMessage('Failed to fetch recordings. Please try again later.');
        console.error('Error fetching recordings:', error);
      }
    }
  };
  

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Streams';
      case 'upcoming':
        return 'No Upcoming Streams';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {errorMessage ? (
        <h1 className="text-2xl font-bold text-red-500">{errorMessage}</h1>
      ) : calls && calls.length > 0 ? (
        calls.map((stream: Call | CallRecording) => (
          <MeetingCard
            key={(stream as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            title={
              (stream as Call).state?.custom?.description ||
              (stream as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (stream as Call).state?.startsAt?.toLocaleString() ||
              (stream as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (stream as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/stream/${(stream as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(stream as CallRecording).url}`)
                : () => router.push(`/stream/${(stream as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
