
import { useMatches, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface BreadcrumbHandle {
  breadcrumb?: string;
}

export default function ModuleBreadcrumb() {
  const matches = useMatches();
  const navigate = useNavigate();

  const breadcrumbs = matches
    .map((match) => {
      const handle = match.handle as BreadcrumbHandle | undefined;

      return handle?.breadcrumb
        ? {
            label: handle.breadcrumb,
            pathname: match.pathname,
          }
        : null;
    })
    .filter(
      (
        item
      ): item is { label: string; pathname: string } => item !== null
    );

  return (
    <nav className="module-breadcrumb" aria-label="Breadcrumb">
      <button
        type="button"
        className="module-breadcrumb-home"
        onClick={() => navigate("/for-you")}
        aria-label="Go to home"
        title="Home"
      >
        <HomeOutlinedIcon fontSize="small" />
      </button>

      {breadcrumbs.map((item, index) => (
        <span
          key={item.pathname}
          className="module-breadcrumb-part"
        >
          <ChevronRightIcon className="module-breadcrumb-separator" />

          {index === breadcrumbs.length - 1 ? (
            <span className="module-breadcrumb-current">
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              className="module-breadcrumb-link"
              onClick={() => navigate(item.pathname)}
            >
              {item.label}
            </button>
          )}
        </span>
      ))}
    </nav>
  );
}
