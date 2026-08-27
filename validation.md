# Validación de la página institucional

| Área revisada | Evidencia | Resultado |
| --- | --- | --- |
| Escritorio | Captura completa a 1280 × 720. | La jerarquía editorial, las secciones, la propuesta de valor y el formulario se presentan con contraste y ritmo visual consistente. |
| Móvil | Captura completa a 390 × 844. | El contenido se reorganiza en una sola columna, conserva legibilidad y mantiene las llamadas a la acción accesibles. |
| Navegación | La barra contiene anclas para Marcia, Servicios, Metodología y Confianza, además de dos CTAs hacia contacto. Se activó el enlace «Servicios» en el navegador. | La URL se actualizó a `#servicios` y la vista se situó correctamente en el bloque de propuestas. |
| Envío de formulario | Se completó y envió una solicitud de verificación con un correo de ejemplo. | La solicitud se guardó y la interfaz mostró el mensaje «Gracias por escribir» con la acción «Enviar otra solicitud». |
| Validación visible | Se intentó enviar el formulario sin datos obligatorios. | La interfaz mantuvo el formulario y mostró el mensaje claro «Indica el nombre de tu organización para continuar». |

La solicitud usada en la verificación contiene datos explícitamente ficticios y se registró con el único propósito de validar el flujo público de la aplicación.

## Ampliación guiada por el prompt maestro

La segunda versión añadió el recorrido de colaboración, cuatro formatos institucionales y tres campos de contexto —modalidad, horizonte temporal y tamaño aproximado del equipo— en el formulario. La migración correspondiente fue generada, revisada y aplicada sin operaciones destructivas. La revisión visual confirma que los nuevos bloques se mantienen legibles en escritorio y móvil. Las pruebas unitarias y la comprobación de tipos finalizaron correctamente: cinco pruebas superadas y cero errores de TypeScript.

En la interfaz activa se comprobó que la navegación incorpora el acceso «Recorrido», que la nueva sección explica etapas y formatos de colaboración, y que el selector de modalidad permite elegir una preferencia —incluida la opción «Híbrida»— antes de enviar la solicitud.
