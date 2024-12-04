import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Weapon3d from "../components/WeaponComponents/Weapon3dModel";
import axiosInstance from "../axiosInstance";

interface Weapon {
  id: number;
  model: string;
  description: string;
  model_link: string;
  img_link: string;
}

const getWeaponById = async (id: number): Promise<Weapon> => {
  const response = await axiosInstance.get(`/api/v1/weapons/${id}`);
  return response.data;
};

const WeaponDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const weaponId = id ? Number(id) : null;

  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (weaponId) {
      getWeaponById(weaponId)
        .then(setWeapon)
        .catch((error) => {
          console.error(error); // Выводим ошибку в консоль для отладки
          setError("Ошибка при загрузке данных оружия.");
        });
    }
  }, [weaponId]);

  if (error) {
    return <div style={styles.container}><p>{error}</p></div>;
  }

  if (!weapon) {
    return <div style={styles.container}><p>Загрузка...</p></div>;
  }

  return (
    <div style={styles.container}>
      <h1>{weapon.model}</h1> {/* Используйте model вместо name, так как в интерфейсе указано model */}
      <img
        src={weapon.img_link}
        alt={weapon.model}
        style={styles.image}
      
      />
      <p>{weapon.description}</p>
      <div style={styles.modelContainer}>
        {weapon.model_link ? (
          <Weapon3d modelLink={weapon.model_link} /> 
        ) : (
          <p>Модель не доступна</p>
        )}
      </div>
    </div>
  );
};

const styles: React.CSSProperties = {
  container: { padding: "20px", textAlign: "center" },
  image: { width: "300px", borderRadius: "10px", marginBottom: "20px" },
  modelContainer: { height: "500px", marginTop: "20px" },
};

export default WeaponDetailsPage;