
import {StandaloneWeekView} from '@mui/x-scheduler/week-view';

export default function WeeklyTimesheet() {
  return (
     <div style={{ display: "flex", height: "calc(100vh - 199px)" }}>
      <StandaloneWeekView
        // events={events}
        // resources={resources}
        // defaultVisibleDate={defaultVisibleDate}
        // onEventsChange={setEvents}
        // viewConfig={{ week: { startTime: 6, endTime: 22, initialScrollTime: 9 } }}
      />
    </div>
  );
}
