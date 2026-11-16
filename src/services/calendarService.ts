
import type { CalendarEvent } from "../pages/Calendar/types/calendar.types";

const STORAGE_KEY = "epcproman_calendar_events";

// Get all events
export const getEvents = (): CalendarEvent[] => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data) as CalendarEvent[];
    }

    return [];
};

// Save all events
export const saveEvents = (events: CalendarEvent[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

// Add new event
export const addEvent = (event: CalendarEvent) => {
    const events = getEvents();

    events.push(event);

    saveEvents(events);
};

// Update existing event
export const updateEvent = (updatedEvent: CalendarEvent) => {
    const events = getEvents();

    const updatedEvents = events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
    );

    saveEvents(updatedEvents);
};

// Delete event
export const deleteEvent = (id: string) => {
    const events = getEvents();

    const updatedEvents = events.filter(
        (event) => event.id !== id
    );

    saveEvents(updatedEvents);
};
