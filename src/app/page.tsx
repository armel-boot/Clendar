"use client";

import EventsCalendar from "@/component/event-calandar";
import React from "react";
import "./globals.css";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Events Calendar</h1>
      <EventsCalendar />
    </div>
  );
};

export default Home;
