import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: number;
}

export function LoadingSpinner({
  fullScreen = false,
  size = 60,
}: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(fullScreen ? { height: "100vh" } : { minHeight: 300 }),
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
