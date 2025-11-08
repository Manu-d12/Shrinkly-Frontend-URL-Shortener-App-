import React, { useState, useContext } from "react";
import { AppContext } from "../../contextApi/ContextApi";
import api from "../api/api";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const ShortenUrlModal = ({ open, onClose }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");

    try {
      // Example API call — replace with your backend endpoint
      const response = await api.post(
        "/api/urls/shorten",
        {
          originalUrl: longUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error(err);
      setShortUrl("Error shortening URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="shorten-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="shorten-modal-title"
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Shorten Your URL
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Long URL"
            variant="outlined"
            fullWidth
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Shorten"
            )}
          </Button>
        </form>

        {shortUrl && (
          <Box mt={3} textAlign="center">
            <Typography variant="subtitle1" color="text.primary">
              Short URL:
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, wordBreak: "break-all", fontWeight: "bold" }}
            >
              {shortUrl}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              color="secondary"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ShortenUrlModal;
