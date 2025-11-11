import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { AppContext } from "../../contextApi/ContextApi.jsx";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import { useFetchShortUrlSpecificClicks } from "../hooks/userQuery.js";
import {
  Box,
  Modal,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

const AnalyticsModal = ({ shortUrl, setShortUrl }) => {
  const { token } = useContext(AppContext);

  function onError(e) {
    console.log(e);
  }

  const { data, error, isLoading, isFetching } =
    useFetchShortUrlSpecificClicks(shortUrl, token, onError);

  const closeAnalyticsHandler = () => {
    setShortUrl(null);
  };

  return (
    <Modal open={Boolean(shortUrl)} aria-labelledby="shorten-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          width: "70%",
          height: "70%",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Header */}
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
            {!isFetching && (
              <span>
                Past 90 Days URL Analytics for{" "}
                <a
                  href={`${
                    import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL
                  }/${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {`${import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL}/${shortUrl}`}
                </a>
              </span>
            )}
          </Typography>

          <Tooltip title="Close">
            <IconButton onClick={closeAnalyticsHandler} size="small">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Loader or Graph */}
        {isFetching ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Hourglass
              visible={true}
              height="60"
              width="60"
              ariaLabel="hourglass-loading"
              colors={["#306cce", "#72a1ed"]}
            />
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Please wait...
            </Typography>
          </Box>
        ) : (
          <Graph data={data} />
        )}
      </Box>
    </Modal>
  );
};

export default AnalyticsModal;
