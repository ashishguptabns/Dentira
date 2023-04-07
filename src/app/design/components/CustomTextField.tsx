"use client";
import React, { FC, useState } from "react";
import { TextField } from "@mui/material";

interface TypeProps {
  text: string;
  onTextChange: any;
}

const textStyle = { margin: "20px", minWidht: "120px" };
const CustomTextField: FC<TypeProps> = ({ onTextChange }) => {
  const [text, setText] = useState<string>("");
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
