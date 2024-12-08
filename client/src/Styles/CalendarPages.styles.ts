import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  calendarContainer: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#FFFFFF",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "20px",
    marginBottom: "20px",
  },
  monthYearContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  monthYearText: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#FFFFFF",
  },
  arrowButton: {
    padding: "10px",
    "&:hover": {
      backgroundColor: "rgba(43, 24, 16, 0.8)",
    },
  },
  dayCell: {
    width: "150px",
    height: "150px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    background: "rgba(43, 24, 16, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      background: "rgba(67, 38, 30, 0.8)",
    },
  },
  dayNumber: {
    fontSize: "1rem",
    fontWeight: "bold",
    position: "absolute",
    color: "#FFFFFF",
  },
  eventIcon: {
    color: "#8B4513",
    position: "absolute",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "rgba(43, 24, 16, 0.95)",
    padding: "20px",
    boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
    borderRadius: "8px",
    color: "#FFFFFF",
  },
  modalTitle: {
    marginBottom: "20px",
    color: "#FFFFFF",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
});

export default useStyles;