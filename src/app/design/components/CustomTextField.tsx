"use client";
import React, { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { saveTask } from "@/app/service/task-service";

interface TypeProps {
  givenText: string;
  onTextChange: any;
  taskId: string;
}

const textStyle = { margin: "20px", minWidht: "120px" };
const CustomTextField: FC<TypeProps> = ({
  onTextChange,
  taskId,
  givenText,
}) => {
  const [text, setText] = useState<string>(givenText);
  useEffect(() => {
    if (text != null && text.length > 0 && text !== givenText) {
      const timer = setTimeout(async () => {
        saveTask({ id: taskId, text: text });
      }, 5000);

      return () => clearTimeout(timer);
    }
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
