import type { Region } from "./components/region-selection/types";

import { useState } from "react";
import RegionSelection from "./components/region-selection";

export default function Home() {
  const [region, setRegion] = useState<Region | null>(null);

  return (
    <div style={{ marginLeft: "100px", marginTop: "100px" }}>
      <RegionSelection region={region} setRegion={setRegion} />
    </div>
  );
}
