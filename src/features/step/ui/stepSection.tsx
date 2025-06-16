
import { WildfireStage } from "@/entities/step/types";
import StepTable from "./stepTable";


interface Props {
  data: WildfireStage[];
}

export default function StepSection({ data }: Props) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">산불 단계별 동원 이력</h1>
      <StepTable data={data} />
    </section>
  );
}
