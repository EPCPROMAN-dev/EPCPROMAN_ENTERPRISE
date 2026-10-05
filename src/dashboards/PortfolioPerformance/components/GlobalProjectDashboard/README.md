# Global Project Dashboard - React + TypeScript

This is a simple React + TypeScript conversion of the supplied HTML/JavaScript dashboard.

## Files

- `GlobalProjectDashboard.tsx` - React UI + amCharts map setup
- `GlobalProjectDashboard.css` - dashboard styling
- `projectLocations.ts` - dashboard data
- `globalProjectDashboard.types.ts` - simple TypeScript types

## Install

The project needs amCharts 4 packages:

```bash
npm install @amcharts/amcharts4 @amcharts/amcharts4-geodata
```

## Use

```tsx
import GlobalProjectDashboard from "./components/GlobalProjectDashboard/GlobalProjectDashboard";

function App() {
    return <GlobalProjectDashboard />;
}

export default App;
```

## React concepts used

- `useState` - stores selected location and search text.
- `useRef` - stores the amCharts map instance and map container.
- `useEffect` - creates the map after the React component appears and disposes it when the component is removed.
- Normal functions - handle color, marker size, close, and project rendering.
- JSX - replaces the old HTML.
- React state - replaces `document.getElementById(...).textContent` and `style.display`.

No classes, no Redux, no Context, no advanced TypeScript, and no AI-specific logic.
