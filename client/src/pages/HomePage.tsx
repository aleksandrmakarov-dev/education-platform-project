import { Button } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

const HomePage = () => {
  const { push } = useSnackbar();

  const onPushMessage = () => {
    push({ message: `New message ${Date.now()}`, type: "info" });
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <h1 className="text-2xl font-semibold">Home page</h1>
      <Button onClick={onPushMessage} type="button">
        Push message
      </Button>
    </div>
  );
};

export default HomePage;
