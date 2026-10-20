# Cuidar Conecta

Cuidar Conecta presenta los servicios de Marcia Barbosa para centros y equipos de cuidado: charlas, formación y colaboraciones sobre cuidado centrado en la persona, comunicación, bienestar de quienes cuidan y organización cotidiana.

## Qué ofrece el sitio

- Presentación de servicios, metodología y experiencia profesional.
- Formulario institucional para conversar sobre una charla, formación o colaboración.
- Preferencias de modalidad, horizonte, tamaño del equipo y canal de respuesta.
- Solicitudes guardadas para revisión administrativa.

El sitio tiene un propósito educativo y de colaboración. No reemplaza los protocolos internos ni la valoración de los profesionales responsables.

## Privacidad del formulario

El formulario recoge organización, nombre y correo de contacto, teléfono opcional, tipo y modalidad de servicio, horizonte, tamaño del equipo, preferencia de respuesta y contexto de la solicitud. Las solicitudes se guardan en la base de datos y la consulta administrativa requiere el rol de administrador.

No incluyas nombres, datos personales ni información clínica de personas atendidas. La propia interfaz muestra este aviso junto al formulario.

## Desarrollo

Requiere Node.js 22 y pnpm 10.4.1, fijado en `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Controles locales:

```bash
pnpm check
pnpm test
pnpm build
```

La CI ejecuta estos tres controles en cada pull request y en cambios a `main`. La base de datos y la autenticación administrativa se configuran mediante variables de entorno; no guardes secretos en el repositorio.

## Licencia

MIT. Consulta el archivo `LICENSE`.
