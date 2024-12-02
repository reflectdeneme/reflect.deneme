"use client";

import styles from "./Deneme.module.scss";

const Deneme = () => {
  const handleDownload = () => {
    fetch(
      "https://ik.imagekit.io/reflectsquad/static/kvkk/11_ilgili_kisi_basvuru_formu.pdf"
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          "https://ik.imagekit.io/reflectsquad/static/kvkk/11_ilgili_kisi_basvuru_formu.pdf";
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("İndirme hatası:", err));
  };

  return (
    <div className={styles.download}>
      {" "}
      <button className={styles.downloadButton} onClick={handleDownload}>
        Dökümanı İndir
      </button>
    </div>
  );
};

export default Deneme;
