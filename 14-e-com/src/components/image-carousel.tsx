import {
  ChevronLeft,
  ChevronRight,
  ImageNotSupported,
} from "@mui/icons-material";
import { CardMedia, Box, IconButton, Chip } from "@mui/material";
import { useState } from "react";

const IMG_HEIGHT = 180;
export const ImageCarousel: React.FC<{ imageUrls: string[]; name: string }> = ({
  imageUrls,
  name,
}) => {
  const [current, setCurrent] = useState(0);
  const hasMultiple = imageUrls.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + imageUrls.length) % imageUrls.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % imageUrls.length);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <Box
        sx={{
          height: IMG_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
        }}
      >
        <ImageNotSupported sx={{ fontSize: 40, color: "text.disabled" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", height: IMG_HEIGHT, overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={imageUrls[current]}
        alt={`${name} ${current + 1}`}
        sx={{
          height: IMG_HEIGHT,
          objectFit: "cover",
          transition: "opacity 0.2s ease",
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Prev / Next arrows */}
      {hasMultiple && (
        <>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              position: "absolute",
              left: 4,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              p: 0.25,
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              position: "absolute",
              right: 4,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              p: 0.25,
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>

          {/* Dot indicators */}
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.5,
            }}
          >
            {imageUrls.map((_, i) => (
              <Box
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                sx={{
                  width: i === current ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: i === current ? "white" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </>
      )}

      {/* Image count badge */}
      {hasMultiple && (
        <Chip
          label={`${current + 1}/${imageUrls.length}`}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.45)",
            color: "white",
            fontSize: "0.65rem",
            height: 20,
            backdropFilter: "blur(4px)",
            "& .MuiChip-label": { px: 0.75 },
          }}
        />
      )}
    </Box>
  );
};
