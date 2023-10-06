import useBreadcrubms from "../../../hooks/useBreadcrumbs";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const BreadcrumbsComponent = () => {
  const { breadcrumbs } = useBreadcrubms();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {breadcrumbs.map((item) =>
          item.last || item.disabled ? (
            <Typography
              key={item.value}
              className="uppercase"
              color={item.last ? "text.primary" : "inherit"}
              fontWeight={item.last ? 500 : 400}
            >
              {item.alt ?? item.value}
            </Typography>
          ) : (
            <Link
              key={item.value}
              className="uppercase hover:underline"
              to={item.route}
            >
              {item.alt ?? item.value}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
