// src/Pages/DashboardPage.tsx
import { Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSelectedArea } from '../Redux/Slices/MapPage/huntingAreasSlice';
import YandexMapMini from '../components/MapPage/YandexMapMini';
import FavoritesListMini from '../components/MapPage/FavoritesListMini';
import { WeatherWidget } from '../components/WeatherWidget';
import { useState, useEffect } from "react";
import { useAppSelector } from "../Redux/hooks";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import axiosInstance from "../axiosInstance";
import dayjs from "dayjs";
import {
  dashboardContainerStyles,
  dashboardGridStyles,
  leftColumnStyles,
  mapInfoStyles,
  mapContainerStyles,
  middleColumnStyles,
  rightColumnStyles,
  backpackStyles,
  bottomRowStyles,
  weatherCalendarStyles
} from '../Styles/DashboardPage.styles';

export default function Dashboard() {
  const selectedArea = useSelector(selectSelectedArea);
  const events = useAppSelector((state) => state.calendar.events);
  const [backpackItems, setBackpackItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
        setOpenModal(false);
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
        {/* Левая колонка */}
        <Box sx={leftColumnStyles}>
          {/* Информация о выбранной зоне */}
          <Paper sx={mapInfoStyles}>
            {selectedArea ? (
              <>
                <Typography variant="h6">Основная информация</Typography>
                <Typography variant="h4">{selectedArea.name}</Typography>
                <Typography>{selectedArea.description}</Typography>
                <Typography>Площадь: {selectedArea.areaSize} га</Typography>
              </>
            ) : (
              <Typography>Выберите зону на карте</Typography>
            )}
          </Paper>
          
          {/* Карта */}
          <Paper sx={mapContainerStyles}>
            <YandexMapMini />
          </Paper>
        </Box>

        {/* Центральная колонка - Избранное */}
        <Paper sx={middleColumnStyles}>
          <FavoritesListMini />
        </Paper>

        {/* Правая колонка */}
        <Box sx={rightColumnStyles}>
          {/* Рюкзак */}
          <Paper sx={backpackStyles}>
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

          {/* Погода и календарь */}
          <Box sx={bottomRowStyles}>
            <Paper sx={weatherCalendarStyles}>
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
            <Paper sx={weatherCalendarStyles}>
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