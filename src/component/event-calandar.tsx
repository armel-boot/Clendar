"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/events.module.css";

interface Event {
  id: number;
  start: string;
  duration: number;
  end?: string;
  column?: number;
  totalColumns?: number;
}

/**
 * Calculates the end time of each event based on its start time and duration.
 * @param events - List of events with their start times and durations.
 * @returns List of events with added end times.
 */
const calculateEndTimes = (events: Event[]): Event[] => {
  return events.map((event) => {
    const startTime = new Date(`1970-01-01T${event.start}:00`);
    const endTime = new Date(startTime.getTime() + event.duration * 60000);
    return { ...event, end: endTime.toTimeString().slice(0, 5) };
  });
};

/**
 * Finds groups of overlapping events.
 * @param events - List of events with their start and end times.
 * @returns List of groups of overlapping events.
 */
const findOverlappingGroups = (events: Event[]): Event[][] => {
  const groups: Event[][] = [];

  for (let i = 0; i < events.length; i++) {
    const currentEvent = events[i];
    let foundGroup = false;

    for (let j = 0; j < groups.length; j++) {
      const group = groups[j];
      if (
        group.some(
          (event) =>
            (event.start <= currentEvent.start &&
              event.end! > currentEvent.start) ||
            (event.start < currentEvent.end! &&
              event.end! >= currentEvent.end!) ||
            (event.start >= currentEvent.start &&
              event.end! <= currentEvent.end!)
        )
      ) {
        group.push(currentEvent);
        foundGroup = true;
        break;
      }
    }

    if (!foundGroup) {
      groups.push([currentEvent]);
    }
  }

  return groups;
};

/**
 * Assigns a column to each event within its overlapping groups.
 * @param groups - List of groups of overlapping events.
 * @returns List of events with added column information.
 */
const assignColumns = (groups: Event[][]): Event[] => {
  const eventsWithColumns: Event[] = [];

  groups.forEach((group) => {
    group.sort(
      (a, b) =>
        new Date(`1970-01-01T${a.start}:00`).getTime() -
        new Date(`1970-01-01T${b.start}:00`).getTime()
    );
    group.forEach((event, index) => {
      event.column = index;
      event.totalColumns = group.length;
      eventsWithColumns.push(event);
    });
  });

  return eventsWithColumns;
};

const EventsCalendar: React.FC = () => {
  const [processedEvents, setProcessedEvents] = useState<Event[]>([]);
  /**
   * Processes the events by fetching the data, calculating end times,
   * finding overlapping groups, and assigning columns.
   */
  const processEvents = async () => {
    const res = await fetch("/events.json");
    if (!res.ok) {
      console.error(`Failed to fetch events: ${res.statusText}`);
      return;
    }
    const eventsData: Event[] = await res.json();
    const eventsWithEndTimes = calculateEndTimes(eventsData);
    const overlappingGroups = findOverlappingGroups(eventsWithEndTimes);
    const eventsWithColumns = assignColumns(overlappingGroups);
    setProcessedEvents(eventsWithColumns);
  };

  useEffect(() => {
    processEvents();
    const handleResize = () => processEvents();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hours = [];
  for (let hour = 9; hour <= 21; hour++) {
    for (let half = 0; half < 60; half += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${half
        .toString()
        .padStart(2, "0")}`;
      hours.push(time);
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.hoursColumn}>
        {hours.map((hour) => (
          <div key={hour} className={styles.hourRow}>
            {hour}
          </div>
        ))}
      </div>
      <div className={styles.calendar}>
        {processedEvents.map((event) => {
          const startTime = new Date(`1970-01-01T${event.start}:00`);
          const endTime = new Date(`1970-01-01T${event.end}:00`);
          const startMinutes =
            (startTime.getHours() - 9) * 60 + startTime.getMinutes(); // Calculate minutes since 09:00
          const endMinutes =
            (endTime.getHours() - 9) * 60 + endTime.getMinutes(); // Calculate minutes until 21:00
          const totalMinutes = 12 * 60; // From 09:00 to 21:00
          const widthPercentage = 100 / event.totalColumns! - 2; // Subtract margin space
          const leftPercentage = event.column! * (widthPercentage + 2); // Add margin space

          return (
            <div
              key={event.id}
              className={styles.event}
              style={{
                top: `${(startMinutes / totalMinutes) * 100}%`,
                height: `${
                  ((endMinutes - startMinutes) / totalMinutes) * 100
                }%`,
                left: `${leftPercentage}%`,
                width: `${widthPercentage}%`,
                marginRight: "2%", // Adds space between events
              }}
            >
              {`ID: ${event.id}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsCalendar;
