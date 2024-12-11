import { Box, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../Redux/hooks";
import { useSelector } from "react-redux";
import { selectSelectedArea } from "../Redux/Slices/MapPage/huntingAreasSlice";
import YandexMap from "../components/MapPage/YandexMap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { backpackBoxStyles, cardsGridStyles, commonBoxStyles, dashboardCardStyles, dashboardContainerStyles, dashboardGridStyles, rightBoxStyles, } from "../Styles/DashboardPage.styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import { WeatherWidget } from '../components/WeatherWidget';


export default function Dashboard() {
  const events = useAppSelector((state) => state.calendar.events);
  const selectedArea = useSelector(selectSelectedArea);
  const navigate = useNavigate();

  const [backpackItems, setBackpackItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [openModal, setOpenModal] = useState(false); 
  const [editingItem, setEditingItem] = useState(null); 
  const [weatherData, setWeatherData] = useState(null);

  const upcomingEvent = events
    .filter((event) => dayjs(event.date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/backpack");
        setBackpackItems(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке рюкзака:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (selectedArea && selectedArea.coordinates.length) {
      const fetchWeather = async () => {
        const [lat, lon] = selectedArea.coordinates;
        try {
          const response = await axiosInstance.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке погоды:", error);
        }
      };
      fetchWeather();
    }
  }, [selectedArea]);

  const handleAddItem = async () => {
    if (newItem.trim()) {
      try {
        const response = await axiosInstance.post("/api/v1/backpack", {
          item: newItem,
        });
        setBackpackItems((prev) => [...prev, response.data]);
        setNewItem("");
        setOpenModal(false); 
      } catch (error) {
        console.error("Ошибка при добавлении вещи в рюкзак:", error);
      }
    }
  };

  const handleEditItem = async () => {
    if (newItem.trim() && editingItem) {
      try {
        const response = await axiosInstance.put(
          `/api/v1/backpack/${editingItem.id}`,
          { item: newItem }
        );
        setBackpackItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? { ...item, item: newItem } : item
          )
        );
        setNewItem("");
        setEditingItem(null);
        setOpenModal(false); // Закрытие модального окна
      } catch (error) {
        console.error("Ошибка при редактировании вещи в рюкзаке:", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/backpack/${id}`);
      setBackpackItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении вещи из рюкзака:", error);
    }
  };

  return (
    <Box sx={dashboardContainerStyles}>
      <Box sx={dashboardGridStyles}>
        <Paper sx={commonBoxStyles}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <Box sx={{ width: "400px", height: "300px", border: "1px solid #ccc" }}>
                <YandexMap />
              </Box>
            </Box>

            {selectedArea ? (
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                <Box>
                  <Typography variant="h6" color="#ffffff">Основная информация</Typography>
                  <Typography variant="h4" color="#ffffff">{selectedArea.name}</Typography>
                  <Typography variant="body1" color="#ffffff">{selectedArea.description}</Typography>
                  <Typography variant="body2" color="#ffffff">Площадь: {selectedArea.areaSize} га</Typography>
                </Box>
                
                
              </Box>
            ) : (
              <Typography variant="h6" color="#ffffff">Выберите зону на карте для просмотра информации</Typography>
            )}
          </Box>
        </Paper>

        <Box sx={rightBoxStyles}>
          <Paper sx={backpackBoxStyles}>
            <Typography variant="h6" color="#ffffff" align="center">Рюкзак</Typography>
            <Button sx={{ width: "10px" }} variant="contained" onClick={() => setOpenModal(true)}>+</Button>
            <Box>
              <ul>
                {backpackItems.map((item, index) => (
                  <li key={index} style={{ color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {item.item}
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <IconButton onClick={() => { setNewItem(item.item); setEditingItem(item); setOpenModal(true); }}>
                        <EditIcon sx={{ opacity: 0.7, color: "#fff" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem(item.id)}>
                        <DeleteIcon sx={{ opacity: 0.7, color: "#fff" }} />
                      </IconButton>
                    </Box>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>
          <Box sx={cardsGridStyles}>
            <Paper sx={dashboardCardStyles}>
              <Typography variant="h6" color="#ffffff" align="center">Календарь</Typography>
              {upcomingEvent ? (
                <Typography variant="body2" color="#ffffff" align="center" sx={{ marginTop: "0.5rem" }}>
                  {`Ближайшее событие: ${upcomingEvent.title}`}
                  <br />
                  {`Дата: ${dayjs(upcomingEvent.date).format("DD.MM.YYYY")}`}
                </Typography>
              ) : (
                <Typography variant="body2" color="#ffffff" align="center" sx={{ marginTop: "0.5rem" }}>
                  Нет ближайших событий
                </Typography>
              )}
            </Paper>
            <Paper sx={dashboardCardStyles}>
              <Typography variant="h6" color="#ffffff" align="center">Погода</Typography>
              <WeatherWidget />
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Модальное окно для добавления и редактирования вещи */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{editingItem ? "Редактировать вещь" : "Добавить вещь в рюкзак"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название вещи"
            type="text"
            fullWidth
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">Отменить</Button>
          <Button onClick={editingItem ? handleEditItem : handleAddItem} color="primary">
            {editingItem ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}