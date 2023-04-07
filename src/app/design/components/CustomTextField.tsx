"use client";
import React, { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { baseUrl } from "@/app/utils/constants";

const saveTaskUrl = `${baseUrl}/saveTask`;

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
    if (text != null && text.length > 0) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(saveTaskUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: taskId, text: text }),
          });
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
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
