import { PricingSwitchProps } from "@/app/interfaces/PricingProps";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="w-40 mr-2" onValueChange={onSwitch}>
    <TabsList className="py-6 px-2 !m-0">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export default PricingSwitch;
