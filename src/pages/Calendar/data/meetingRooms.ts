
export interface MeetingRoom {
    id: string;
    name: string;
    capacity: number;
}

export const meetingRooms: MeetingRoom[] = [
    {
        id: "ROOM001",
        name: "Conference Room A",
        capacity: 10
    },
    {
        id: "ROOM002",
        name: "Conference Room B",
        capacity: 15
    },
    {
        id: "ROOM003",
        name: "Meeting Room 1",
        capacity: 5
    }
];
