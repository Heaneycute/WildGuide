import React from 'react'
import { Container, Typography, Box, Paper } from '@mui/material';
import { authPageContainerStyles } from '../Styles/AuthPages.styles';
import { Canvas } from "@react-three/fiber";
import Experience from "../components/AnimalPage/Experience";
import Overlay from "../components/AnimalPage/Overlay";
import { useState } from "react";

export default function Animal() {
  const [sceneId, setSceneId] = useState(0);

  return (
    <Container maxWidth={false} disableGutters style={{width: "100vw", height: "100vh"}} sx={{
      ...authPageContainerStyles,
      minHeight: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Overlay sceneId={sceneId} setSceneId={setSceneId}/>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <Experience sceneId={sceneId} setSceneId={setSceneId}/>
      </Canvas>
       </Container>
      
  )
}