import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Messagebar(props) {
  const [display, setDisplay] = useState(undefined);
  useEffect(() => {
    if (props.type === "error") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    setTimeout(() => {
      setDisplay(undefined);
    }, 4000);
  }, [props.type]);
  return (
    <>
      {display === true || false ? (
        <Stack
          sx={{ width: "100%", position: "absolute", top: "0" }}
          spacing={2}
        >
          <Alert severity={props.type}>{props.message}</Alert>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
