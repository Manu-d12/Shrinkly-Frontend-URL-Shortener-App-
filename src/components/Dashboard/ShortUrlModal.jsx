import React, { useState, useContext } from "react";
import { AppContext } from "../../contextApi/ContextApi";
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
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ShortenUrlModal = ({ open, setOpen, refetch }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setShortUrl("");
    try {
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
      setShortUrl(`${import.meta.env.VITE_SHRINKLY_SUBDOMAIN_URL}/`+data.shortUrl);
    } catch (err) {
      console.error(err);
      setError(true);
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };
  
  const copyClipboardHandler = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      toast.success("Copied Successfully")
    });
  }
  
  const popupCloseHandler = async () => {
    setLoading(false);
    setLongUrl("");
    setError(false);
    setShortUrl("");
    setOpen(false);
    await refetch();
  };

  return (
    <Modal open={open} aria-labelledby="shorten-modal-title">
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="shorten-modal-title" variant="h6" fontWeight="bold">
            Shorten Your URL
          </Typography>

          <Tooltip title="Close">
            <IconButton onClick={popupCloseHandler} size="small">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>

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
              onClick={copyClipboardHandler}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}

        {error && (
          <Typography
            variant="body1"
            sx={{ mt: 1, wordBreak: "break-all", fontWeight: "bold" }}
          >
            Invalid URL. Please try with valid url.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ShortenUrlModal;
