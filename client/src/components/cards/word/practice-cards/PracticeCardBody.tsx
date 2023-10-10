import React, { useEffect, useState } from "react";
import { Word } from "../../../../lib/types";
import { Typography, Button, Modal, Box } from "@mui/material";

interface PracticeCardBodyProps {
  data: Word;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 512,
};

const PracticeCardBody: React.FC<PracticeCardBodyProps> = ({ data }) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setShowHint(false);
  }, [data]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <div className="grid grid-cols-2 items-start gap-x-10 h-full">
        <div className={`${!data.image && "col-span-2"}`}>
          <Typography variant="subtitle1" color="text.secondary">
            Definition
          </Typography>
          <Typography variant="h4">{data.definition}</Typography>
          {showHint ? (
            <>
              <Typography variant="subtitle2" color="text.secondary">
                HINT
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data.text[0] + data.text.slice(1).replace(/./g, " _")}
              </Typography>
            </>
          ) : (
            <Button
              type="button"
              sx={{ p: 0 }}
              onClick={() => setShowHint(!showHint)}
            >
              Show hint
            </Button>
          )}
        </div>
        {data.image && (
          <img
            className="object-cover object-center h-48 w-full hover:cursor-pointer"
            alt="img"
            src={data.image}
            onClick={handleOpen}
          />
        )}
      </div>
      <Modal open={openModal} onClose={handleClose} sx={{}}>
        <Box sx={style}>
          <img
            className="object-cover object-center"
            alt="img"
            src={data.image}
          />
        </Box>
      </Modal>
    </>
  );
};

export default PracticeCardBody;
