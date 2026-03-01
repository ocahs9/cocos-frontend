const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
const DAYS_IN_MONTH = 30;

export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / SECONDS_IN_MINUTE);
}

export function secondsToDays(seconds: number): number {
  return Math.floor(seconds / SECONDS_IN_DAY);
}

export function secondsToMonths(seconds: number): number {
  const days = Math.floor(seconds / SECONDS_IN_DAY);
  return Math.floor(days / DAYS_IN_MONTH);
}

export function formatJustNow(): string {
  return "방금 전";
}

export function formatMinutesAgo(minutes: number): string {
  if (minutes <= 0) return formatJustNow();
  return `${minutes}분 전`;
}

export function formatDaysAgo(days: number): string {
  if (days <= 0) return "오늘";
  return `${days}일 전`;
}

export function formatMonthsAgo(days: number): string {
  const months = Math.floor(days / DAYS_IN_MONTH);
  return `${Math.max(1, months)}개월 전`;
}

export function formatAgoFromSeconds(seconds: number): string {
  if (seconds < SECONDS_IN_MINUTE) {
    return formatJustNow();
  }

  if (seconds < SECONDS_IN_HOUR) {
    const minutes = secondsToMinutes(seconds);
    return formatMinutesAgo(minutes);
  }

  if (seconds < SECONDS_IN_DAY) {
    return "오늘";
  }

  const days = secondsToDays(seconds);

  if (days < DAYS_IN_MONTH) {
    return formatDaysAgo(days);
  }

  return formatMonthsAgo(days);
}
