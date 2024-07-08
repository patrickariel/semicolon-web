import { Sticky } from "@/components/sticky";
import { Suggestions } from "@/components/suggestions";
import { Trends } from "@/components/trends";

export default function Page() {
  return (
    <Sticky>
      <div className="flex flex-col gap-5 py-6">
        <Suggestions />
        <Trends />
        <div />
      </div>
    </Sticky>
  );
}
