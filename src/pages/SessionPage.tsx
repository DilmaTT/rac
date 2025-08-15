import { useState } from 'react';
import SessionManager from '@/components/SessionManager';
import PostSessionModal from '@/components/PostSessionModal';
import type { Session } from '@/types';

const SessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedSession, setCompletedSession] = useState<Session | null>(null);

  const handleSessionComplete = (session: Session) => {
    setCompletedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCompletedSession(null);
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SessionManager onSessionComplete={handleSessionComplete} />
          </div>
        </div>
      </div>
      <PostSessionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        session={completedSession}
      />
    </>
  );
};

export default SessionPage;
