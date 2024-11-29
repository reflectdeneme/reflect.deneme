"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Dispatch, SetStateAction } from "react";
import TheSquad from "./(section)/about/TheSquad";
import Deneme from "./(section)/about/Deneme";

export default function Home() {
  return (
    <>
      <TheSquad />
      <Deneme />
    </>
  );
}
