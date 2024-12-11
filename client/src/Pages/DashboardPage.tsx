import { Box, Typography, Paper, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "../Redux/hooks";
import dayjs from "dayjs";
import axios from "axios";
import {
  dashboardContainerStyles,
  dashboardGridStyles,
  commonBoxStyles,
  cardsGridStyles,
  dashboardCardStyles,
} from "../Styles/DashboardPage.styles";
import { useSelector } from "react-redux";
import { selectSelectedArea } from "../Redux/Slices/MapPage/huntingAreasSlice";
import YandexMap from "../components/MapPage/YandexMap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { WeatherWidget } from '../components/WeatherWidget';

export default function Dashboard() {
  const events = useAppSelector((state) => state.calendar.events);
  const selectedArea = useSelector(selectSelectedArea);
  const navigate = useNavigate();

  const [backpackItems, setBackpackItems] = useState([]);
  const [newItem, setNewItem] = useState("");

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
        setNewItem("");
      } catch (error) {
        console.error("Ошибка при добавлении вещи в рюкзак:", error);
      }
    }
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
              <Paper
                sx={{
                  width: "300px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography variant="h6" color="#ffffff">
                  Рюкзак
                </Typography>
                <Box>
                  <Typography variant="body2" color="#ffffff">
                    Добавить вещь:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Название вещи"
                      style={{
                        flex: 1,
                        padding: "5px",
                      }}
                    />
                    <Button variant="contained" onClick={handleAddItem}>
                      +
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" color="#ffffff">
                    Вещи:
                  </Typography>
                  <ul>
                    {backpackItems.map((item, index) => (
                      <li key={index} style={{ color: "#fff" }}>
                        {item.item}
                      </li>
                    ))}
                  </ul>
                </Box>
              </Paper>
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
        <Box sx={cardsGridStyles}>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Форум
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Общение и обмен опытом
            </Typography>
          </Paper>
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
          <Paper sx={dashboardCardStyles}>
          <Typography variant="h6" color="#ffffff" align="center">
            Погода
          </Typography>
          <WeatherWidget />
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Оружие
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное оружие и переход в каталог
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Животные
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Выбранное животное для охоты и следы и проее переход на
              характеристики
            </Typography>
          </Paper>
          <Paper sx={dashboardCardStyles}>
            <Typography variant="h6" color="#ffffff" align="center">
              Магазин
            </Typography>
            <Typography variant="body2" color="#ffffff" align="center">
              Снаряжение аренда обмен и прочее
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
