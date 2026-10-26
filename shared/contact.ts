import { z } from "zod";

export const contactServiceOptions = ["charla", "formacion", "colaboracion", "otro"] as const;
export const replyPreferenceOptions = ["email", "telefono", "indiferente"] as const;
export const contactFormatOptions = ["presencial", "virtual", "hibrido", "por_definir"] as const;
export const contactTimeframeOptions = ["proximo_mes", "proximos_3_meses", "en_exploracion"] as const;
export const contactTeamSizeOptions = ["1_10", "11_30", "31_60", "mas_de_60"] as const;

export const contactRequestInput = z.object({
  organization: z.string().trim().min(2, "Indica el nombre de la organización.").max(180),
  contactName: z.string().trim().min(2, "Indica el nombre de la persona de contacto.").max(120),
  email: z.string().trim().email("Indica un correo electrónico válido.").max(320),
  phone: z.string().trim().max(40).optional(),
  service: z.enum(contactServiceOptions),
  format: z.enum(contactFormatOptions),
  timeframe: z.enum(contactTimeframeOptions),
  teamSize: z.enum(contactTeamSizeOptions),
  context: z
    .string()
    .trim()
    .min(20, "Cuéntanos brevemente la necesidad o el contexto de la solicitud.")
    .max(1600),
  replyPreference: z.enum(replyPreferenceOptions),
  website: z.string().max(256).optional(),
});

export type ContactRequestInput = Omit<z.infer<typeof contactRequestInput>, "website">;
