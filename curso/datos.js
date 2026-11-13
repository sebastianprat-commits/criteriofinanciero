// Contenido del curso. Cada lección: vídeo, preguntas y una interacción.

const CURSO = {
  titulo: 'Cómo valorar una empresa',
  lecciones: [
    {
      numero: 1,
      publicada: true,
      modulo: 'Módulo 1 · Fundamentos',
      titulo: 'Lección 1 · Qué es valorar una empresa',
      tituloCorto: 'Qué es valorar una empresa',
      entradilla: 'Y qué no es. Tres minutos de vídeo, seis preguntas y un simulador para ver ' +
        'con tus manos lo que mueve una valoración.',
      preguntas: [
        {
          enunciado: 'Una empresa cotiza a 40 € y tu valoración da 28 €. ¿Qué significa?',
          opciones: [
            'Que la empresa está cara y hay que vender',
            'Que el mercado paga expectativas que tu valoración no recoge',
            'Que tu valoración está mal'
          ],
          correcta: 1,
          explicacion: 'Ni lo uno ni lo otro. El precio incorpora expectativas de futuro que un ' +
            'modelo basado en números actuales no puede capturar. Puede que el mercado tenga ' +
            'razón y puede que no: lo que no puedes hacer es llamar error a una diferencia que ' +
            'no has explicado.'
        },
        {
          enunciado: '¿Cuál de estas tres cosas NO entra en el cálculo del valor?',
          opciones: ['La deuda de la empresa', 'El precio al que cotizaba ayer', 'El crecimiento que esperas'],
          correcta: 1,
          explicacion: 'El precio de ayer no dice nada sobre lo que vale el negocio. La deuda sí ' +
            'entra (se resta) y el crecimiento también (alimenta la proyección). Confundir precio ' +
            'con valor es el error de partida más común.'
        },
        {
          enunciado: 'Dos valoraciones de la misma empresa dan 30 y 48 millones. ¿Qué haces?',
          opciones: [
            'Hago la media y digo 39',
            'Me quedo con la más alta porque el mercado suele pagar más',
            'Miro por qué difieren antes de dar ningún número'
          ],
          correcta: 2,
          explicacion: 'Una diferencia del 60 % no se promedia: se explica. Casi siempre está en ' +
            'los supuestos de crecimiento o en la tasa de descuento. Si no sabes de dónde viene ' +
            'la diferencia, no tienes una valoración: tienes dos números.'
        },
        {
          enunciado: '¿Cuánto del trabajo de valorar una empresa es entender el negocio?',
          opciones: [
            'Alrededor del 30 %: la fórmula es lo importante',
            'Alrededor del 90 %: el cálculo es lo fácil',
            'Depende del sector'
          ],
          correcta: 1,
          explicacion: 'La aritmética la hace un ordenador en un segundo. Lo que no hace es saber ' +
            'si ese margen del 22 % es sostenible, si el cliente principal se va a ir o si la ' +
            'inversión pendiente se va a comer la caja.'
        },
        {
          enunciado: 'Dos empresas ganan un millón cada una. ¿Valen lo mismo?',
          opciones: [
            'Sí: mismo beneficio, mismo valor',
            'No: depende de la deuda, del crecimiento y del riesgo',
            'Solo si son del mismo sector'
          ],
          correcta: 1,
          explicacion: 'El beneficio es el punto de partida, no la respuesta. Una debe diez ' +
            'millones y la otra tiene cinco en caja: valen distinto. Una crece al 15 % y la otra ' +
            'está estancada: valen distinto. Una depende de un cliente y la otra de cien: valen ' +
            'distinto.'
        },
        {
          enunciado: 'Cuando dos métodos independientes dan valores muy parecidos, ¿qué significa?',
          opciones: [
            'Que la valoración es exacta',
            'Que los supuestos son coherentes entre sí y el resultado es más defendible',
            'Que puedo dejar de revisar las cuentas'
          ],
          correcta: 1,
          explicacion: 'Que coincidan no la hace exacta, pero sí defendible: dos caminos distintos ' +
            'llegan al mismo sitio. Y si difieren mucho, no es un problema del método: es una ' +
            'señal de que algún supuesto está mal.'
        }
      ],
      interaccion: {
        tipo: 'simulador',
        titulo: 'Mueve los números',
        intro: 'Aquí está la parte que ningún vídeo puede darte. Cambia la tasa de descuento, el ' +
          'crecimiento o el beneficio y mira cómo se mueve el valor. Hazlo despacio: la sensación ' +
          'de que un punto de descuento cambia todo es lo que se queda.',
        ebitda: 350000, crecimiento: 3, wacc: 10.3, g: 1.5
      }
    },
    {
      numero: 2,
      publicada: true,
      modulo: 'Módulo 1 · Fundamentos',
      titulo: 'Lección 2 · Las tres preguntas',
      tituloCorto: 'Las tres preguntas',
      entradilla: 'Cuánto gana, cuánto debe y cuánto puede crecer. Cuatro minutos de vídeo, seis ' +
        'preguntas y un diagnóstico en el que metes los números de una empresa real.',
      preguntas: [
        {
          enunciado: '¿Por qué se usa el EBITDA y no el beneficio neto para valorar?',
          opciones: [
            'Porque el beneficio neto es más fácil de manipular',
            'Porque el EBITDA no depende de cómo se financia ni de cómo se amortiza',
            'Porque el EBITDA siempre es mayor y queda mejor'
          ],
          correcta: 1,
          explicacion: 'El beneficio neto ya descuenta intereses (que dependen de la deuda) e ' +
            'impuestos y amortizaciones (que dependen de la contabilidad). El EBITDA mide el ' +
            'negocio antes de esas decisiones, y por eso sirve para comparar empresas distintas.'
        },
        {
          enunciado: 'Un supermercado gana un 3 % sobre ventas. ¿Es un problema?',
          opciones: [
            'Sí: un margen del 3 % es muy bajo para cualquier empresa',
            'No: en distribución el 3 % puede ser un margen excelente',
            'Depende solo de la deuda que tenga'
          ],
          correcta: 1,
          explicacion: 'El margen bueno depende del sector. En distribución se mueve mucho volumen ' +
            'con poco margen unitario: el 3 % es normal. En una consultora, el mismo 3 % sería ' +
            'una señal de alarma. Nunca juzgues un margen sin saber de qué negocio hablas.'
        },
        {
          enunciado: 'Una empresa tiene 900.000 € de deuda con bancos y 200.000 € de facturas ' +
            'pendientes de pago a proveedores. ¿Qué deuda entra en la valoración?',
          opciones: [
            'Los 1.100.000 € completos',
            'Los 900.000 € de deuda financiera',
            'Solo los 200.000 €, porque vencen antes'
          ],
          correcta: 1,
          explicacion: 'La deuda con proveedores es parte del funcionamiento normal del negocio y ' +
            'ya está reflejada en el margen. Lo que se resta al valor es la deuda financiera, y ' +
            'aun así, neta de la caja disponible.'
        },
        {
          enunciado: 'La deuda neta de una empresa es 4 veces su EBITDA. ¿Cómo se interpreta?',
          opciones: [
            'Es normal en cualquier sector',
            'Es terreno delicado: cualquier tropiezo obliga a renegociar con el banco',
            'Es señal de que la empresa es rentable y puede endeudarse'
          ],
          correcta: 1,
          explicacion: 'Por encima de tres veces el beneficio, la empresa dedica una parte creciente ' +
            'de su caja a pagar intereses y amortizar. Si el negocio se tuerce, el banco gana ' +
            'poder de negociación. Por debajo de dos veces, duerme tranquila.'
        },
        {
          enunciado: 'Una empresa crece un 15 % anual pero invierte muy poco. ¿Qué está pasando?',
          opciones: [
            'Que el negocio es muy rentable y no necesita inversión',
            'Que está consumiendo su capacidad y el crecimiento se romperá',
            'Que ha encontrado un nicho con márgenes altísimos'
          ],
          correcta: 1,
          explicacion: 'Crecer exige existencias, personal o máquinas. Si las ventas suben y la ' +
            'inversión no acompaña, se está tirando de lo que ya había. Puede aguantar uno o dos ' +
            'años, pero no es sostenible. Es el error número uno de las proyecciones optimistas.'
        },
        {
          enunciado: '¿Cuál es el orden correcto antes de valorar?',
          opciones: [
            'Primero la fórmula, luego los datos',
            'Primero cuánto gana, luego cuánto debe, luego cuánto puede crecer',
            'Primero el precio de mercado, que es una referencia'
          ],
          correcta: 1,
          explicacion: 'Los datos antes que la fórmula, y en ese orden: si no sabes cuánto gana, no ' +
            'puedes juzgar la deuda; si no sabes cuánto debe, no puedes juzgar el crecimiento. ' +
            'Empezar por el precio de mercado es empezar por la respuesta.'
        }
      ],
      interaccion: {
        tipo: 'diagnostico',
        titulo: 'Diagnóstico en tres preguntas',
        intro: 'Mete los números de una empresa que conozcas —o los de este ejemplo— y mira cómo ' +
          'responden las tres preguntas. Los umbrales cambian según el tipo de negocio: no es lo ' +
          'mismo un comercio que una empresa de software.',
        enunciado: '',
        ventas: 2500000, ebitda: 350000, deuda: 400000, caja: 150000, capex: 80000
      }
    },

    { numero: 3, publicada: false, modulo: 'Módulo 1 · Fundamentos', tituloCorto: 'El beneficio no es la caja' },
    { numero: 4, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Múltiplos: comparar con el vecino' },
    { numero: 5, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Descuento de flujos I: proyectar la caja' },
    { numero: 6, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Descuento de flujos II: la tasa' },
    { numero: 7, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Valor terminal' },
    { numero: 8, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Normalizar el beneficio' },
    { numero: 9, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Deuda, caja y lo que no está en el balance' },
    { numero: 10, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Los cinco errores que inflan una valoración' },
    { numero: 11, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una empresa cotizada, paso a paso' },
    { numero: 12, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una pyme, paso a paso' }
  ]
};
