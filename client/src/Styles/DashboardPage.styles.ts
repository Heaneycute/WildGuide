// src/styles/DashboardPage.styles.ts
import { SxProps } from "@mui/material";

export const dashboardContainerStyles: SxProps = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/nature-background-DashboardPage.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.8)",
    zIndex: -1,
  },
};

export const dashboardGridStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "24px",
  padding: "24px",
  height: "calc(100vh - 70px)",
  marginTop: "70px",
  position: "relative",
  zIndex: 1,
};

export const commonBoxStyles: SxProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  width: "70%",
  overflow: "hidden",
};
export const rightBoxStyles: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  width: "30%",
};

export const backpackBoxStyles: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  overflow: "hidden",
};
export const cardsGridStyles: SxProps = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridAutoRows: "1fr",
  gap: "16px",
  height: "50%",
  marginTop: "20px",
};

export const dashboardCardStyles: SxProps = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "24px",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(43, 24, 16, 0.9)",
  },
};
