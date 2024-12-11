import {
  Box,
  Typography,
  Paper,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../Redux/hooks";
import dayjs from "dayjs";
import {
  dashboardContainerStyles,
  dashboardGridStyles,
  commonBoxStyles,
  cardsGridStyles,
  dashboardCardStyles,
  rightBoxStyles,
  backpackBoxStyles,
} from "../Styles/DashboardPage.styles";
import { useSelector } from "react-redux";
import { selectSelectedArea } from "../Redux/Slices/MapPage/huntingAreasSlice";
import YandexMap from "../components/MapPage/YandexMap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function Dashboard() {
  const events = useAppSelector((state) => state.calendar.events);
  const selectedArea = useSelector(selectSelectedArea);
  const navigate = useNavigate();

  const [backpackItems, setBackpackItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [openModal, setOpenModal] = useState(false); // Управление открытием модального окна
  const [itemToEdit, setItemToEdit] = useState(null); // Элемент для редактирования

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
        const response = await axiosInstance.post("/api/v1/backpack", { item: newItem });
        setBackpackItems((prev) => [...prev, response.data]);
        setNewItem(""); // Очистить поле ввода
        setOpenModal(false); // Закрыть модальное окно
      } catch (error) {
        console.error("Ошибка при добавлении вещи в рюкзак:", error);
      }
    }
  };

  const handleEditItem = async () => {
    if (itemToEdit && itemToEdit.item.trim()) {
      try {
        const response = await axiosInstance.put(`/api/v1/backpack/${itemToEdit.id}`, { item: itemToEdit.item });
        setBackpackItems((prev) =>
          prev.map((item) => (item.id === itemToEdit.id ? response.data : item))
        );
        setItemToEdit(null);
        setOpenModal(false); // Закрыть модальное окно после сохранения
      } catch (error) {
        console.error("Ошибка при редактировании вещи:", error);
      }
    }
  };

  const handleDeleteItem = async () => {
    if (itemToEdit) {
      try {
        await axiosInstance.delete(`/api/v1/backpack/${itemToEdit.id}`);
        setBackpackItems((prev) => prev.filter((item) => item.id !== itemToEdit.id)); // Удаляем элемент
        setOpenModal(false); // Закрыть модальное окно после удаления
      } catch (error) {
        console.error("Ошибка при удалении вещи:", error);
      }
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setItemToEdit(item); // Если передан элемент, редактируем его
    } else {
      setItemToEdit({ item: "" }); // Новый элемент для добавления
    }
    setOpenModal(true);
  };

  return (
    <Box sx={dashboardContainerStyles}>
      <Box sx={dashboardGridStyles}>
        <Paper sx={commonBoxStyles}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "400px",
                  height: "300px",
                  border: "1px solid #ccc",
                }}
              >
                <YandexMap />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/map")}
                sx={{ minWidth: "150px" }}
              >
                Перейти к карте
              </Button>
            </Box>

            {selectedArea ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                <Box>
                  <Typography variant="h6" color="#ffffff">
                    Основная информация
                  </Typography>
                  <Typography variant="h4" color="#ffffff">
                    {selectedArea.name}
                  </Typography>
                  <Typography variant="body1" color="#ffffff">
                    {selectedArea.description}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="h6" color="#ffffff">
                Выберите зону на карте для просмотра информации
              </Typography>
            )}
          </Box>
        </Paper>

        <Box sx={rightBoxStyles}>
          <Paper sx={backpackBoxStyles}>
            <Box>
              <Typography variant="h6" color="#ffffff">
                Рюкзак
              </Typography>
              <Button variant="contained" onClick={handleOpenModal}>
                Открыть управление вещами
              </Button>
            </Box>
            <Box>
              <Typography variant="body2" color="#ffffff">
                Вещи:
              </Typography>
              <ul>
                {backpackItems.map((item) => (
                  <li key={item.id} style={{ color: "#fff" }}>
                    {item.item}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(item)}
                      sx={{ marginLeft: "10px" }}
                    >
                      Изменить
                    </Button>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>

          {/* Модальное окно для добавления или редактирования вещи */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              sx={{
                width: 400,
                padding: 20,
                backgroundColor: "white",
                margin: "auto",
                marginTop: "100px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">
                {itemToEdit?.id ? "Редактировать вещь" : "Добавить вещь"}
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <TextField
                  value={itemToEdit?.item || ""}
                  onChange={(e) =>
                    setItemToEdit({ ...itemToEdit, item: e.target.value })
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Название вещи"
                />
                <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={itemToEdit?.id ? handleEditItem : handleAddItem}
                  >
                    {itemToEdit?.id ? "Сохранить" : "Добавить"}
                  </Button>
                  <Button variant="outlined" onClick={() => setOpenModal(false)}>
                    Отмена
                  </Button>
                  {itemToEdit?.id && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteItem}
                      sx={{ marginLeft: "10px" }}
                    >
                      Удалить
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>



      <Box sx={cardsGridStyles}>
        {/* Календарь */}
        <Paper sx={dashboardCardStyles}>
          <Typography variant="h6" color="#ffffff" align="center">
            Календарь
          </Typography>
          {upcomingEvent ? (
            <Typography
              variant="body2"
              color="#ffffff"
              align="center"
              sx={{ marginTop: "0.5rem" }}
            >
              {`Ближайшее событие: ${upcomingEvent.title}`}
              <br />
              {`Дата: ${dayjs(upcomingEvent.date).format("DD.MM.YYYY")}`}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="#ffffff"
              align="center"
              sx={{ marginTop: "0.5rem" }}
            >
              Нет ближайших событий
            </Typography>
          )}
        </Paper>

        {/* Погода */}
        <Paper sx={dashboardCardStyles}>
          <Typography variant="h6" color="#ffffff" align="center">
            Погода
          </Typography>
          <Typography variant="body2" color="#ffffff" align="center">
            Прогноз погоды
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
