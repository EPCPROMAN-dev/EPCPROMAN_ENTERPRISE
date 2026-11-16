
export type CalendarEventType =
    | "event"
    | "meeting"
    | "appointment"
    | "action";

export type RecurrenceType =
    | "never"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly";

export interface CalendarEvent {
    id: string;
    title: string;
    type: CalendarEventType;

    start: string;
    end?: string;

    isAllDay: boolean;

    locationId?: string;
    recurrence: RecurrenceType;

    description?: string;
    attendees?: string[];
    agenda?: string;

    sendMail?: boolean;

    status: "scheduled" | "completed" | "cancelled";

    createdBy: string;
}
