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

    {
      numero: 3,
      publicada: true,
      modulo: 'Módulo 1 · Fundamentos',
      titulo: 'Lección 3 · El beneficio no es la caja',
      tituloCorto: 'El beneficio no es la caja',
      entradilla: 'Por qué una empresa que gana puede quedarse sin dinero. Cuatro minutos de ' +
        'vídeo, seis preguntas y una cascada en la que ves cómo el beneficio se va perdiendo ' +
        'hasta llegar a la caja.',
      preguntas: [
        {
          enunciado: 'Una empresa presenta 300.000 € de beneficio y su banco le deniega un ' +
                     'préstamo por falta de liquidez. ¿Cómo puede ser?',
          opciones: [
            'Es un error del banco',
            'El beneficio está en clientes sin cobrar y en existencias, no en la cuenta',
            'Ha pagado demasiados impuestos'
          ],
          correcta: 1,
          explicacion: 'El beneficio contable reconoce la venta cuando se factura, no cuando se ' +
            'cobra. Si vende a 90 días y crece rápido, tiene un beneficio enorme y una cuenta ' +
            'corriente vacía. Es el problema de tesorería clásico del crecimiento.'
        },
        {
          enunciado: '¿Qué es el flujo de caja libre?',
          opciones: [
            'El beneficio después de impuestos',
            'Lo que queda del beneficio tras impuestos, inversión y necesidades de circulante',
            'El saldo de la cuenta del banco'
          ],
          correcta: 1,
          explicacion: 'Es el dinero que de verdad sobra después de mantener el negocio en marcha. ' +
            'De ahí salen los dividendos, la devolución de deuda o las nuevas inversiones. Lo que ' +
            'no llega a flujo libre no se puede repartir.'
        },
        {
          enunciado: 'La empresa invierte 200.000 € y amortiza 120.000 €. ¿Qué indica?',
          opciones: [
            'Que está creciendo en capacidad: invierte más de lo que se desgasta',
            'Que está perdiendo dinero',
            'Que tiene demasiada deuda'
          ],
          correcta: 0,
          explicacion: 'La amortización refleja el desgaste de lo que ya tiene. Si invierte por ' +
            'encima, está ampliando. Eso consume caja hoy, pero suele ser buena señal si la ' +
            'inversión genera retorno. Si fuera al contrario, la empresa se estaría descapitalizando.'
        },
        {
          enunciado: 'Las existencias crecen un 40 % y las ventas un 10 %. ¿Qué mirarías?',
          opciones: [
            'Nada, es normal si hay crecimiento',
            'Que se está acumulando mercancía que no se vende y consume caja',
            'Que la empresa va a vender más el año que viene'
          ],
          correcta: 1,
          explicacion: 'Las existencias deberían crecer al ritmo de las ventas. Si crecen cuatro ' +
            'veces más, o hay un pedido grande en camino —hay que comprobarlo— o hay producto ' +
            'parado. En el segundo caso, ese dinero está inmovilizado y puede acabar en provisión.'
        },
        {
          enunciado: '¿Qué documento de las cuentas enseña de verdad la caja generada?',
          opciones: [
            'La cuenta de resultados',
            'El balance',
            'El estado de flujos de efectivo'
          ],
          correcta: 2,
          explicacion: 'La cuenta de resultados habla de devengo (cuándo se factura), el balance es ' +
            'una foto del día. El estado de flujos de efectivo es el único que dice cuánto dinero ' +
            'ha entrado y salido, y de dónde. Es el documento que menos se lee y el que más aclara.'
        },
        {
          enunciado: 'Una empresa crece un 30 % anual financiándose solo con proveedores. ¿Qué ' +
                     'riesgo tiene?',
          opciones: [
            'Ninguno, es la forma más barata de financiarse',
            'Que si un proveedor acorta el plazo, se queda sin tesorería',
            'Que paga demasiados intereses'
          ],
          correcta: 1,
          explicacion: 'Financiarse con proveedores es barato hasta que deja de serlo. Si el ' +
            'crecimiento depende de estirar pagos y un proveedor importante cambia las condiciones, ' +
            'la empresa se queda sin margen. Es la quiebra más rápida que existe.'
        }
      ],
      interaccion: {
        tipo: 'puente',
        titulo: 'De beneficio a caja',
        intro: 'Esta empresa tiene 350.000 € de beneficio. Mueve la inversión y lo que se queda ' +
          'en existencias y clientes, y mira cuánto llega de verdad a la caja. Fíjate en la ' +
          'diferencia entre la primera barra y la última.',
        enunciado: '',
        ebitda: 350000,
        capex: 80000,
        circulante: 30000
      }
    },
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
    {
      numero: 5,
      publicada: true,
      modulo: 'Módulo 2 · Los métodos',
      titulo: 'Lección 5 · Proyectar la caja',
      tituloCorto: 'Proyectar la caja',
      entradilla: 'Cómo se construye la proyección a cinco años sin inventar. Tres minutos de ' +
        'vídeo, seis preguntas y una tabla donde cambias el crecimiento de cada año y ves el ' +
        'valor moverse.',
      preguntas: [
        {
          enunciado: '¿Por qué se proyectan cinco años y no veinte?',
          opciones: [
            'Porque es la costumbre',
            'Porque a partir de cinco años la incertidumbre hace que el detalle no aporte nada',
            'Porque los bancos solo prestan a cinco años'
          ],
          correcta: 1,
          explicacion: 'Proyectar veinte años con detalle da una falsa sensación de precisión: ' +
            'nadie sabe qué pasará en el año doce. Se proyectan cinco con cuidado y el resto se ' +
            'resume en el valor terminal, que es honestamente un supuesto.'
        },
        {
          enunciado: 'Una empresa creció un 20 % los últimos tres años. ¿Proyectas un 20 % los ' +
                     'próximos cinco?',
          opciones: [
            'Sí, es su ritmo histórico',
            'No: el crecimiento debe decrecer hacia la media, y hay que justificarlo',
            'Sí, pero solo los dos primeros años'
          ],
          correcta: 1,
          explicacion: 'El crecimiento pasado no se sostiene indefinidamente. Lo razonable es ' +
            'proyectar menos cada año hasta acercarse al crecimiento de la economía. Un 20 % ' +
            'constante durante cinco años implica multiplicar el tamaño por dos y medio.'
        },
        {
          enunciado: '¿Qué hay que restar al beneficio para obtener el flujo de caja?',
          opciones: [
            'Solo los impuestos',
            'Impuestos, inversión y variación del circulante',
            'Solo la inversión'
          ],
          correcta: 1,
          explicacion: 'Los tres. Si te olvidas de la inversión, estás suponiendo que la empresa ' +
            'crece sin comprar nada. Si te olvidas del circulante, supones que crece sin financiar ' +
            'existencias ni clientes. Las dos omisiones inflan la valoración.'
        },
        {
          enunciado: 'Proyectas crecer un 10 % anual e invertir solo el 2 % de las ventas. ¿Qué ' +
                     'está mal?',
          opciones: [
            'Nada, si el negocio es poco intensivo en capital',
            'Que el crecimiento exige inversión: ese 10 % no es creíble con un 2 %',
            'Que inviertes demasiado'
          ],
          correcta: 1,
          explicacion: 'Salvo en negocios de servicios muy concretos, crecer exige invertir. Un ' +
            'crecimiento alto con inversión mínima es la señal más clara de una proyección hecha ' +
            'para que salga el número que se quería.'
        },
        {
          enunciado: 'La proyección da un flujo libre negativo los dos primeros años. ¿Es un error?',
          opciones: [
            'Sí, el flujo libre nunca puede ser negativo',
            'No: una empresa en expansión puede consumir caja al principio',
            'Sí, habría que subir el crecimiento'
          ],
          correcta: 1,
          explicacion: 'No es un error: es información. Si la empresa invierte mucho para crecer, ' +
            'consume caja al principio. Lo que hay que comprobar es que eso esté financiado y que ' +
            'el flujo se vuelva positivo en un plazo razonable.'
        },
        {
          enunciado: '¿Cuál es la forma más rápida de inflar una valoración con la proyección?',
          opciones: [
            'Subir la inversión prevista',
            'Subir el crecimiento de los cinco años a la vez',
            'Bajar los impuestos'
          ],
          correcta: 1,
          explicacion: 'Dos o tres puntos más de crecimiento en cada año, compuestos, cambian el ' +
            'flujo del año cinco y con él el valor terminal. Es el ajuste que más mueve el ' +
            'resultado y el más difícil de detectar si no se mira año a año.'
        }
      ],
      interaccion: {
        tipo: 'proyeccion',
        titulo: 'Construye la proyección',
        intro: 'Cambia el crecimiento de cada año y mira cómo se mueve el valor. Prueba a poner ' +
          'un 10 % todos los años y observa qué pasa con el flujo del año cinco y con el valor ' +
          'terminal: ahí está el efecto de la composición.',
        enunciado: '',
        ebitda: 350000,
        crecimientos: [8, 6, 4, 3, 2],
        wacc: 10.3,
        g: 1.5
      }
    },
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
    {
      numero: 7,
      publicada: true,
      modulo: 'Módulo 2 · Los métodos',
      titulo: 'Lección 7 · El valor terminal',
      tituloCorto: 'El valor terminal',
      entradilla: 'Dos tercios del resultado se juegan después del año cinco. Tres minutos de ' +
        'vídeo, seis preguntas y una proyección en la que cambias cada año y ves cómo se mueve el ' +
        'valor terminal.',
      preguntas: [
        {
          enunciado: '¿Qué es el valor terminal?',
          opciones: [
            'El valor de la empresa al final del año cinco',
            'El valor de todo lo que la empresa generará a partir del año seis',
            'El precio de venta que se pone en el contrato'
          ],
          correcta: 1,
          explicacion: 'Resume, en un solo número, todos los flujos desde el año seis hasta el ' +
            'infinito, descontados a hoy. Es una simplificación enorme y por eso hay que mirarla ' +
            'con lupa: dos tercios del valor suelen estar ahí.'
        },
        {
          enunciado: 'Tasa de descuento 10 %, crecimiento perpetuo 1,5 %. ¿Cuántas veces el ' +
                     'flujo del año 5 supone el valor terminal?',
          opciones: ['Cerca de 6 veces', 'Cerca de 12 veces', 'Cerca de 25 veces'],
          correcta: 1,
          explicacion: 'El denominador es 10 − 1,5 = 8,5 %. El valor terminal es el flujo del año ' +
            '5 por 1,015 dividido entre 0,085: unas doce veces. Cuanto menor sea el denominador ' +
            '(tasa baja o crecimiento alto), más grande se hace el valor terminal.'
        },
        {
          enunciado: '¿Por qué no se usa un crecimiento perpetuo del 5 %?',
          opciones: [
            'Porque los bancos no lo permiten',
            'Porque ninguna empresa puede crecer por encima de su economía para siempre',
            'Porque la inflación se lo comería'
          ],
          correcta: 1,
          explicacion: 'Un 5 % anual durante cincuenta años son casi once veces el tamaño actual. ' +
            'Si el conjunto de la economía crece al 1,5 %, esa empresa acabaría siendo más grande ' +
            'que su país. Es aritmética, no prudencia: es imposible.'
        },
        {
          enunciado: 'El valor terminal multiplica por 1,015 el flujo del año 5, que ya creció ' +
                     'ese año. ¿Qué pasa si además aplicas el crecimiento al año 5 otra vez?',
          opciones: [
            'Se cuenta dos veces el mismo crecimiento y la valoración sube de más',
            'Es indiferente',
            'Baja la valoración'
          ],
          correcta: 0,
          explicacion: 'Es el error técnico más frecuente. El flujo del año 5 ya incorpora su ' +
            'crecimiento; el 1,015 lleva el flujo al año 6. Aplicarlo dos veces infla el valor ' +
            'terminal sin que se note.'
        },
        {
          enunciado: 'El valor terminal pesa el 78 % de la valoración. ¿Qué significa?',
          opciones: [
            'Que la valoración es muy fiable',
            'Que depende sobre todo de supuestos que no se pueden comprobar',
            'Que hay un error en el cálculo'
          ],
          correcta: 1,
          explicacion: 'No es un error, es una debilidad. Cuando el peso pasa de tres cuartos, el ' +
            'resultado depende casi por completo del crecimiento perpetuo y de la tasa, que son ' +
            'elecciones, no datos. Conviene decirlo al presentar la valoración.'
        },
        {
          enunciado: 'Subes el crecimiento perpetuo del 1,5 % al 2,5 %. ¿Qué le pasa al valor?',
          opciones: [
            'Sube algo menos del 1 %',
            'Sube en torno a un 15 %',
            'No cambia, si los cinco años siguen igual'
          ],
          correcta: 1,
          explicacion: 'El denominador pasa de 8,5 % a 7,5 %, y eso multiplica el valor terminal ' +
            'un 13 %. Como el terminal pesa dos tercios, el valor total sube alrededor de un 10-15 %. ' +
            'Mover un punto de perpetuidad no es un retoque: es otra valoración.'
        }
      ],
      interaccion: {
        tipo: 'proyeccion',
        titulo: 'Cambia un año y mira el valor terminal',
        intro: 'Esta es la proyección de una empresa con 350.000 € de beneficio. Cambia el ' +
          'crecimiento de cualquier año, o mueve la tasa y la perpetuidad, y fíjate en la barra: ' +
          'la parte dorada es valor terminal, es decir, futuro que te estás inventando.',
        enunciado: '',
        ebitda: 350000,
        crecimientos: [6, 5, 4, 3, 2],
        wacc: 10.3,
        g: 1.5
      }
    },
    {
      numero: 8,
      publicada: true,
      modulo: 'Módulo 3 · Ajustes y trampas',
      titulo: 'Lección 8 · Normalizar el beneficio',
      tituloCorto: 'Normalizar el beneficio',
      entradilla: 'El beneficio de las cuentas no es el que ve un comprador. Cuatro minutos de ' +
        'vídeo, seis preguntas y un ejercicio en el que decides tú qué se ajusta y qué no.',
      preguntas: [
        {
          enunciado: 'El dueño paga con la sociedad el colegio de sus hijos: 9.000 € al año. ' +
                     '¿Cómo afecta a la valoración?',
          opciones: [
            'Se ignora: son gastos de la empresa',
            'Se suma de vuelta al beneficio, porque no es un coste del negocio',
            'Se resta del beneficio'
          ],
          correcta: 1,
          explicacion: 'Ese gasto reduce el beneficio contable pero no es un coste de operar. Un ' +
            'comprador no lo tendría, así que el beneficio real es 9.000 € mayor. Es el ajuste más ' +
            'frecuente en las pymes españolas.'
        },
        {
          enunciado: 'El dueño cobra 40.000 € y contratar a alguien para su puesto costaría ' +
                     '60.000 €. ¿Qué haces?',
          opciones: [
            'Nada: es lo que cobra',
            'Restar 20.000 € al beneficio, porque ese coste existirá con el nuevo dueño',
            'Sumar 20.000 € porque ahorra en personal'
          ],
          correcta: 1,
          explicacion: 'El negocio solo funciona porque el dueño trabaja por debajo de mercado. ' +
            'Si lo sustituyes, el coste sube 20.000 €. Ese coste hay que reflejarlo: se resta del ' +
            'beneficio antes de aplicar el múltiplo.'
        },
        {
          enunciado: 'La empresa recibió una subvención de 50.000 € que no se repetirá. ¿Qué ' +
                     'haces con ella?',
          opciones: [
            'Dejarla: está en el beneficio del año',
            'Restarla, porque infla un beneficio que no se va a repetir',
            'Sumarla otra vez, porque es dinero cobrado'
          ],
          correcta: 1,
          explicacion: 'El comprador paga por el beneficio recurrente. Una subvención que no se ' +
            'repite hace que este año parezca mejor de lo que será el que viene. Se saca del ' +
            'cálculo y, si acaso, se menciona aparte.'
        },
        {
          enunciado: 'La empresa paga 6.000 € al año de alquiler por un local que, a precio de ' +
                     'mercado, costaría 18.000 €. El local es de los dueños.',
          opciones: [
            'No se toca: es lo que paga',
            'Se restan 12.000 € al beneficio, porque ese coste existirá con el nuevo dueño',
            'Se suman 12.000 € porque paga menos'
          ],
          correcta: 1,
          explicacion: 'Es el caso espejo del sueldo. La empresa se beneficia de una relación con ' +
            'los dueños que no se mantendrá. Con un propietario nuevo, el alquiler sería de ' +
            'mercado y el beneficio 12.000 € menor.'
        },
        {
          enunciado: '¿Por qué se piden tres años de cuentas y no uno?',
          opciones: [
            'Porque es obligatorio para valorar',
            'Porque un solo año puede estar distorsionado por algo puntual',
            'Para calcular la media de los múltiplos'
          ],
          correcta: 1,
          explicacion: 'Un año puede incluir una obra, una multa o un pedido excepcional. Mirando ' +
            'tres se distingue lo que se repite de lo que pasó una vez, que es justo lo que hay ' +
            'que separar para normalizar.'
        },
        {
          enunciado: 'Normalizas el beneficio y pasa de 300.000 a 240.000 €. Con un múltiplo de ' +
                     '7x y sin deuda, ¿cuánto valor se ha perdido?',
          opciones: ['60.000 €', '420.000 €', 'Nada, el múltiplo es el mismo'],
          correcta: 1,
          explicacion: '7 × 60.000 = 420.000 €. Normalizar no es un detalle contable: cada euro de ' +
            'beneficio que se ajusta se multiplica por el múltiplo al llegar a la valoración. Por ' +
            'eso es lo primero que se hace.'
        }
      ],
      interaccion: {
        tipo: 'normalizador',
        titulo: 'Ajusta tú el beneficio',
        intro: 'Esta empresa declara 350.000 € de EBITDA. En sus cuentas hay seis partidas ' +
          'discutibles. Marca las que creas que hay que ajustar y mira dónde acaba el beneficio. ' +
          'Piensa siempre lo mismo: ¿esto existiría con un dueño nuevo?',
        enunciado: '',
        ebitda: 350000,
        partidas: [
          {concepto: 'Coche y viajes personales del dueño pagados por la empresa',
           explicacion: 'No es un coste de operar: alguien tendría que pagarlo de su bolsillo.',
           importe: 12000, signo: 1, ajustar: true},
          {concepto: 'Sueldo del socio por debajo del de mercado',
           explicacion: 'El socio cobra 42.000 € y su sustituto costaría 60.000 €. Faltan 18.000.',
           importe: 18000, signo: -1, ajustar: true},
          {concepto: 'Multa de tráfico y sanción laboral puntual',
           explicacion: 'No se repite y no forma parte del negocio normal.',
           importe: 8000, signo: 1, ajustar: true},
          {concepto: 'Subvención pública no recurrente',
           explicacion: 'Entró este año y no volverá a entrar. Infla el beneficio.',
           importe: 30000, signo: -1, ajustar: true},
          {concepto: 'Alquiler del local pagado a un familiar, por debajo de mercado',
           explicacion: 'Paga 9.000 y el precio de mercado es 21.000. Con otro dueño, costaría más.',
           importe: 12000, signo: -1, ajustar: false},
          {concepto: 'Compra de una furgoneta nueva',
           explicacion: 'Es inversión, no gasto: ya se descuenta aparte como capex. No se ajusta aquí.',
           importe: 32000, signo: 1, ajustar: false}
        ]
      }
    },
    { numero: 9, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Deuda, caja y lo que no está en el balance' },
    { numero: 10, publicada: false, modulo: 'Módulo 3 · Ajustes y trampas', tituloCorto: 'Los cinco errores que inflan una valoración' },
    { numero: 11, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una empresa cotizada, paso a paso' },
    { numero: 12, publicada: false, modulo: 'Módulo 4 · Casos prácticos', tituloCorto: 'Una pyme, paso a paso' }
  ]
};
