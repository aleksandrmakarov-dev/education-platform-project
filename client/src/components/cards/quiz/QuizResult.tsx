import React from "react";
import { Answer } from "./QuizCard";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface QuizResultProps {
  answers: Answer[];
}

const QuizResult: React.FC<QuizResultProps> = ({ answers }) => {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Question</TableCell>
          <TableCell align="right">Correct answer</TableCell>
          <TableCell align="right">Given answer</TableCell>
          <TableCell align="right">Correct</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {answers.map((answer, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {answer.question}
            </TableCell>
            <TableCell align="right">{answer.answer}</TableCell>
            <TableCell align="right">{answer.givenAnswer}</TableCell>
            <TableCell align="right">{answer.correct ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuizResult;
