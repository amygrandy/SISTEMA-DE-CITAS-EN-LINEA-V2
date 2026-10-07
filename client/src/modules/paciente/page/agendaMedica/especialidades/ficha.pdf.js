const generarFichaHTML = (data) => {
  const {
    consultorio,
    direccion,
    codigo,
    fechaAtencion,
    matricula,
    paciente,
    usuario,
    fechaImpresion,
    año,
  } = data;

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />

        <title>Ficha ${codigo}</title>

        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            background: white;
          }

          body {
            padding: 10px;
          }

          .ficha {
            width: 80mm;
            min-height: 110mm;
            margin: 0 auto;
            padding: 5mm 4mm;
            background: white;
          }

          .center {
            text-align: center;
          }

          .institucion {
            margin: 0 0 4px;
            font-size: 14px;
            font-weight: 400;
            color: #555;
          }

          .reserva {
            margin: 0;
            font-size: 13px;
            font-weight: bold;
          }

          .consultorio {
            margin: 2px 0 12px;
            font-size: 14px;
            font-weight: bold;
          }

          .direccion {
            margin: 0 0 14px;
            font-size: 15px;
            font-weight: bold;
          }

          .codigo {
            margin: 0 0 15px;
            font-size: 32px;
            font-weight: bold;
          }

          .titulo-hora {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
          }

          .fecha-atencion {
            margin: 2px 0 8px;
            font-size: 17px;
          }

          .paciente {
            margin: 0 0 8px;
            font-size: 13px;
            font-weight: bold;
            line-height: 1.3;
          }

          .mensaje {
            margin: 0;
            font-size: 12px;
            line-height: 1.4;
            color: #555;
          }

          .cns {
            margin-top: 5px;
            font-size: 12px;
            font-style: italic;
            color: #555;
          }

          .footer {
            margin-top: 14px;
            font-size: 9px;
            color: #555;
          }

          .acciones {
            width: 80mm;
            margin: 15px auto;
            display: flex;
            justify-content: center;
          }

          .print-button {
            border: none;
            border-radius: 8px;
            padding: 10px 18px;
            background: #047857;
            color: white;
            font-weight: 600;
            cursor: pointer;
          }

          @page {
            size: 80mm 110mm;
            margin: 0;
          }

          @media print {
            html,
            body {
              width: 80mm;
              height: 110mm;
              margin: 0;
              padding: 0;
            }

            .no-print {
              display: none !important;
            }

            .ficha {
              width: 80mm;
              min-height: 110mm;
              margin: 0;
              padding: 5mm 4mm;
            }
          }
        </style>
      </head>

      <body>
        <div class="acciones no-print">
          <button
            class="print-button"
            onclick="window.print()"
          >
            Imprimir ficha
          </button>
        </div>

        <main class="ficha">

          <div class="center">
            <p class="institucion">
              CAJA NACIONAL DE SALUD
            </p>

            <p class="reserva">
              (RESERVA)
            </p>

            <p class="consultorio">
              ${consultorio}
            </p>

            <p class="direccion">
              ${direccion}
            </p>

            <p class="codigo">
              ${codigo}
            </p>

            <p class="titulo-hora">
              HORA DE ATENCIÓN
            </p>

            <p class="fecha-atencion">
              ${fechaAtencion}
            </p>
          </div>

          <p class="paciente">
            Paciente: ${matricula} - ${paciente}
          </p>

          <div class="center">
            <p class="mensaje">
              Confirmar la reserva en Vigencia de Derechos
              30 min antes de su consulta
            </p>

            <p class="cns">
              CNS ${año}
            </p>
          </div>

          <div class="footer">
            <div>(${usuario})</div>
            <div>${fechaImpresion}</div>
          </div>

        </main>
      </body>
    </html>
  `;
};

export const imprimirFicha = (data) => {
  const ventana = window.open('', '_blank', 'width=500,height=700');

  if (!ventana) {
    throw new Error('El navegador bloqueó la ventana emergente.');
  }

  const html = generarFichaHTML(data);

  ventana.document.open();
  ventana.document.write(html);
  ventana.document.close();
};
