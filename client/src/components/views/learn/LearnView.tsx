import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ThemesService from "../../../services/themes.service";
import { queryNames } from "../../../lib/constants";
import PracticeCard from "../../cards/word/practice-cards/PracticeCard";
import { Button } from "@mui/material";

interface LearnViewProps {
  themeId: string;
}

const LearnView: React.FC<LearnViewProps> = ({ themeId }) => {
  const { data, isLoading, isError, isRefetching } = useQuery({
    queryKey: [queryNames.word.list],
    queryFn: async () => {
      return await ThemesService.getWordsByThemeId({
        identifier: themeId,
      });
    },
  });

  const [activeStep, setActiveStep] = useState<number>(0);

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.meta.count === 0) {
    return <div>No words found</div>;
  }

  return (
    <div className="w-full max-w-screen-md">
      <PracticeCard data={data.items[activeStep]} />
      <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button>
    </div>
  );
};

export default LearnView;
