import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

const CheckItem = ({ text }: { text: string }) => (
  <div className="grid grid-cols-7 flex-row gap-2">
    <CheckCircle2 size={14} className="col-span-1 my-auto text-green-400" />
    <Label className="col-span-6 pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm text-wrap">
      {text}
    </Label>
  </div>
);

export default CheckItem;
