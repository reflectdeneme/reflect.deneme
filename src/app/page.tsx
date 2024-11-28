"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Dispatch, SetStateAction } from "react";

export default function Home() {
  return (
    <div>
      FİREBASE DENEME
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={
            "https://ik.imagekit.io/reflectsquad/static/kvkk/15_genel_aydinlatma_metni.pdf"
          }
        />
      </Worker>
    </div>
  );
}
