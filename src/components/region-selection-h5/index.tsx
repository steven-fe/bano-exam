import type { Region } from "../region-selection/types"; 

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Trigger from "../region-selection-pc/components/trigger";
import List from "../region-selection-pc/components/list";

export default function RegionSelectionH5({
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
  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>
        <Trigger region={region} onClick={() => setOpen(!open)} />
      </DrawerTrigger>

      <DrawerContent>
        <List
          list={renderRegionList}
          filterText={filterText}
          height="50vh"
          setFilterText={setFilterText}
          setRegion={(region) => {
            setRegion(region);
            setOpen(false);
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
