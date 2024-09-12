import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";

export const RecipePopUp = ({ open, handleClose, item, imagePath }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        style: { backgroundColor: "transparent" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
          p: 4,
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          maxHeight: "500px",
        }}
      >
        <img src={imagePath} alt="" height={200} width={200} />
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          style={{ fontWeight: "bold" }}
        >
          Rating : {item?._source?.rating}
        </Typography>
        <Typography
          id="modal-description"
          style={{ fontWeight: "bold" }}
          sx={{ mt: 2 }}
        >
          {item?._source?.title}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div style={{}}>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Proteins : {item?._source?.protein} gm
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Calories :{" "}
              {!!item?._source?.calories && item?._source?.calories + " gm"}
            </Typography>
          </div>
          <div>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Fats : {item?._source?.fat} gm
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Sodium : {item?._source?.sodium} gm
            </Typography>
          </div>
        </div>
        <div>
          <p>
            <span style={{ fontWeight: "bold" }}>Categories : </span>
            {item?._source?.categories.join(", ")}
          </p>
          <p style={{ left: 0, alignSelf: "start", fontWeight: "bold" }}>
            Ingredients used :
          </p>
          {item?._source?.ingredients.map((ingredient, index) => (
            <p>
              <span style={{ fontWeight: "bold" }}>{"->"} </span>
              {ingredient}
            </p>
          ))}
        </div>
        <div>
          <p style={{ left: 0, alignSelf: "start", fontWeight: "bold" }}>
            Directions :
          </p>
          {item?._source?.directions.map((ingredient, index) => (
            <p>
              <span>{index + 1}. </span>
              {ingredient}
            </p>
          ))}
        </div>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
