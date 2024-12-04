import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  calendarContainer: {
    padding: "20px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
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
  },
  arrowButton: {
    padding: "10px",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  dayCell: {
    width: "150px",
    height: "150px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  dayNumber: {
    fontSize: "1rem",
    fontWeight: "bold",
    position: "absolute",
  },
  eventIcon: {
    color: "#4caf50",
    position: "absolute",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
    borderRadius: "8px",
  },
  modalTitle: {
    marginBottom: "20px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
});

export default useStyles;
