import { WildfireStage } from "@/entities/step/types";
import StepTable from "./stepTable";

interface Props {
  data: WildfireStage[];
}

export default function StepSection({ data }: Props) {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">산불 단계별 동원 이력</h1>
      <div>
        산불 상황에 따라 효율적인 진화자원 동원으로 산불확산을 차단하고 조기에
        진화하여 인명 및 재산피해 최소화 할 수 있습니다. 산불발생일,
        산불발생주소, 산불1단계발령일시, 산불2단계발령일시, 산불3단계발령일시,
        산불4단계발령일시 날짜를 확인할 수 있습니다.
      </div>
      <StepTable data={data} />
    </section>
  );
}
