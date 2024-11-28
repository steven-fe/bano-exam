import { forwardRef } from "react";
import type { Region } from "../../types";

import styles from "./index.module.scss";

export default forwardRef(function Trigger(
  {
    region,
    onClick,
  }: {
    region: Region | null;
    onClick: () => void;
  },
  ref: React.ForwardedRef<HTMLDivElement | null>
) {
  return (
    <div className={styles.displayArea} ref={ref} onClick={onClick}>
      {region?.enName || "Select a region"}
    </div>
  );
});
