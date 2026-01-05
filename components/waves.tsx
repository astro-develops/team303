// components/Waves.tsx
import React from "react";
import styles from "./Waves.module.css";
import clsx from "clsx";

interface WavesProps {
  flipVertical?: boolean;
  colors?: [string, string, string, string];
  height?: string;
}

const Waves: React.FC<WavesProps> = ({
  flipVertical = false,
  colors = ["#74B8B7aa","#0D7E7Caa", "#74B8B7aa", "#DBE9EE"],
  height = "20vh",
}) => {
  return (
    <div
      className={clsx(styles.wrapper, flipVertical && styles.flippedVertical)}
      style={{ height }}
    >
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-8 88-8s58 8 88 8 
               58-8 88-8 58 8 88 8 v44h-352z"
          />
        </defs>
<g className={styles.parallax}>
  <use href="#gentle-wave" x="48" y="-9" fill={colors[0]} />
  <use href="#gentle-wave" x="48" y="-6" fill={colors[1]} />
  <use href="#gentle-wave" x="48" y="-3" fill={colors[2]} />
  <use href="#gentle-wave" x="48" y="0" fill={colors[3] || colors[2]} />
</g>
      </svg>
    </div>
  );
};

export default Waves;
