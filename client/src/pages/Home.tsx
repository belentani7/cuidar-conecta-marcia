import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import CollaborationJourney from "@/components/CollaborationJourney";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Compass,
  HeartHandshake,
  Loader2,
  Menu,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

type FormValues = {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  service: "charla" | "formacion" | "colaboracion" | "otro";
  format: "presencial" | "virtual" | "hibrido" | "por_definir";
  timeframe: "proximo_mes" | "proximos_3_meses" | "en_exploracion";
  teamSize: "1_10" | "11_30" | "31_60" | "mas_de_60";
  context: string;
  replyPreference: "email" | "telefono" | "indiferente";
};

const initialForm: FormValues = {
  organization: "",
  contactName: "",
  email: "",
  phone: "",
  service: "charla",
  format: "por_definir",
  timeframe: "en_exploracion",
  teamSize: "1_10",
  context: "",
  replyPreference: "email",
};

const services = [
  {
    number: "01",
    title: "Charlas que abren conversación",
    description:
      "Encuentros para poner palabras, perspectiva y escucha en los temas que atraviesan el cuidado cotidiano.",
    points: ["Formato para equipos y comunidades", "Temas adaptados al contexto", "Espacio para preguntas y reflexión"],
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Formación situada",
    description:
      "Procesos de aprendizaje que ayudan a los equipos a construir un lenguaje compartido, con sensibilidad hacia su realidad.",
    points: ["Diseño de sesión colaborativo", "Materiales claros y respetuosos", "Enfoque humano y organizativo"],
    icon: Compass,
  },
  {
    number: "03",
    title: "Colaboraciones con propósito",
    description:
      "Alianzas con centros y organizaciones que quieren impulsar una cultura de cuidado más presente, cuidadosa y conectada.",
    points: ["Proyectos de sensibilización", "Conversaciones institucionales", "Co-creación de iniciativas"],
    icon: HeartHandshake,
  },
];

