import { Input } from "@/components/ui/input";
import styles from "./index.module.scss";
import { Region } from "@/components/region-selection/types";

export default function List({
  list,
  filterText,
  height,
  setFilterText,
  setRegion,
}: {
  list: Region[];
  filterText: string;
  height?: string;
  setFilterText: (text: string) => void;
  setRegion: (region: Region) => void;
}) {
  return (
    <>
      <Input
        type="text"
        placeholder="Filter country"
        value={filterText}
        onInput={(event) =>
          setFilterText((event.target as HTMLInputElement).value ?? "")
        }
      />

      <ul className={styles.regionList} style={{ height }}>
        {list.map((region, index) => (
          <li
            key={index}
            className={styles.region}
            onClick={() => {
              setRegion(region);
            }}
          >
            <img src={region.flag} className={styles.flag} />
            <span className={styles.name}>{region.enName}</span>
            <span className={styles.code}>{region.dialingCode}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
