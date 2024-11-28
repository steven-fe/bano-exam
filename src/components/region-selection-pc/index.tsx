import type { Region } from "./types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useRef, useSyncExternalStore } from "react";
import Trigger from "./components/trigger";
import List from "./components/list";

const useDomWidth = () => {
  const popoverTriggerRef = useRef<HTMLDivElement | null>(null);

  const setRenderWidth = useCallback(() => {
    const width = popoverTriggerRef.current?.getBoundingClientRect().width;
    const renderWidth = width ? `${width}px` : "100%";
    return renderWidth;
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);

  const width = useSyncExternalStore(subscribe, setRenderWidth);

  return { popoverTriggerRef, width };
};

export default function RegionSelectionPc({
  open,
  region,
  renderRegionList,
  filterText,
  setFilterText,
  setOpen,
  setRegion,
}: {
  open: boolean;
  region: Region | null;
  renderRegionList: Region[];
  filterText: string;
  setFilterText: (text: string) => void;
  setOpen: (open: boolean) => void;
  setRegion: (region: Region) => void;
}) {
  const { popoverTriggerRef, width } = useDomWidth();

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Trigger
          region={region}
          ref={popoverTriggerRef}
          onClick={() => setOpen(!open)}
        />
      </PopoverTrigger>

      <PopoverContent style={{ width }}>
        <List
          list={renderRegionList}
          filterText={filterText}
          setFilterText={setFilterText}
          setRegion={(region) => {
            setRegion(region);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
