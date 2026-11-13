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
    {
      numero: 4,
      publicada: true,
      modulo: 'Módulo 2 · Los métodos',
      titulo: 'Lección 4 · Múltiplos: comparar con el vecino',
      tituloCorto: 'Múltiplos: comparar con el vecino',
      entradilla: 'El método más usado y el peor usado. Cinco minutos de vídeo, seis preguntas y un ' +
        'comparador en el que eliges tú los pares y ves cómo cambia el valor.',
      preguntas: [
        {
          enunciado: '¿Qué mide el EV/EBITDA?',
          opciones: [
            'Cuántos años de beneficio tarda en recuperarse lo que cuesta la empresa',
            'Cuánto paga el mercado por cada euro de beneficio antes de intereses e impuestos',
            'La rentabilidad que saca el accionista'
          ],
          correcta: 1,
          explicacion: 'El EV es lo que cuesta comprar la empresa entera: su valor de mercado más ' +
            'la deuda. Se divide entre el EBITDA, y el resultado dice cuántas veces el beneficio ' +
            'está pagando el mercado. Un 8x significa que se paga ocho veces el beneficio anual.'
        },
        {
          enunciado: 'Tu empresa tiene un EBITDA de 1 millón y una deuda neta de 500.000 €. ' +
                     'Aplicando un múltiplo de 6x, ¿cuánto valen las acciones?',
          opciones: ['6.000.000 €', '5.500.000 €', '3.000.000 €'],
          correcta: 1,
          explicacion: '6 × 1.000.000 = 6.000.000 de valor de empresa. Pero el comprador hereda ' +
            'la deuda: 6.000.000 − 500.000 = 5.500.000 para los accionistas. Olvidar restar la ' +
            'deuda es el error clásico al usar múltiplos.'
        },
        {
          enunciado: '¿Cuál de estos NO es un buen comparable para una empresa española de ' +
                     'maquinaria con 20 millones de facturación?',
          opciones: [
            'Un fabricante español de maquinaria similar',
            'Un fabricante alemán del mismo tamaño y sector',
            'Una empresa de software cotizada en Estados Unidos'
          ],
          correcta: 2,
          explicacion: 'El sector, el tamaño y el país importan. Una empresa de software cotiza a ' +
            'múltiplos completamente distintos: compararla con un fabricante de maquinaria no ' +
            'informa de nada. Los dos primeros son comparables razonables.'
        },
        {
          enunciado: 'Un comparable cotiza a 18x porque el mercado espera que duplique su ' +
                     'beneficio el año que viene. ¿Lo incluyes en la mediana?',
          opciones: [
            'Sí, todos los comparables suman',
            'No: su múltiplo recoge una expectativa que tu empresa no tiene por qué cumplir',
            'Sí, pero le doy menos peso'
          ],
          correcta: 1,
          explicacion: 'Un múltiplo de 18x no dice que las empresas del sector valgan 18 veces su ' +
            'beneficio: dice que el mercado espera algo de esa empresa concreta. Mezclar ese ' +
            'número con los demás contamina la mediana.'
        },
        {
          enunciado: 'La mediana de tus comparables es 7x y el más barato cotiza a 5x. ¿Qué ' +
                     'haces con el más barato?',
          opciones: [
            'Lo descarto para que la mediana salga mejor',
            'Lo dejo: si es el único, el problema no es el múltiplo, es que no tienes comparables',
            'Cojo el 5x porque es más prudente'
          ],
          correcta: 1,
          explicacion: 'Descartar el dato que no te gusta es manipular. Si un comparable está muy ' +
            'por debajo, hay que entender por qué: puede que esté penalizado por algo que tu ' +
            'empresa también tiene, o que tenga un problema que tú no tienes.'
        },
        {
          enunciado: '¿Qué método es más fiable para una empresa de maquinaria con beneficios ' +
                     'estables pero vida útil de las máquinas muy larga?',
          opciones: [
            'Múltiplos, porque son más objetivos',
            'Descuento de flujos, porque recoge la inversión futura',
            'Los dos por igual'
          ],
          correcta: 1,
          explicacion: 'Los múltiplos miran un año; el descuento de flujos mira la inversión que ' +
            'habrá que hacer para mantener esas máquinas. En negocios intensivos en capital, ' +
            'ignorar la inversión futura infla la valoración. Por eso se usan los dos.'
        }
      ],
      interaccion: {
        tipo: 'comparador',
        titulo: 'Elige tú los comparables',
        intro: 'La empresa objetivo es un fabricante de maquinaria con 1,2 millones de EBITDA y ' +
          'una deuda neta de 400.000 €. Marca o desmarca los comparables y mira cómo se mueve el ' +
          'valor. La mediana es más fiable que la media cuando hay un dato raro.',
        enunciado: 'Cada comparable trae una nota con su situación. Elegir mal los pares es el ' +
          'error más frecuente al valorar por múltiplos.',
        ebitda: 1200000,
        deudaNeta: 400000,
        aviso: 'El múltiplo no dice cuánto vale tu empresa: dice cuánto se paga hoy por empresas ' +
          'parecidas. Si los parecidos no se parecen, el resultado no vale nada.',
        pares: [
          {nombre: 'Fabricante español similar', multiple: 7.2, incluido: true, nota: 'mismo tamaño'},
          {nombre: 'Competidor directo regional', multiple: 6.8, incluido: true, nota: 'mismo negocio'},
          {nombre: 'Líder europeo del sector', multiple: 9.8, incluido: false, nota: 'cinco veces más grande'},
          {nombre: 'Empresa en pérdidas', multiple: 18.4, incluido: false, nota: 'múltiplo distorsionado'},
          {nombre: 'Grupo diversificado', multiple: 8.1, incluido: false, nota: 'varios negocios'},
          {nombre: 'Maquinaria de EEUU', multiple: 11.3, incluido: false, nota: 'otro mercado y tamaño'}
        ]
      }
    },
    { numero: 5, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Descuento de flujos I: proyectar la caja' },
    {
      numero: 6,
      publicada: true,
      modulo: 'Módulo 2 · Los métodos',
      titulo: 'Lección 6 · De dónde sale la tasa',
      tituloCorto: 'De dónde sale la tasa',
      entradilla: 'La tasa de descuento, pieza a pieza. Cuatro minutos de vídeo, seis preguntas y un ' +
        'simulador en el que construyes la tasa moviendo cada componente.',
      preguntas: [
        {
          enunciado: '¿Qué es la tasa de descuento?',
          opciones: [
            'El tipo de interés que cobra el banco por prestar',
            'La rentabilidad que exige quien pone el dinero en el negocio',
            'El crecimiento que espera la empresa'
          ],
          correcta: 1,
          explicacion: 'Es la rentabilidad mínima que exige el inversor para aceptar el riesgo del ' +
            'negocio. No es el tipo del banco: es lo que el dinero invertido tiene que rendir para ' +
            'compensar el riesgo asumido.'
        },
        {
          enunciado: 'Una empresa tiene beta 1,4. ¿Qué significa?',
          opciones: [
            'Que es un 40 % más rentable que el mercado',
            'Que cuando el mercado cae un 10 %, ella cae alrededor de un 14 %',
            'Que tiene un 40 % más de deuda'
          ],
          correcta: 1,
          explicacion: 'La beta mide sensibilidad, no rentabilidad. Una beta de 1,4 significa que ' +
            'los movimientos del mercado se amplifican un 40 % en esa acción. Las empresas ' +
            'cíclicas tienen betas altas; las de alimentación o agua, betas bajas.'
        },
        {
          enunciado: '¿Por qué se suma una prima por tamaño a una pyme?',
          opciones: [
            'Porque las pymes son menos rentables',
            'Porque vender una empresa que no cotiza cuesta tiempo y hay pocos compradores',
            'Porque las pymes pagan más impuestos'
          ],
          correcta: 1,
          explicacion: 'Es una prima de liquidez. Una acción se vende en segundos; una pyme tarda ' +
            'meses en encontrar comprador y suele haber solo unos pocos interesados. Esa falta de ' +
            'liquidez y de transparencia se compensa con una rentabilidad exigida más alta.'
        },
        {
          enunciado: 'Pasas la tasa del 9 % al 10 %. ¿Qué le pasa al valor?',
          opciones: [
            'Baja alrededor de un 10-15 %',
            'Baja un 1 %',
            'No cambia, solo cambia el valor terminal'
          ],
          correcta: 0,
          explicacion: 'Como la mayor parte del valor está en flujos lejanos, un punto de descuento ' +
            'pesa mucho. En una valoración típica, pasar del 9 al 10 % reduce el resultado entre un ' +
            '10 y un 15 %. Por eso se presenta un rango.'
        },
        {
          enunciado: '¿Cuál de estas combinaciones es un error?',
          opciones: [
            'Beta 1,0 y prima por tamaño del 2 %',
            'Beta 1,6 y además una prima por riesgo de cliente del 3 %',
            'Beta 1,2 en una empresa cíclica'
          ],
          correcta: 1,
          explicacion: 'Puede estar contando dos veces el mismo riesgo: una beta alta ya recoge parte ' +
            'de la volatilidad y del riesgo de negocio. Añadir encima una prima por concentración ' +
            'sin justificar duplica la penalización.'
        },
        {
          enunciado: 'Dos analistas valoran la misma empresa: uno usa el 8 % y otro el 11 %. ' +
                     '¿Cuál tiene razón?',
          opciones: [
            'El del 8 %, que es más optimista',
            'El del 11 %, que es más prudente',
            'Depende de los supuestos de riesgo, y hay que explicarlos'
          ],
          correcta: 2,
          explicacion: 'La tasa no es cuestión de optimismo: se construye con piezas que se pueden ' +
            'discutir. Si uno usa beta 0,8 y otro 1,3, los dos pueden estar justificados si lo ' +
            'explican. Lo que no vale es poner una tasa sin decir de dónde sale.'
        }
      ],
      interaccion: {
        tipo: 'wacc',
        titulo: 'Construye la tasa tú mismo',
        intro: 'Mueve las cuatro piezas y mira cómo se forma la tasa. Fíjate en el peso de cada ' +
          'una: el bono y la prima de mercado son la base; la beta y el tamaño son lo que se ' +
          'discute en cada empresa.',
        rf: 3.3,
        prima: 5.5,
        beta: 1.0,
        tamano: 2.0
      }
    },
    { numero: 7, publicada: false, modulo: 'Módulo 2 · Los métodos', tituloCorto: 'Valor terminal' },
    { numero: 8, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Normalizar el beneficio' },
    { numero: 9, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Deuda, caja y lo que no está en el balance' },
    { numero: 10, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Los cinco errores que inflan una valoración' },
    { numero: 11, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una empresa cotizada, paso a paso' },
    { numero: 12, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una pyme, paso a paso' }
  ]
};
