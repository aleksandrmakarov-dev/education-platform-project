import { Button } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.log(error);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-3">
      <h1 className="text-3xl font-semibold">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button href="/" variant="contained" disableElevation>
        Home
      </Button>
    </div>
  );
}
