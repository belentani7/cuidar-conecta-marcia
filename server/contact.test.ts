import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createContactRequest: vi.fn().mockResolvedValue(undefined),
  listContactRequests: vi.fn().mockResolvedValue([]),
}));

import { contactRequestInput } from "../shared/contact";
import { createContactRequest } from "./db";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const validRequest = {
  organization: "Centro Horizonte",
  contactName: "Ana Ruiz",
  email: "ana@centrohorizonte.org",
  phone: "+34 600 000 000",
  service: "formacion" as const,
  format: "hibrido" as const,
  timeframe: "proximos_3_meses" as const,
  teamSize: "11_30" as const,
  context: "Queremos abrir una conversación con nuestro equipo sobre cuidado humanizado.",
  replyPreference: "email" as const,
  website: "",
};

describe("solicitudes de contacto", () => {
  it("acepta una solicitud institucional completa", () => {
    expect(contactRequestInput.safeParse(validRequest).success).toBe(true);
  });

  it("rechaza una necesidad demasiado breve", () => {
    expect(contactRequestInput.safeParse({ ...validRequest, context: "Muy breve" }).success).toBe(false);
  });

  it("registra una solicitud pública sin el campo antispam", async () => {
    const caller = appRouter.createCaller({} as TrpcContext);
    await expect(caller.contact.submit(validRequest)).resolves.toEqual({ success: true });
    expect(createContactRequest).toHaveBeenCalledWith({
      organization: "Centro Horizonte",
      contactName: "Ana Ruiz",
      email: "ana@centrohorizonte.org",
      phone: "+34 600 000 000",
      service: "formacion",
      format: "hibrido",
      timeframe: "proximos_3_meses",
      teamSize: "11_30",
      context: "Queremos abrir una conversación con nuestro equipo sobre cuidado humanizado.",
      replyPreference: "email",
    });
  });

  it("restringe la consulta de solicitudes al rol administrador", async () => {
    const caller = appRouter.createCaller({} as TrpcContext);
    await expect(caller.contact.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