const expertise = [
  "Cuidado centrado en la persona",
  "Comunicación en contextos de cuidado",
  "Bienestar de quien cuida",
  "Organización cotidiana y vínculos",
];

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Workflow, Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormValues>(initialForm);
  const [formError, setFormError] = useState("");
  const submitRequest = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setForm(initialForm);
      setFormError("");
    },
    onError: () => setFormError("No hemos podido enviar la solicitud. Revisa los datos e inténtalo de nuevo."),
  });

  const scrollToContact = () => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    document.getElementById("contacto")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!form.organization.trim()) {
      setFormError("Indica el nombre de tu organización para continuar.");
      return;
    }

    if (!form.contactName.trim()) {
      setFormError("Indica el nombre de la persona de contacto para continuar.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Indica un correo electrónico válido para poder responderte.");
      return;
    }

    if (form.replyPreference === "telefono" && !form.phone.trim()) {
      setFormError("Indica un teléfono si prefieres que te respondamos por esta vía.");
      return;
    }

    if (form.context.trim().length < 20) {
      setFormError("Cuéntanos brevemente el contexto de la solicitud en al menos 20 caracteres.");
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("website");
    submitRequest.mutate({
      ...form,
      phone: form.phone.trim() || undefined,
      website: typeof honeypot === "string" ? honeypot : "",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf8ef] text-[#173f49]">
      <a className="skip-link" href="#contenido">Saltar al contenido principal</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9dfce]/80 bg-[#fbf8ef]/90 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-6">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Cuidar Conecta, inicio">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173f49] font-editorial text-2xl italic text-[#fbf8ef] transition-transform duration-200 group-hover:rotate-6">C</span>
            <span className="leading-tight">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#5a7d72]">Marcia Barbosa</span>
              <span className="block font-editorial text-xl text-[#173f49]">Cuidar Conecta</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-[#315661] lg:flex" aria-label="Navegación principal">
            <a className="transition-colors hover:text-[#b96551]" href="#marcia">Marcia</a>
            <a className="transition-colors hover:text-[#b96551]" href="#servicios">Servicios</a>
            <a className="transition-colors hover:text-[#b96551]" href="#recorrido">Recorrido</a>
            <a className="transition-colors hover:text-[#b96551]" href="#metodologia">Metodología</a>
            <a className="transition-colors hover:text-[#b96551]" href="#confianza">Confianza</a>
          </nav>

          <div className="hidden lg:block">
            <Button onClick={scrollToContact} className="rounded-full bg-[#173f49] px-5 text-[#fbf8ef] shadow-none transition-transform hover:bg-[#28545e] active:scale-[.97]">
              Solicitar conversación <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>

          <button type="button" className="rounded-full p-2 text-[#173f49] lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}>
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="border-t border-[#d9dfce] bg-[#fbf8ef] px-6 py-6 lg:hidden" aria-label="Navegación móvil">
            <div className="flex flex-col gap-1 text-base font-bold">
              {[
                ["Marcia", "#marcia"],
                ["Servicios", "#servicios"],
                ["Recorrido", "#recorrido"],
                ["Metodología", "#metodologia"],
                ["Confianza", "#confianza"],
              ].map(([label, href]) => <a key={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 hover:bg-[#edf1e6]" href={href}>{label}</a>)}
              <Button onClick={scrollToContact} className="mt-3 rounded-full bg-[#173f49] text-[#fbf8ef]">Solicitar conversación</Button>
            </div>
          </nav>
        )}
      </header>

      <main id="contenido" tabIndex={-1}>
        <section id="inicio" className="relative isolate overflow-hidden pt-20">
          <div className="brand-grid absolute inset-0 -z-20 opacity-45" />
          <div className="absolute -right-32 top-16 -z-10 h-[33rem] w-[33rem] rounded-full bg-[#dce8d4] blur-3xl" />
          <div className="absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#f1c8b7]/45 blur-3xl" />
          <div className="container grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[1.12fr_.88fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-7 flex items-center gap-3 text-[#5a7d72]"><span className="h-px w-10 bg-current" /><p className="eyebrow">Conversaciones que cuidan</p></div>
              <h1 className="font-editorial text-[3.6rem] leading-[.94] tracking-[-0.045em] text-[#173f49] sm:text-[5.25rem] lg:text-[6.5rem]">El cuidado se <span className="italic text-[#b96551]">construye</span> con presencia.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#41636a] sm:text-xl">Marcia Barbosa acompaña a centros y equipos de cuidado a abrir conversaciones, compartir aprendizajes y fortalecer una cultura más humana y conectada.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button onClick={scrollToContact} size="lg" className="rounded-full bg-[#173f49] px-7 text-base text-[#fbf8ef] shadow-none hover:bg-[#28545e] active:scale-[.97]">Hablemos de su centro <ArrowDownRight className="ml-2 size-4" /></Button>
                <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#97aaa1] px-7 py-3 text-sm font-extrabold text-[#173f49] transition-colors hover:bg-white">Conocer propuestas <ArrowDownRight className="size-4" /></a>
              </div>
              <p className="mt-6 text-sm font-medium text-[#5c7477]">Charlas · Formación · Colaboraciones</p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="soft-shadow relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-white/80 bg-[#173f49] p-7 text-[#fbf8ef] sm:p-9">
                <div className="absolute right-[-24%] top-[-12%] h-72 w-72 rounded-full border-[1.5rem] border-[#dce8d4]/20" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#b96551]/90 blur-sm" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between"><span className="rounded-full border border-white/25 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]">Cuidar Conecta</span><Sparkles className="size-5 text-[#dce8d4]" /></div>
                  <div>
                    <p className="font-editorial text-5xl leading-none italic sm:text-6xl">«Cuidar es hacer espacio para la persona.»</p>
                    <div className="mt-8 border-t border-white/30 pt-5"><p className="text-sm font-extrabold uppercase tracking-[0.12em]">Marcia Barbosa</p><p className="mt-1 text-sm text-[#dce8d4]">Cuidado humanizado · Formación · Comunidad</p></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-5 flex items-center gap-3 rounded-2xl border border-[#d9dfce] bg-[#fbf8ef] p-4 shadow-lg sm:-left-10"><span className="flex size-10 items-center justify-center rounded-full bg-[#dce8d4] text-[#173f49]"><UsersRound className="size-5" /></span><p className="text-sm font-extrabold leading-tight text-[#173f49]">Cuidado que<br />conecta personas</p></div>
            </div>
          </div>
        </section>

        <section id="marcia" className="scroll-mt-20 bg-[#173f49] py-20 text-[#fbf8ef] lg:py-28">
          <div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><p className="eyebrow text-[#b9d1ba]">Sobre Marcia</p><div className="mt-5 flex h-32 w-32 items-center justify-center rounded-full border border-[#92afa8]/60 font-editorial text-7xl italic text-[#f0bea9]">M</div></div>
            <div>
              <h2 className="font-editorial text-4xl leading-tight tracking-[-0.025em] sm:text-5xl">Una voz para hablar del cuidado con respeto, criterio y cercanía.</h2>
              <div className="mt-8 grid gap-7 text-base leading-7 text-[#d8e4db] sm:grid-cols-2"><p>Marcia Barbosa es técnica en enfermería y especialista en gerontología. Su recorrido en cuidado y acompañamiento inspira una propuesta que reconoce tanto la dignidad de cada persona como el trabajo cotidiano de los equipos y las familias.</p><p>Desde Cuidar Conecta, convierte temas complejos en conversaciones posibles: espacios donde aprender, escuchar y construir enfoques que respeten la realidad de cada institución.</p></div>
              <div className="mt-10 grid gap-x-5 gap-y-3 border-t border-white/20 pt-7 sm:grid-cols-2">{expertise.map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold"><Check className="size-4 text-[#f0bea9]" />{item}</div>)}</div>
            </div>
          </div>
        </section>

        <section id="servicios" className="scroll-mt-20 py-20 lg:py-28">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 md:items-end"><div><p className="eyebrow text-[#5a7d72]">Para centros de cuidado</p><h2 className="mt-4 max-w-2xl font-editorial text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Propuestas que respetan el contexto de cada equipo.</h2></div><p className="max-w-lg text-base leading-7 text-[#527075]">Cada encuentro se plantea como una conversación de alcance educativo y organizativo. No sustituye los protocolos internos ni la valoración de los profesionales responsables.</p></div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">{services.map((service) => { const Icon = service.icon; return <article key={service.number} className="group flex min-h-[390px] flex-col rounded-[1.7rem] border border-[#d6dfd1] bg-[#fffdf8] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="flex items-start justify-between"><span className="font-editorial text-3xl italic text-[#b96551]">{service.number}</span><span className="flex size-11 items-center justify-center rounded-full bg-[#e7f0e3] text-[#315a55]"><Icon className="size-5" /></span></div><h3 className="mt-10 font-editorial text-3xl leading-tight text-[#173f49]">{service.title}</h3><p className="mt-4 leading-7 text-[#557278]">{service.description}</p><ul className="mt-auto space-y-3 border-t border-[#dfe6dc] pt-6 text-sm font-bold text-[#315661]">{service.points.map((point) => <li key={point} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#b96551]" />{point}</li>)}</ul></article>})}</div>
          </div>
        </section>

        <CollaborationJourney onStartConversation={scrollToContact} />

        <section id="metodologia" className="scroll-mt-20 bg-[#e7f0e3] py-20 lg:py-28">
          <div className="container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><p className="eyebrow text-[#5a7d72]">Metodología</p><h2 className="mt-4 font-editorial text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Una forma de acompañar que empieza por escuchar.</h2><p className="mt-6 max-w-md leading-7 text-[#527075]">El punto de partida no es una respuesta prefabricada, sino el contexto, las personas y la conversación que cada centro necesita abrir.</p></div><div className="grid gap-px overflow-hidden rounded-[1.6rem] border border-[#b8cab7] bg-[#b8cab7] sm:grid-cols-2">{[["01", "Escuchar", "Comprender la realidad, las preguntas y las prioridades del equipo."], ["02", "Enfocar", "Acordar un tema y un formato que resulten pertinentes para el momento."], ["03", "Conversar", "Crear una experiencia formativa clara, participativa y respetuosa."], ["04", "Conectar", "Dejar ideas y próximos pasos que el centro pueda valorar y adaptar."]].map(([number, title, description]) => <div key={number} className="bg-[#f8faef] p-7"><p className="font-editorial text-2xl italic text-[#b96551]">{number}</p><h3 className="mt-10 text-xl font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#587479]">{description}</p></div>)}</div></div>
        </section>

        <section id="confianza" className="scroll-mt-20 py-20 lg:py-28">
          <div className="container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow text-[#5a7d72]">Confianza con transparencia</p><h2 className="mt-4 font-editorial text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">El cuidado humano también necesita límites claros.</h2><p className="mt-6 text-lg leading-8 text-[#527075]">Cuidar Conecta propone un espacio educativo y de colaboración. Las iniciativas se ajustan al contexto de cada organización y respetan la autonomía de los equipos responsables.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3"><div className="rounded-3xl border border-[#d6dfd1] bg-[#fffdf8] p-7"><ShieldCheck className="size-7 text-[#b96551]" /><h3 className="mt-8 font-editorial text-2xl">Cuidado humanizado</h3><p className="mt-3 text-sm leading-6 text-[#587479]">Dignidad, escucha y respeto por las historias y los vínculos de las personas.</p></div><div className="rounded-3xl border border-[#d6dfd1] bg-[#fffdf8] p-7"><BadgeCheck className="size-7 text-[#b96551]" /><h3 className="mt-8 font-editorial text-2xl">Credenciales visibles</h3><p className="mt-3 text-sm leading-6 text-[#587479]">Espacio previsto para publicar y actualizar las credenciales profesionales verificadas de Marcia Barbosa.</p></div><div className="rounded-3xl border border-[#d6dfd1] bg-[#fffdf8] p-7"><HeartHandshake className="size-7 text-[#b96551]" /><h3 className="mt-8 font-editorial text-2xl">Voces verificables</h3><p className="mt-3 text-sm leading-6 text-[#587479]">Los testimonios se incorporarán únicamente con autorización y contexto identificable de la organización colaboradora.</p></div></div></div>
        </section>

        <section id="contacto" className="scroll-mt-20 bg-[#173f49] py-20 text-[#fbf8ef] lg:py-28">
          <div className="container grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><p className="eyebrow text-[#b9d1ba]">Contacto institucional</p><h2 className="mt-4 max-w-lg font-editorial text-5xl leading-[1.03] tracking-[-0.03em] sm:text-6xl">Conversemos sobre lo que su centro necesita.</h2><p className="mt-7 max-w-md leading-7 text-[#d8e4db]">Comparta el contexto de su organización y Marcia Barbosa responderá para explorar una charla, una formación o una posible colaboración.</p><div className="mt-10 border-t border-white/20 pt-6 text-sm leading-6 text-[#b9d1ba]"><p className="font-bold text-[#fbf8ef]">Una nota de privacidad</p><p className="mt-1">Utilizaremos sus datos solo para responder esta solicitud. Por favor, no incluya información personal o clínica de personas atendidas.</p></div></div>
            <div className="rounded-[1.8rem] bg-[#fffdf8] p-6 text-[#173f49] shadow-2xl sm:p-9">
              {submitRequest.isSuccess ? <div className="flex min-h-[600px] flex-col items-center justify-center text-center"><span className="flex size-16 items-center justify-center rounded-full bg-[#e7f0e3]"><Check className="size-8 text-[#315a55]" /></span><h3 className="mt-6 font-editorial text-4xl">Gracias por escribir.</h3><p className="mt-4 max-w-sm leading-7 text-[#557278]">Hemos recibido la solicitud. El equipo de Cuidar Conecta responderá por el canal indicado.</p><Button onClick={() => submitRequest.reset()} variant="outline" className="mt-7 rounded-full border-[#94aaa0]">Enviar otra solicitud</Button></div> : <form onSubmit={handleSubmit} className="space-y-5" noValidate><div><p className="eyebrow text-[#5a7d72]">Solicitud de conversación</p><p className="mt-2 text-sm text-[#557278]">Los campos marcados con * son necesarios.</p></div><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-extrabold">Organización *<Input required name="organization" autoComplete="organization" value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} placeholder="Nombre de la organización" /></label><label className="grid gap-2 text-sm font-extrabold">Persona de contacto *<Input required name="name" autoComplete="name" value={form.contactName} onChange={(event) => setForm({ ...form, contactName: event.target.value })} placeholder="Nombre y apellidos" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-extrabold">Correo electrónico *<Input required type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="nombre@organizacion.org" /></label><label className="grid gap-2 text-sm font-extrabold">Teléfono <Input type="tel" name="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Opcional" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-extrabold">¿Qué desean explorar? *<select required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value as FormValues["service"] })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"><option value="charla">Una charla</option><option value="formacion">Una formación</option><option value="colaboracion">Una colaboración</option><option value="otro">Otro tema</option></select></label><label className="grid gap-2 text-sm font-extrabold">Modalidad preferida *<select required value={form.format} onChange={(event) => setForm({ ...form, format: event.target.value as FormValues["format"] })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"><option value="presencial">Presencial</option><option value="virtual">Virtual</option><option value="hibrido">Híbrida</option><option value="por_definir">Por definir</option></select></label></div><div className="grid gap-5 sm:grid-cols-3"><label className="grid gap-2 text-sm font-extrabold">Horizonte *<select required value={form.timeframe} onChange={(event) => setForm({ ...form, timeframe: event.target.value as FormValues["timeframe"] })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"><option value="proximo_mes">Próximo mes</option><option value="proximos_3_meses">Próximos 3 meses</option><option value="en_exploracion">En exploración</option></select></label><label className="grid gap-2 text-sm font-extrabold">Tamaño del equipo *<select required value={form.teamSize} onChange={(event) => setForm({ ...form, teamSize: event.target.value as FormValues["teamSize"] })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"><option value="1_10">1–10 personas</option><option value="11_30">11–30 personas</option><option value="31_60">31–60 personas</option><option value="mas_de_60">Más de 60</option></select></label><label className="grid gap-2 text-sm font-extrabold">Respuesta *<select required value={form.replyPreference} onChange={(event) => setForm({ ...form, replyPreference: event.target.value as FormValues["replyPreference"] })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"><option value="email">Por correo</option><option value="telefono">Por teléfono</option><option value="indiferente">Indiferente</option></select></label></div><label className="grid gap-2 text-sm font-extrabold">¿Qué necesidad o idea quieren conversar? *<Textarea required minLength={20} value={form.context} onChange={(event) => setForm({ ...form, context: event.target.value })} placeholder="Cuéntenos brevemente el contexto, el tipo de encuentro y lo que les gustaría explorar. No incluya datos clínicos ni personales." className="min-h-32 resize-y" /></label><input className="sr-only" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" /><div aria-live="polite">{formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{formError}</p>}</div><Button disabled={submitRequest.isPending} type="submit" size="lg" className="w-full rounded-full bg-[#b96551] text-base text-white shadow-none hover:bg-[#9d503f] active:scale-[.97]">{submitRequest.isPending ? <><Loader2 className="mr-2 size-4 animate-spin" />Enviando solicitud</> : <>Solicitar conversación <Send className="ml-2 size-4" /></>}</Button></form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102f37] py-10 text-[#d8e4db]"><div className="container flex flex-col justify-between gap-5 text-sm sm:flex-row sm:items-end"><div><div className="font-editorial text-2xl text-[#fbf8ef]">Cuidar Conecta</div><p className="mt-1">Marcia Barbosa · Conversaciones que cuidan.</p></div><p className="text-[#a9c0b5]">© {new Date().getFullYear()} Cuidar Conecta. Todos los derechos reservados.</p></div></footer>
    </div>
  );
}
