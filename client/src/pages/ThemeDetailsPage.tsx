import { useParams } from "react-router-dom";

export default function ThemeDetailsPage() {
  const { themeId } = useParams();

  return (
    <div>
      <p>{themeId}</p>
    </div>
  );
}
