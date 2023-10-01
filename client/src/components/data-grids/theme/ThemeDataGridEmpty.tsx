import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const ThemeDataGridEmpty = () => (
  <div className="flex flex-col gap-0.5 items-center justify-center py-10">
    <SearchRoundedIcon sx={{ fontSize: 64 }} />
    <h5 className="text-lg">No themes was found.</h5>
    <p className="text-gray-600">
      Oops! Seems like there's<br></br>nothing in database yet
    </p>
  </div>
);

export default ThemeDataGridEmpty;
