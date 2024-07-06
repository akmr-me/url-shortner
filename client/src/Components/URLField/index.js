import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import is_url from "../../utils/is_url";
import useInterceptor from "../../hooks/useInterceptor";
import { UserState } from "../../context";
import "./URLField.css";
import Message from "../Message";
// import Instance from "../../axios/axiosInstance";

const URLField = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useInterceptor();
  const { setStorage, userDispatcher, setSession } = UserState();

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setUrl(e.target.value);
  };
  const handleShortUrl = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Enter Url");
      return;
    }
    if (!is_url(url)) {
      setError("Enter valid Url");
      return;
    }
    try {
      setLoading(true);
      setError("");
      userDispatcher({ type: "SERVER_ERROR", payload: "" });
      const res = await axiosPrivate.post("/generateUrl", { fullURL: url });
      setStorage((purl) => [...purl, res.data]);
      setUrl("");
    } catch (err) {
      let serverError = err?.response?.data || err.message;
      setError(serverError);
      if (err.response.status === 440) {
        userDispatcher({ type: "USER", payload: {} });
        setSession({});
      }
      userDispatcher({ type: "SERVER_ERROR", payload: serverError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="effect3"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "-webkit-fill-available",
        gap: "5px",
        backgroundColor: "white",
        padding: "10px 20px",
        borderRadius: "6px",
      }}
    >
      {error.includes("Session Expired") && <Message error={error} />}
      <TextField
        value={url}
        variant="outlined"
        label={error || "Enter Your URL"}
        type="url"
        fullWidth
        margin="dense"
        onChange={handleChange}
        error={!!error}
        autoComplete="off"
      />
      <Button
        className="effect-btn"
        type="submit"
        variant="contained"
        fullWidth
        color="secondary"
        onClick={handleShortUrl}
        disabled={loading}
      >
        {loading ? "Shortening.." : "Shorten Your URL"}
      </Button>
    </Box>
  );
};

export default URLField;
