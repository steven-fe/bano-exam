import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import regionList from "./data";
import RegionSelectionPc from "../region-selection-pc";
import RegionSelectionH5 from "../region-selection-h5";

const useRenderType = () => {
  const setRenderWidth = useCallback(() => {
    console.log(window.document.documentElement.getBoundingClientRect().width);
    return window.document.documentElement.getBoundingClientRect().width < 768
      ? "h5"
      : "pc";
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);

  return useSyncExternalStore(subscribe, setRenderWidth);
};

export default function RegionSelection() {
  const [open, setOpen] = useState(!false);

  const [region, setRegion] = useState<(typeof regionList)[number] | null>(
    null
  );
  const [filterText, setFilterText] = useState("");

  const renderRegionList = useMemo(() => {
    return regionList.filter(({ enName }) =>
      enName.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const renderType = useRenderType();

  return renderType === "h5" ? (
    <RegionSelectionH5
      open={open}
      region={region}
      renderRegionList={renderRegionList}
      filterText={filterText}
      setFilterText={setFilterText}
      setOpen={setOpen}
      setRegion={setRegion}
    />
  ) : (
    <RegionSelectionPc
      open={open}
      region={region}
      renderRegionList={renderRegionList}
      filterText={filterText}
      setFilterText={setFilterText}
      setOpen={setOpen}
      setRegion={setRegion}
    />
  );
}
