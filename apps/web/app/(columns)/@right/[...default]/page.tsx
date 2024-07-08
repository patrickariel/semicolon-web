import { SearchBar } from "@/components/search-bar";
import { Sticky } from "@/components/sticky";
import { Suggestions } from "@/components/suggestions";
import { Trends } from "@/components/trends";

export default function Page() {
  return (
    <>
      <div id="search-bar" className="bg-card sticky top-0 z-10 py-4">
        <SearchBar />
      </div>
      <Sticky top="#search-bar">
        <div className="flex flex-col gap-5">
          <Suggestions />
          <Trends />
          <div />
        </div>
      </Sticky>
    </>
  );
}
