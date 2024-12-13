// WeaponPages.styles.ts
import { SxProps } from "@mui/material";

export const pageWrapperStyles: SxProps = {
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#2B1810",
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
    filter: "brightness(0.6)",
    zIndex: 0,
  },
};

export const mainContentStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  padding: "20px",
  height: "calc(100vh - 70px)",
  marginTop: "70px",
  position: "relative",
  zIndex: 1,
};
export const upContentStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  height: "80%",
  position: "relative",
  zIndex: 1,
};
export const childrenColumnStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
};

export const modelViewerStyles: SxProps = {
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

export const infoPanelStyles: SxProps = {
  flex: 1,
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "#FFFFFF",
  overflowY: "auto",
};

export const sliderContainerStyles: SxProps = {
  height: "150px",
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  ".swiper-button-next, .swiper-button-prev": {
    color: "#FFFFFF",
    "&:hover": {
      color: "rgba(255, 255, 255, 0.8)",
    },
  },
};

export const weaponCardStyles: SxProps = {
  height: "100px",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  "&:hover": {
    transform: "scale(1.05)",
    border: "2px solid #FFFFFF",
  },
};

export const loadingContainerStyles: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#2B1810",
};

export const weaponInfoStyles: SxProps = {
  flex: 1,
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "#FFFFFF",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8B4513",
    borderRadius: "4px",
    "&:hover": {
      background: "#A0522D",
    },
  },
};

export const weaponCarouselStyles: SxProps = {
  height: "150px",
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "rgba(43, 24, 16, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflowX: "auto",
  display: "flex",
  gap: "20px",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8B4513",
    borderRadius: "4px",
    "&:hover": {
      background: "#A0522D",
    },
  },
};
