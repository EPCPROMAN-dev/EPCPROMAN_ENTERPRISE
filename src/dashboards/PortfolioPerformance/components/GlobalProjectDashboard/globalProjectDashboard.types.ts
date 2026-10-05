export type Project = {
    name: string;
    client: string;
    status: "Ongoing" | "Completed";
};

export type ProjectLocation = {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    ongoing: number;
    completed: number;
    projects: Project[];
};
