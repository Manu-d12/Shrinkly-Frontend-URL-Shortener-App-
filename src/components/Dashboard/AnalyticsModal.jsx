import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { AppContext } from "../../contextApi/ContextApi.jsx";
import Graph from "./Graph";
import { useFetchShortUrlSpecificClicks } from "../hooks/userQuery.js";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";

const AnalyticsModal = ({ shortUrl, setShortUrl }) => {
  const { token } = useContext(AppContext);
  let { data, error, isLoading } = useFetchShortUrlSpecificClicks(
    shortUrl,
    token,
    onError
  );

  if (isLoading) data = [];

  function onError(e) {
    console.log(e);
  }

  const closeAnalyticsHandler = () => {
    setShortUrl(null);
  };

  return (
    <Modal open={open} aria-labelledby="shorten-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          width: "80%",
          height: "80%",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            id="shorten-modal-title"
            variant="h6"
            fontWeight="bold"
            className="text-gray-900 mb-2 flex items-center gap-2"
          >
            Past 90 Days URL Analytics for{" "}
            <a
              href={`${
                import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL
              }/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {`${import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL}/${shortUrl}`}
            </a>
          </Typography>

          <Tooltip title="Close">
            <IconButton onClick={closeAnalyticsHandler} size="small">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Graph data={data}></Graph>
      </Box>
    </Modal>
  );
};

export default AnalyticsModal;
