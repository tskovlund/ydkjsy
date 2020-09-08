const dayStart = "07:30";
const dayEnd = "17:45";

function parseTime(time) {
  return time.split(":").map((t) => Number(t));
}

function scheduleMeeting(startTime, durationMinutes) {
  const [dayStartHours, dayStartMinutes] = parseTime(dayStart);
  const [dayEndHours, dayEndMinutes] = parseTime(dayEnd);
  const [startHours, startMinutes] = parseTime(startTime);

  const endHours =
    startHours + Math.floor((startMinutes + durationMinutes) / 60);
  const endMinutes = (startMinutes + durationMinutes) % 60;

  return (
    (dayStartHours < startHours ||
      (dayStartHours == startHours && dayStartMinutes <= startMinutes)) &&
    (endHours < dayEndHours ||
      (endHours == dayEndHours && endMinutes <= dayEndMinutes))
  );
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false
