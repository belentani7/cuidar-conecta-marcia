import { ArrowDownRight, CalendarRange, Layers3, MapPin, Presentation, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type CollaborationJourneyProps = {
  onStartConversation: () => void;
};

const formats = [
  { icon: Presentation, title: "Charla institucional", copy: "Una conversación inspiradora para abrir un tema y alinear miradas." },
  { icon: UsersRound, title: "Taller de equipo", copy: "Un espacio participativo para aterrizar preguntas y aprendizajes compartidos." },
  { icon: Layers3, title: "Ciclo formativo", copy: "Encuentros conectados en el tiempo, con un foco definido junto al centro." },
  { icon: MapPin, title: "Colaboración situada", copy: "Una iniciativa diseñada con la organización para un momento o propósito concreto." },
];

export default function CollaborationJourney({ onStartConversation }: CollaborationJourneyProps) {
  return (
    <section id="recorrido" className="relative scroll-mt-20 overflow-hidden bg-[#f4eddf] py-20 lg:py-28">
      <div className="absolute left-0 top-16 hidden h-px w-full bg-[#c8b09e]/50 lg:block" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow text-[#a25646]">Cómo podemos trabajar juntos</p>
            <h2 className="mt-4 max-w-xl font-editorial text-4xl leading-tight tracking-[-0.03em] text-[#173f49] sm:text-5xl">De una primera conversación a una colaboración con sentido.</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#527075]">El alcance se define después de escuchar al centro. Así, cada propuesta puede reconocer sus tiempos, participantes y propósito sin partir de soluciones prefabricadas.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {[
            ["01", "Primera conversación", "Conocemos el momento, la necesidad y las personas a quienes se dirige la propuesta."],
            ["02", "Diseño contextual", "Acordamos enfoque, formato y una experiencia adecuada para la organización."],
            ["03", "Encuentro o colaboración", "Facilitamos una conversación clara, participativa y respetuosa."],
            ["04", "Síntesis y continuidad", "Compartimos aprendizajes y posibles próximos pasos para que el centro valore."],
          ].map(([number, title, copy]) => (
            <article key={number} className="relative rounded-[1.5rem] border border-[#dacdbf] bg-[#fbf8ef] p-6 shadow-[0_12px_30px_rgba(49,49,36,.06)]">
              <span className="absolute -top-3 flex size-7 items-center justify-center rounded-full bg-[#b96551] text-[0.65rem] font-extrabold text-white">{number}</span>
              <h3 className="mt-5 font-editorial text-2xl text-[#173f49]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#587479]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-7 border-t border-[#d8cabb] pt-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3 text-[#a25646]"><CalendarRange className="size-5" /><p className="eyebrow">Formatos que se acuerdan</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{formats.map(({ icon: Icon, title, copy }) => <div key={title} className="flex gap-3 rounded-2xl bg-white/65 p-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e7f0e3] text-[#315a55]"><Icon className="size-4" /></span><div><h3 className="text-sm font-extrabold text-[#173f49]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#587479]">{copy}</p></div></div>)}</div>
          </div>
          <aside className="relative overflow-hidden rounded-[1.6rem] bg-[#173f49] p-7 text-[#fbf8ef]">
            <div className="absolute -right-8 -top-8 size-40 rounded-full border-[18px] border-[#b9d1ba]/20" />
            <p className="eyebrow relative text-[#b9d1ba]">Una expectativa clara</p>
            <h3 className="relative mt-4 font-editorial text-3xl leading-tight">La propuesta se construye con información suficiente, no con supuestos.</h3>
            <p className="relative mt-4 text-sm leading-6 text-[#d8e4db]">Al escribirnos, podrá indicar formato, horizonte temporal y tamaño aproximado del equipo. Estos datos ayudan a orientar la primera conversación.</p>
            <Button onClick={onStartConversation} className="relative mt-7 rounded-full bg-[#f0bea9] px-5 text-[#173f49] hover:bg-[#f8d3c0]">Preparar una conversación <ArrowDownRight className="ml-2 size-4" /></Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
