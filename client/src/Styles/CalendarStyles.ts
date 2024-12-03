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
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  dayCell: {
    width: "150px",
    height: "150px",
    border: "1px solid #ddd",
    borderRadius: "8px",    
    padding: "10px",
    textAlign: "left",
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
    top: "5px",
    left: "5px",
  },
  eventIcon: {
    color: "#4caf50",
    position: "absolute",
    bottom: "5px",
    right: "5px",
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
