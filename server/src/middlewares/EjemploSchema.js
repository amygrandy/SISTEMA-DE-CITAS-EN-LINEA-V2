export const IdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateSocioSchema = createSocioSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  });

export class SocioResponseDTO {
  constructor(socio) {
    this.id = socio.id;
    this.ci = socio.ci_socio;
    this.nombre = socio.nombre_completo;
    this.telefono = socio.telefono;
  }
}
