import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  showIcon?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, showIcon = true }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
  const isUrgent = !isExpired && (timeLeft.days === 0 || (timeLeft.days === 1 && timeLeft.hours < 12));

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
        {showIcon && <Clock className="w-4 h-4" />}
        <span className="font-semibold">Deadline Passed</span>
      </div>
    );
  }

  const TimeBlock = ({ value, label, urgent }: { value: number; label: string; urgent: boolean }) => (
    <div className={`text-center px-3 py-2 rounded-xl ${
      urgent
        ? 'bg-red-100 dark:bg-red-900/30'
        : 'bg-slate-100 dark:bg-slate-700'
    }`}>
      <div className={`text-lg font-bold tabular-nums ${
        urgent
          ? 'text-red-600 dark:text-red-400'
          : 'text-slate-800 dark:text-white'
      }`}>
        {String(value).padStart(2, '0')}
      </div>
      <div className={`text-[10px] uppercase font-medium ${
        urgent
          ? 'text-red-500 dark:text-red-400'
          : 'text-slate-500 dark:text-slate-400'
      }`}>
        {label}
      </div>
    </div>
  );

  return (
    <div className={`flex items-center gap-2 ${isUrgent ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`}>
      {showIcon && (
        <div className={`p-2 rounded-lg ${
          isUrgent
            ? 'bg-red-100 dark:bg-red-900/30'
            : 'bg-blue-100 dark:bg-blue-900/30'
        }`}>
          <Clock className={`w-4 h-4 ${
            isUrgent
              ? 'text-red-500 dark:text-red-400'
              : 'text-blue-500 dark:text-blue-400'
          }`} />
        </div>
      )}
      <div className="flex gap-1 font-mono">
        {timeLeft.days > 0 && (
          <TimeBlock value={timeLeft.days} label="d" urgent={isUrgent} />
        )}
        <TimeBlock value={timeLeft.hours} label="h" urgent={isUrgent} />
        <TimeBlock value={timeLeft.minutes} label="m" urgent={isUrgent} />
        <TimeBlock value={timeLeft.seconds} label="s" urgent={isUrgent} />
      </div>
    </div>
  );
};

export default CountdownTimer;
