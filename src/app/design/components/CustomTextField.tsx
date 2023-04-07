"use client";
import React, { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
export const baseUrl = "https://us-central1-travel-club-666.cloudfunctions.net";
const saveTaskUrl = `${baseUrl}/saveTask`;

interface TypeProps {
  text: string;
  onTextChange: any;
  taskId: string;
}

const textStyle = { margin: "20px", minWidht: "120px" };
const CustomTextField: FC<TypeProps> = ({ onTextChange, taskId }) => {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(saveTaskUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: taskId, text: text }),
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);
  return (
    <TextField
      style={textStyle}
      label="Enter your query"
      variant="outlined"
      value={text}
      onChange={(event) => {
        const newText = event.target.value;
        setText(newText);
        onTextChange(newText);
      }}
    />
  );
};

export default CustomTextField;
