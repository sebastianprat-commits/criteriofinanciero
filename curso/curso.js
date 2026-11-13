/* Motor del curso: pinta una lección a partir de datos.js */

const nf = new Intl.NumberFormat('es-ES', {maximumFractionDigits: 0});
const euros = v => nf.format(Math.round(v)) + ' €';
const pct = v => v.toFixed(1).replace('.', ',') + ' %';

/* ---------------------------------------------------------------- quiz */
function montarQuiz(contenedor, preguntas, alTerminar) {
  let acertadas = 0, respondidas = 0;

  contenedor.innerHTML = preguntas.map((p, i) => `
    <div class="pregunta" id="p${i}">
      <div class="enunciado">${i + 1}. ${p.enunciado}</div>
      <div class="opciones">
        ${p.opciones.map((o, j) =>
          `<button class="opcion" data-p="${i}" data-o="${j}">${o}</button>`).join('')}
      </div>
      <div class="explica" id="e${i}">${p.explicacion}</div>
    </div>`).join('');

  contenedor.querySelectorAll('.opcion').forEach(boton => {
    boton.addEventListener('click', () => {
      const i = Number(boton.dataset.p), j = Number(boton.dataset.o);
      const caja = document.getElementById('p' + i);
      if (caja.dataset.respondida) return;
      caja.dataset.respondida = '1';
      const p = preguntas[i];
      caja.querySelectorAll('.opcion').forEach((b, k) => {
        b.disabled = true;
        if (k === p.correcta) b.classList.add('bien');
        else if (k === j) b.classList.add('mal');
      });
      document.getElementById('e' + i).classList.add('visible');
      respondidas++;
      if (j === p.correcta) acertadas++;
      if (respondidas === preguntas.length) alTerminar(acertadas);
    });
  });
}

/* ------------------------------------------------------------ ayuda */
function ayuda(texto) {
  return texto ? `<div class="ayuda-campo">${texto}</div>` : '';
}

/* ------------------------------------------------------------ simulador */
function componenteSimulador(contenedor, cfg) {
  const campos = [
    {id: 'ebitda', etiqueta: 'Beneficio (EBITDA)', min: 50000, max: 2000000, paso: 10000,
     valor: cfg.ebitda || 350000, formato: euros,
     ayuda: 'Beneficio antes de restar intereses, impuestos, depreciaciones y amortizaciones. ' +
       'Es lo que gana el negocio por su actividad, sin contar cómo se financia.'},
    {id: 'crec', etiqueta: 'Crecimiento de ventas (5 años)', min: -5, max: 15, paso: 0.5,
     valor: cfg.crecimiento || 3, formato: pct,
     ayuda: 'Cuánto esperas que crezcan las ventas cada año, de media, en los próximos cinco. ' +
       'Un 3 % es lo que crece una economía madura; por encima del 8 % hay que justificarlo.'},
    {id: 'wacc', etiqueta: 'Tasa de descuento (WACC)', min: 6, max: 18, paso: 0.1,
     valor: cfg.wacc || 10.3, formato: pct,
     ayuda: 'La rentabilidad que exige quien pone el dinero. Cuanto más riesgo, más alta. ' +
       'Entre el 8 % y el 12 % es lo habitual en una empresa española mediana.'},
    {id: 'g', etiqueta: 'Crecimiento perpetuo', min: 0, max: 3.5, paso: 0.1,
     valor: cfg.g || 1.5, formato: pct,
     ayuda: 'Cuánto crecerá la empresa para siempre, después del año cinco. Se toma entre el 1 % ' +
       'y el 2 % porque ninguna empresa crece por encima de su economía eternamente: sería ' +
       'acabar siendo más grande que el país.'}
  ];

  contenedor.innerHTML = `
    <div class="panel">
      <div class="sliders">
        ${campos.map(c => `
          <div class="slider">
            <label for="s_${c.id}">${c.etiqueta}</label>
            <input id="s_${c.id}" type="range" min="${c.min}" max="${c.max}"
                   step="${c.paso}" value="${c.valor}">
            <div class="valor" id="v_${c.id}"></div>
            ${ayuda(c.ayuda)}
          </div>`).join('')}
      </div>
      <div class="resultado">
        <div class="cifra" id="valor">—</div>
        <div class="nota" id="nota"></div>
      </div>
      <svg id="grafico" class="grafico" viewBox="0 0 800 150" preserveAspectRatio="none"></svg>
      <div class="aviso">La curva muestra el valor para cada tasa de descuento entre el 6 % y el
        18 %, con los demás parámetros como los tengas. El punto dorado es tu situación.</div>
    </div>`;

  const leer = () => campos.reduce((acc, c) => {
    acc[c.id] = Number(document.getElementById('s_' + c.id).value);
    return acc;
  }, {});

  function calcular(ebitda, crecimiento, wacc, g) {
    const impuesto = ebitda * 0.25;
    let flujo = ebitda - impuesto, pv = 0;
    for (let anio = 1; anio <= 5; anio++) {
      const tasa = crecimiento / 100 + (g / 100 - crecimiento / 100) * (anio - 1) / 4;
      flujo *= (1 + tasa);
      pv += flujo / Math.pow(1 + wacc / 100, anio);
    }
    const terminal = flujo * (1 + g / 100) / (wacc / 100 - g / 100);
    return pv + terminal / Math.pow(1 + wacc / 100, 5);
  }

  function pintar() {
    const d = leer();
    campos.forEach(c => {
      document.getElementById('v_' + c.id).textContent = c.formato(d[c.id]);
    });
    const actual = calcular(d.ebitda, d.crec, d.wacc, d.g);
    document.getElementById('valor').textContent = euros(actual);

    const otro = calcular(d.ebitda, d.crec, d.wacc + 1, d.g);
    const caida = (otro - actual) / actual * 100;
    document.getElementById('nota').textContent =
      `Si la tasa subiera un punto (al ${pct(d.wacc + 1)}), el valor sería ${euros(otro)}: ` +
      `un ${Math.abs(caida).toFixed(0)} % ${caida < 0 ? 'menos' : 'más'}.`;

    const puntos = [];
    let min = Infinity, max = -Infinity;
    for (let w = 6; w <= 18.01; w += 0.5) {
      const v = calcular(d.ebitda, d.crec, w, d.g);
      puntos.push([w, v]); min = Math.min(min, v); max = Math.max(max, v);
    }
    const ancho = 800, alto = 150, m = 8;
    const x = w => m + (w - 6) / 12 * (ancho - 2 * m);
    const y = v => alto - m - (v - min) / (max - min || 1) * (alto - 2 * m);
    const linea = puntos.map(([w, v], i) => `${i ? 'L' : 'M'}${x(w).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

    document.getElementById('grafico').innerHTML = `
      <path d="${linea}" fill="none" stroke="#0A1628" stroke-width="2.5"/>
      <line x1="${x(d.wacc)}" y1="0" x2="${x(d.wacc)}" y2="${alto}" stroke="#C9963A"
            stroke-width="1" stroke-dasharray="4 4"/>
      <circle cx="${x(d.wacc)}" cy="${y(actual)}" r="6" fill="#C9963A"/>
      <text x="${m}" y="${alto - 2}" font-size="10" fill="#8A94A6">6 %</text>
      <text x="${ancho - m - 22}" y="${alto - 2}" font-size="10" fill="#8A94A6">18 %</text>`;
  }

  campos.forEach(c =>
    document.getElementById('s_' + c.id).addEventListener('input', pintar));
  pintar();
}

/* ---------------------------------------------------------------- WACC */
function componenteWacc(contenedor, cfg) {
  const campos = [
    {id: 'rf', etiqueta: 'Bono del Estado a 10 años', min: 0, max: 7, paso: 0.05, valor: 3.3,
     ayuda: 'Lo que paga el Estado español por su deuda. Es la base: quien invierte en una ' +
       'empresa exige al menos eso, porque prestar al Estado es lo más seguro que existe.'},
    {id: 'prima', etiqueta: 'Prima de riesgo del mercado', min: 3, max: 9, paso: 0.1, valor: 5.5,
     ayuda: 'Lo que se pide por encima del bono por invertir en bolsa en general. La historia ' +
       'española y europea ronda el 5-6 %.'},
    {id: 'beta', etiqueta: 'Beta (sensibilidad al mercado)', min: 0.4, max: 1.8, paso: 0.05,
     valor: 1.0,
     ayuda: 'Cuánto se mueve la empresa cuando se mueve el mercado. 1 significa que se mueve ' +
       'igual; 1,4 que cae un 40 % más cuando todo cae. Las cíclicas suben de beta.'},
    {id: 'tamano', etiqueta: 'Prima por ser pequeña', min: 0, max: 5, paso: 0.1, valor: 2.0,
     ayuda: 'Una pyme no cotiza: venderla cuesta meses y hay pocos compradores. Esa falta de ' +
       'liquidez se cobra con una prima, habitualmente entre el 1 % y el 3 %.'}
  ];

  contenedor.innerHTML = `
    <div class="panel">
      <div class="sliders">
        ${campos.map(c => `
          <div class="slider">
            <label for="w_${c.id}">${c.etiqueta}</label>
            <input id="w_${c.id}" type="range" min="${c.min}" max="${c.max}"
                   step="${c.paso}" value="${c.valor}">
            <div class="valor" id="wv_${c.id}"></div>
            ${ayuda(c.ayuda)}
          </div>`).join('')}
      </div>
      <div class="resultado">
        <div class="cifra" id="wacc_total">—</div>
        <div class="nota">tasa de descuento resultante</div>
      </div>
      <div id="desglose" style="margin-top:16px"></div>
      <div class="aviso" id="wacc_aviso"></div>
    </div>`;

  function pintar() {
    const rf = Number(document.getElementById('w_rf').value);
    const prima = Number(document.getElementById('w_prima').value);
    const beta = Number(document.getElementById('w_beta').value);
    const tamano = Number(document.getElementById('w_tamano').value);

    document.getElementById('wv_rf').textContent = pct(rf);
    document.getElementById('wv_prima').textContent = pct(prima);
    document.getElementById('wv_beta').textContent = beta.toFixed(2).replace('.', ',');
    document.getElementById('wv_tamano').textContent = pct(tamano);

    const riesgoMercado = prima * beta;
    const total = rf + riesgoMercado + tamano;
    document.getElementById('wacc_total').textContent = pct(total);

    const partes = [
      ['Bono del Estado', rf, '#0A1628'],
      ['Riesgo de mercado (prima × beta)', riesgoMercado, '#C9963A'],
      ['Prima por tamaño', tamano, '#8A6420']
    ];
    document.getElementById('desglose').innerHTML = partes.map(([n, v, color]) => `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;font-size:14px">
        <div style="width:220px;color:var(--muted)">${n}</div>
        <div style="flex:1;height:22px;background:#F1ECE0;border-radius:4px;overflow:hidden">
          <div style="width:${(v / total * 100).toFixed(1)}%;height:100%;background:${color}"></div>
        </div>
        <div style="width:70px;text-align:right;font-weight:500">${pct(v)}</div>
      </div>`).join('');

    const aviso = document.getElementById('wacc_aviso');
    aviso.textContent = total < 7
      ? 'Una tasa por debajo del 7 % para una pyme es difícil de defender: apenas cubre el bono ' +
        'más la prima de mercado, sin compensar el riesgo de tamaño.'
      : total > 15
      ? 'Por encima del 15 % la valoración se hunde. Comprueba que no estás sumando dos veces el ' +
        'mismo riesgo: la prima por tamaño y la beta ya recogen parte de lo mismo.'
      : 'En este rango la tasa es defendible para una empresa española de tamaño medio: entre el ' +
        'bono, el riesgo de mercado y la falta de liquidez.';
  }

  campos.forEach(c =>
    document.getElementById('w_' + c.id).addEventListener('input', pintar));
  pintar();
}

/* ---------------------------------------------------------- diagnóstico */
function componenteDiagnostico(contenedor, cfg) {
  contenedor.innerHTML = `
    <div class="panel">
      <div class="diag">
        <div class="entrada"><label for="d_ventas">Ventas (€)</label>
          <input id="d_ventas" type="number" value="${cfg.ventas || 2500000}">
          ${ayuda('Todo lo facturado en el año, sin IVA.')}</div>
        <div class="entrada"><label for="d_ebitda">EBITDA (€)</label>
          <input id="d_ebitda" type="number" value="${cfg.ebitda || 350000}">
          ${ayuda('Beneficio antes de intereses, impuestos, depreciaciones y amortizaciones.')}</div>
        <div class="entrada"><label for="d_deuda">Deuda financiera (€)</label>
          <input id="d_deuda" type="number" value="${cfg.deuda || 400000}">
          ${ayuda('Préstamos y pólizas con bancos. No incluye lo que se debe a proveedores.')}</div>
        <div class="entrada"><label for="d_caja">Caja (€)</label>
          <input id="d_caja" type="number" value="${cfg.caja || 150000}">
          ${ayuda('Dinero en cuenta y cheques pendientes de cobro. No son existencias.')}</div>
        <div class="entrada"><label for="d_capex">Inversión del año (€)</label>
          <input id="d_capex" type="number" value="${cfg.capex || 80000}">
          ${ayuda('Compras de máquinas, vehículos o locales. No cuenta comprar participaciones.')}</div>
        <div class="entrada"><label for="d_perfil">Tipo de empresa</label>
          <select id="d_perfil">
            <option value="industria">Industria o servicios</option>
            <option value="comercio">Comercio o distribución</option>
            <option value="tecnologia">Tecnología o software</option>
          </select>
          ${ayuda('Cambia los umbrales: no se juzga igual el margen de un supermercado que el de una empresa de software.')}</div>
      </div>
      <div class="veredictos" id="veredictos"></div>
      <div id="resumen" style="margin-top:18px;font-size:14.5px;color:#3A4459"></div>
    </div>`;

  const UMBRAL = {
    industria: {margenBien: 15, margenMedio: 8},
    comercio: {margenBien: 7, margenMedio: 3},
    tecnologia: {margenBien: 22, margenMedio: 12}
  };

  function nivel(valor, bien, medio, invertido) {
    if (invertido) {
      if (valor <= bien) return 'bien';
      if (valor <= medio) return 'medio';
      return 'mal';
    }
    if (valor >= bien) return 'bien';
    if (valor >= medio) return 'medio';
    return 'mal';
  }

  function pintar() {
    const ventas = Number(document.getElementById('d_ventas').value) || 0;
    const ebitda = Number(document.getElementById('d_ebitda').value) || 0;
    const deuda = Number(document.getElementById('d_deuda').value) || 0;
    const caja = Number(document.getElementById('d_caja').value) || 0;
    const capex = Number(document.getElementById('d_capex').value) || 0;
    const perfil = document.getElementById('d_perfil').value;
    const u = UMBRAL[perfil];

    const margen = ventas ? ebitda / ventas * 100 : 0;
    const apalancamiento = ebitda ? (deuda - caja) / ebitda : 0;
    const esfuerzo = ebitda ? capex / ebitda * 100 : 0;

    const n1 = nivel(margen, u.margenBien, u.margenMedio, false);
    const n2 = nivel(apalancamiento, 2, 3.5, true);
    const n3 = nivel(esfuerzo, 40, 70, true);

    const textos = {
      bien: {1: 'Aguanta un año malo sin recortar.', 2: 'Duerme tranquila.', 3: 'Puede crecer sin pedir dinero.'},
      medio: {1: 'Justo: un bache se nota.', 2: 'Vive con la atención puesta en el banco.', 3: 'Crece, pero necesita financiación.'},
      mal: {1: 'Sin colchón: cualquier subida de costes se come el beneficio.', 2: 'Un tropiezo la lleva a negociar con el banco.', 3: 'Invierte más de lo que gana: el crecimiento se paga con deuda.'}
    };

    const tarjetas = [
      {rotulo: '1', titulo: 'Margen sobre ventas', valor: pct(margen), nivel: n1,
       ancho: Math.min(100, margen / 30 * 100)},
      {rotulo: '2', titulo: 'Deuda neta / EBITDA', valor: apalancamiento.toFixed(1).replace('.', ',') + '×',
       nivel: n2, ancho: Math.min(100, apalancamiento / 6 * 100)},
      {rotulo: '3', titulo: 'Inversión / EBITDA', valor: pct(esfuerzo), nivel: n3,
       ancho: Math.min(100, esfuerzo / 120 * 100)}
    ];

    document.getElementById('veredictos').innerHTML = tarjetas.map(t => `
      <div class="veredicto ${t.nivel}">
        <div class="titulo">${t.titulo}</div>
        <div class="valor">${t.valor}</div>
        <div class="barra"><div style="width:${t.ancho}%;background:${t.nivel === 'bien' ? '#2F7D5C' : t.nivel === 'medio' ? '#B8871F' : '#B4462F'}"></div></div>
        <div class="texto">${textos[t.nivel][t.rotulo]}</div>
      </div>`).join('');

    const bienes = [n1, n2, n3].filter(n => n === 'bien').length;
    const males = [n1, n2, n3].filter(n => n === 'mal').length;
    document.getElementById('resumen').innerHTML = males === 0 && bienes >= 2
      ? '<strong>Negocio sólido.</strong> Las tres respuestas salen bien o aceptablemente. La valoración puede basarse en los números.'
      : males >= 2
      ? '<strong>Aquí la valoración no es lo primero.</strong> Dos de las tres respuestas son malas: antes de calcular el valor hay que hablar de riesgo.'
      : '<strong>Negocio con matices.</strong> Una respuesta floja no lo invalida, pero debe reflejarse en la tasa de descuento o en el precio.';
  }

  ['d_ventas', 'd_ebitda', 'd_deuda', 'd_caja', 'd_capex', 'd_perfil'].forEach(id =>
    document.getElementById(id).addEventListener('input', pintar));
  pintar();
}

/* ----------------------------------------------------------- comparador */
function componenteComparador(contenedor, cfg) {
  const pares = cfg.pares;

  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:16px">${cfg.enunciado || ''}</p>
      <div style="display:grid;gap:8px;margin-bottom:18px">
        ${pares.map((p, i) => `
          <label class="par" data-i="${i}">
            <input type="checkbox" ${p.incluido ? 'checked' : ''} data-i="${i}">
            <span class="nombre">${p.nombre}</span>
            <span class="mult">${p.multiple.toFixed(1).replace('.', ',')}×</span>
            <span class="nota">${p.nota}</span>
          </label>`).join('')}
      </div>
      <div class="resultado">
        <div class="cifra" id="c_valor">—</div>
        <div class="nota" id="c_nota"></div>
      </div>
      <div id="c_rango" style="margin-top:14px"></div>
      <div class="aviso">${cfg.aviso || ''}</div>
    </div>`;

  function pintar() {
    const elegidos = [...contenedor.querySelectorAll('input[data-i]:checked')]
      .map(c => pares[Number(c.dataset.i)]);
    const caja = document.getElementById('c_valor');

    if (!elegidos.length) {
      caja.textContent = '—';
      document.getElementById('c_nota').textContent = 'Selecciona al menos una empresa.';
      document.getElementById('c_rango').innerHTML = '';
      return;
    }

    const multiplos = elegidos.map(p => p.multiple).sort((a, b) => a - b);
    const media = multiplos.reduce((a, b) => a + b, 0) / multiplos.length;
    const mediana = multiplos.length % 2
      ? multiplos[(multiplos.length - 1) / 2]
      : (multiplos[multiplos.length / 2 - 1] + multiplos[multiplos.length / 2]) / 2;

    const valor = cfg.ebitda * mediana - cfg.deudaNeta;
    caja.textContent = euros(valor);
    document.getElementById('c_nota').textContent =
      `Mediana ${mediana.toFixed(1).replace('.', ',')}× sobre ${euros(cfg.ebitda)} de EBITDA, ` +
      `menos ${euros(cfg.deudaNeta)} de deuda neta. Media ${media.toFixed(1).replace('.', ',')}×.`;

    const min = Math.min(...multiplos), max = Math.max(...multiplos);
    document.getElementById('c_rango').innerHTML =
      `<div style="font-size:13px;color:var(--muted);margin-bottom:6px">Rango de valor según el ` +
      `múltiplo elegido</div>
      <div style="display:flex;height:26px;border-radius:5px;overflow:hidden;font-size:12px">
        <div style="flex:1;background:#EAF5EF;display:flex;align-items:center;justify-content:center;color:#2F7D5C">
          ${euros(cfg.ebitda * min - cfg.deudaNeta)}</div>
        <div style="flex:1;background:#FBF7EC;display:flex;align-items:center;justify-content:center;color:#8A6420">
          ${euros(cfg.ebitda * mediana - cfg.deudaNeta)}</div>
        <div style="flex:1;background:#FBEDEA;display:flex;align-items:center;justify-content:center;color:#B4462F">
          ${euros(cfg.ebitda * max - cfg.deudaNeta)}</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);margin-top:4px">
        <span>${min.toFixed(1).replace('.', ',')}×</span>
        <span>mediana</span>
        <span>${max.toFixed(1).replace('.', ',')}×</span>
      </div>`;
  }

  contenedor.querySelectorAll('input[data-i]').forEach(c =>
    c.addEventListener('change', pintar));
  pintar();
}


/* -------------------------------------------------------- normalizador */
function componenteNormalizador(contenedor, cfg) {
  const partidas = cfg.partidas;

  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:16px">${cfg.enunciado || ''}</p>
      <div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:6px">
        <div style="font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em">
          EBITDA declarado</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:26px">${euros(cfg.ebitda)}</div>
      </div>
      <div style="display:grid;gap:9px;margin:16px 0">
        ${partidas.map((p, i) => `
          <label class="par" data-i="${i}" style="align-items:flex-start">
            <input type="checkbox" data-i="${i}" ${p.ajustar ? 'checked' : ''}>
            <span class="nombre" style="flex:1">
              ${p.concepto}
              <div class="ayuda-campo" style="margin-top:4px">${p.explicacion}</div>
            </span>
            <span class="mult" style="min-width:110px">${euros(p.importe)}</span>
          </label>`).join('')}
      </div>
      <div class="resultado">
        <div class="cifra" id="n_valor">—</div>
        <div class="nota" id="n_nota"></div>
      </div>
      <div id="n_detalle" style="margin-top:14px;font-size:13.5px;color:#3A4459"></div>
    </div>`;

  function pintar() {
    const marcadas = [...contenedor.querySelectorAll('input[data-i]:checked')]
      .map(c => partidas[Number(c.dataset.i)]);

    const suma = marcadas.reduce((t, p) => t + p.signo * p.importe, 0);
    const normalizado = cfg.ebitda + suma;

    document.getElementById('n_valor').textContent = euros(normalizado);
    document.getElementById('n_nota').textContent = suma === 0
      ? 'sin ajustes: el beneficio que ves es el que hay'
      : `${suma > 0 ? 'sumas' : 'restas'} ${euros(Math.abs(suma))} al declarado`;

    const lineas = marcadas.map(p =>
      `<div style="display:flex;justify-content:space-between;padding:5px 0;
                   border-bottom:1px solid #F1ECE0">
         <span>${p.concepto}</span>
         <span style="color:${p.signo > 0 ? '#2F7D5C' : '#B4462F'}">
           ${p.signo > 0 ? '+' : '−'}${euros(p.importe)}</span>
       </div>`).join('');

    const efecto = cfg.ebitda ? (normalizado - cfg.ebitda) / cfg.ebitda * 100 : 0;
    document.getElementById('n_detalle').innerHTML = lineas +
      `<div style="margin-top:10px;color:var(--muted)">
         Un comprador pagaría por el beneficio normalizado, no por el declarado.
         Aquí la diferencia es del ${efecto.toFixed(1).replace('.', ',')} %.
       </div>`;
  }

  contenedor.querySelectorAll('input[data-i]').forEach(c =>
    c.addEventListener('change', pintar));
  pintar();
}


/* --------------------------------------------------------- proyección */
function componenteProyeccion(contenedor, cfg) {
  const ebitda = cfg.ebitda || 350000;

  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:18px">${cfg.enunciado || ''}</p>

      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px">
        ${[1, 2, 3, 4, 5].map(a => `
          <div>
            <label style="font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;
                          color:var(--muted)">Año ${a}</label>
            <input id="p_a${a}" type="number" step="0.5" value="${cfg.crecimientos[a - 1]}"
                   style="width:100%;padding:8px 10px;border:1px solid #D9DEE6;border-radius:6px;
                          font-family:inherit;font-size:14px">
            <div style="font-size:11px;color:var(--muted)">% crecimiento</div>
          </div>`).join('')}
      </div>

      <div class="sliders" style="margin-bottom:16px">
        <div class="slider">
          <label for="p_wacc">Tasa de descuento</label>
          <input id="p_wacc" type="range" min="6" max="18" step="0.1" value="${cfg.wacc || 10.3}">
          <div class="valor" id="p_vwacc"></div>
        </div>
        <div class="slider">
          <label for="p_g">Crecimiento perpetuo</label>
          <input id="p_g" type="range" min="0" max="3.5" step="0.1" value="${cfg.g || 1.5}">
          <div class="valor" id="p_vg"></div>
          <div class="ayuda-campo">Lo que crece la empresa para siempre después del año 5.
            Por encima del 2 % hay que justificarlo muy bien.</div>
        </div>
      </div>

      <div class="resultado">
        <div class="cifra" id="p_valor">—</div>
        <div class="nota" id="p_nota"></div>
      </div>

      <div style="margin-top:18px" id="p_split"></div>
      <div id="p_tabla" style="margin-top:16px"></div>
      <div class="aviso" id="p_aviso"></div>
    </div>`;

  function pintar() {
    const crecimientos = [1, 2, 3, 4, 5].map(a =>
      Number(document.getElementById('p_a' + a).value) || 0);
    const wacc = Number(document.getElementById('p_wacc').value);
    const g = Number(document.getElementById('p_g').value);
    document.getElementById('p_vwacc').textContent = pct(wacc);
    document.getElementById('p_vg').textContent = pct(g);

    const impuesto = ebitda * 0.25;
    let flujo = ebitda - impuesto;
    let pv = 0;
    const filas = [];
    crecimientos.forEach((c, i) => {
      flujo = flujo * (1 + c / 100);
      const actual = flujo / Math.pow(1 + wacc / 100, i + 1);
      pv += actual;
      filas.push({anio: i + 1, crec: c, flujo, actual});
    });

    const terminal = flujo * (1 + g / 100) / (wacc / 100 - g / 100);
    const pvTerminal = terminal / Math.pow(1 + wacc / 100, 5);
    const total = pv + pvTerminal;
    const pesoTerminal = total ? pvTerminal / total * 100 : 0;

    document.getElementById('p_valor').textContent = euros(total);
    document.getElementById('p_nota').textContent =
      `de los cuales ${euros(pvTerminal)} (${pesoTerminal.toFixed(0)} %) están en el valor terminal`;

    document.getElementById('p_split').innerHTML = `
      <div style="font-size:12.5px;color:var(--muted);margin-bottom:6px">
        Reparto del valor</div>
      <div style="display:flex;height:30px;border-radius:5px;overflow:hidden;font-size:12px">
        <div style="width:${100 - pesoTerminal}%;background:#0A1628;color:#fff;
                    display:flex;align-items:center;justify-content:center">
          ${euros(pv)}</div>
        <div style="width:${pesoTerminal}%;background:#C9963A;color:#0A1628;
                    display:flex;align-items:center;justify-content:center;font-weight:600">
          ${euros(pvTerminal)}</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;
                  color:var(--muted);margin-top:4px">
        <span>■ flujos de los años 1 a 5</span><span>■ valor terminal (año 6 en adelante)</span>
      </div>`;

    document.getElementById('p_tabla').innerHTML = `
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr style="background:#EFE7D7">
          <th style="text-align:left;padding:8px 10px;border:1px solid var(--linea)">Año</th>
          <th style="padding:8px 10px;border:1px solid var(--linea)">Crecimiento</th>
          <th style="padding:8px 10px;border:1px solid var(--linea)">Flujo</th>
          <th style="padding:8px 10px;border:1px solid var(--linea)">Valor actual</th>
        </tr>
        ${filas.map(f => `
          <tr>
            <td style="padding:7px 10px;border:1px solid var(--linea)">${f.anio}</td>
            <td style="padding:7px 10px;border:1px solid var(--linea);text-align:right">${pct(f.crec)}</td>
            <td style="padding:7px 10px;border:1px solid var(--linea);text-align:right">${euros(f.flujo)}</td>
            <td style="padding:7px 10px;border:1px solid var(--linea);text-align:right">${euros(f.actual)}</td>
          </tr>`).join('')}
        <tr style="background:#FBF7EC">
          <td colspan="3" style="padding:8px 10px;border:1px solid var(--linea)">
            Valor terminal (a perpetuidad al ${pct(g)})</td>
          <td style="padding:8px 10px;border:1px solid var(--linea);text-align:right;font-weight:600">
            ${euros(pvTerminal)}</td>
        </tr>
      </table>`;

    document.getElementById('p_aviso').textContent = pesoTerminal > 75
      ? `El ${pesoTerminal.toFixed(0)} % del valor está en el valor terminal. Cuando pasa del 75 %, ` +
        'la valoración depende casi por completo de supuestos que nadie puede comprobar. ' +
        'Baja el crecimiento perpetuo y mira cuánto se cae.'
      : pesoTerminal < 45
      ? `Solo el ${pesoTerminal.toFixed(0)} % está en el valor terminal: el valor se apoya en los ` +
        'cinco primeros años, que son más verificables. Es una valoración más robusta.'
      : `El ${pesoTerminal.toFixed(0)} % del valor está en el valor terminal. Es lo habitual: ` +
        'entre el 55 % y el 70 % en una empresa que crece. Saberlo es la mitad del análisis.';
  }

  ['p_a1', 'p_a2', 'p_a3', 'p_a4', 'p_a5', 'p_wacc', 'p_g'].forEach(id =>
    document.getElementById(id).addEventListener('input', pintar));
  pintar();
}


/* ------------------------------------------------------------- puente */
function componentePuente(contenedor, cfg) {
  const base = cfg.ebitda || 350000;

  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:18px">${cfg.enunciado || ''}</p>
      <div class="sliders">
        <div class="slider">
          <label for="u_capex">Inversión del año (capex)</label>
          <input id="u_capex" type="range" min="0" max="200000" step="5000" value="${cfg.capex || 80000}">
          <div class="valor" id="u_vcapex"></div>
          <div class="ayuda-campo">Compras de máquinas, vehículos o locales. Se resta: ese dinero
            no está disponible.</div>
        </div>
        <div class="slider">
          <label for="u_circulante">Aumento de existencias y clientes</label>
          <input id="u_circulante" type="range" min="-50000" max="150000" step="5000"
                 value="${cfg.circulante || 30000}">
          <div class="valor" id="u_vcirc"></div>
          <div class="ayuda-campo">Si fabricas más de lo que cobras, el dinero se queda en el
            almacén o en facturas sin cobrar. Puede ser negativo si cobras antes de pagar.</div>
        </div>
      </div>
      <div class="resultado">
        <div class="cifra" id="u_valor">—</div>
        <div class="nota" id="u_nota"></div>
      </div>
      <svg id="u_svg" viewBox="0 0 800 260" style="width:100%;height:260px;margin-top:14px"></svg>
      <div class="aviso" id="u_aviso"></div>
    </div>`;

  function pintar() {
    const capex = Number(document.getElementById('u_capex').value);
    const circulante = Number(document.getElementById('u_circulante').value);
    const impuesto = base * 0.25;
    const fcf = base - impuesto - capex - circulante;

    document.getElementById('u_vcapex').textContent = euros(capex);
    document.getElementById('u_vcirc').textContent = euros(circulante);
    document.getElementById('u_valor').textContent = euros(fcf);
    document.getElementById('u_nota').textContent =
      `de ${euros(base)} de beneficio, solo esto llega a la caja`;

    const pasos = [
      {etiqueta: 'EBITDA', valor: base, tipo: 'inicio'},
      {etiqueta: 'Impuestos (25 %)', valor: -impuesto, tipo: 'resta'},
      {etiqueta: 'Inversión', valor: -capex, tipo: 'resta'},
      {etiqueta: 'Circulante', valor: -circulante, tipo: 'resta'},
      {etiqueta: 'Caja libre', valor: fcf, tipo: 'total'}
    ];

    const ancho = 800, alto = 260, margen = 40;
    const escala = Math.max(base, ...pasos.map(p => Math.abs(p.valor))) * 1.15;
    const anchoHub = (ancho - 2 * margen) / pasos.length;
    let acumulado = 0;
    let svg = '';

    pasos.forEach((p, i) => {
      const x = margen + i * anchoHub + anchoHub * 0.18;
      const w = anchoHub * 0.64;
      let y, h, color;

      if (p.tipo === 'inicio') {
        h = p.valor / escala * (alto - 60);
        y = alto - 40 - h; acumulado = p.valor; color = '#0A1628';
      } else if (p.tipo === 'total') {
        h = Math.abs(p.valor) / escala * (alto - 60);
        y = alto - 40 - h; color = p.valor >= 0 ? '#C9963A' : '#B4462F';
      } else {
        const inicio = acumulado;
        acumulado += p.valor;
        const yInicio = alto - 40 - inicio / escala * (alto - 60);
        const yFin = alto - 40 - acumulado / escala * (alto - 60);
        y = Math.min(yInicio, yFin); h = Math.abs(yFin - yInicio);
        color = '#8A94A6';
      }

      svg += `<rect x="${x}" y="${y}" width="${w}" height="${Math.max(2, h)}" fill="${color}" rx="3"/>`;
      svg += `<text x="${x + w / 2}" y="${alto - 22}" font-size="11" text-anchor="middle"
              fill="#5A6478">${p.etiqueta}</text>`;
      const etiqueta = (p.tipo === 'resta' ? '−' : '') + euros(Math.abs(p.valor));
      svg += `<text x="${x + w / 2}" y="${y - 7}" font-size="11.5" text-anchor="middle"
              fill="#0A1628" font-weight="600">${etiqueta}</text>`;
    });

    document.getElementById('u_svg').innerHTML = svg;

    const proporcion = base ? fcf / base * 100 : 0;
    document.getElementById('u_aviso').textContent = proporcion < 20
      ? `Solo el ${proporcion.toFixed(0)} % del beneficio llega a la caja. La empresa gana en el ` +
        'papel, pero no tiene dinero: cualquier bache de tesorería la pone en apuros.'
      : proporcion > 60
      ? `El ${proporcion.toFixed(0)} % del beneficio llega a caja: es una empresa que convierte ` +
        'bien su resultado en dinero, y eso es lo que se puede repartir o reinvertir.'
      : `El ${proporcion.toFixed(0)} % del beneficio llega a caja. El resto se ha ido en ` +
        'impuestos, inversión y capital circulante.';
  }

  ['u_capex', 'u_circulante'].forEach(id =>
    document.getElementById(id).addEventListener('input', pintar));
  pintar();
}


/* ------------------------------------------------------------- balance */
function componenteBalance(contenedor, cfg) {
  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:16px">${cfg.enunciado || ''}</p>
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px">
        <span style="font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em">
          Valor de empresa</span>
        <span style="font-family:'Cormorant Garamond',serif;font-size:26px">${euros(cfg.ev)}</span>
      </div>
      <div class="diag">
        <div class="entrada"><label for="b_deuda">Deuda financiera (€)</label>
          <input id="b_deuda" type="number" value="${cfg.deuda}">
          <div class="ayuda-campo">Préstamos y pólizas. Se resta: el comprador la hereda.</div></div>
        <div class="entrada"><label for="b_caja">Caja disponible (€)</label>
          <input id="b_caja" type="number" value="${cfg.caja}">
          <div class="ayuda-campo">Se suma: es dinero que se lleva el comprador.</div></div>
      </div>
      <div style="display:grid;gap:8px;margin:16px 0">
        <label class="par"><input type="checkbox" id="b_inmueble" ${cfg.inmueble ? 'checked' : ''}>
          <span class="nombre" style="flex:1">Inmueble no afecto al negocio (450.000 €)
            <div class="ayuda-campo" style="margin-top:4px">Una nave alquilada a terceros. No genera
              la facturación, pero se vende aparte: se suma.</div></span></label>
        <label class="par"><input type="checkbox" id="b_participaciones" ${cfg.participaciones ? 'checked' : ''}>
          <span class="nombre" style="flex:1">Participación en otra empresa (120.000 €)
            <div class="ayuda-campo" style="margin-top:4px">Una inversión financiera. Vale dinero,
              pero no forma parte del negocio valorado.</div></span></label>
        <label class="par"><input type="checkbox" id="b_leasing" ${cfg.leasing ? 'checked' : ''}>
          <span class="nombre" style="flex:1">Deuda por arrendamiento pendiente (180.000 €)
            <div class="ayuda-campo" style="margin-top:4px">Los leases ya son deuda desde la norma
              contable actual. Muchos informes los olvidan.</div></span></label>
      </div>
      <div class="resultado">
        <div class="cifra" id="b_valor">—</div>
        <div class="nota">lo que paga el comprador por las acciones</div>
      </div>
      <div class="aviso" id="b_aviso"></div>
    </div>`;

  function pintar() {
    const deuda = Number(document.getElementById('b_deuda').value) || 0;
    const caja = Number(document.getElementById('b_caja').value) || 0;
    const inmueble = document.getElementById('b_inmueble').checked ? 450000 : 0;
    const participaciones = document.getElementById('b_participaciones').checked ? 120000 : 0;
    const leasing = document.getElementById('b_leasing').checked ? 180000 : 0;

    const equity = cfg.ev - deuda - leasing + caja + inmueble + participaciones;
    document.getElementById('b_valor').textContent = euros(equity);

    const aviso = document.getElementById('b_aviso');
    aviso.textContent = equity < 0
      ? 'Las acciones no valen nada: la deuda supera el valor de la empresa. En ese caso se ' +
        'negocia con los acreedores, no se compra.'
      : leasing === 0
      ? 'Ojo: has dejado el arrendamiento fuera. Si la empresa tiene leasing, es deuda y resta. ' +
        'Marcarlo cambia el resultado en 180.000 €.'
      : 'El puente está completo: valor de empresa, menos deuda (incluidos leases), más caja y ' +
        'más lo que vale pero no genera la facturación.';
  }

  ['b_deuda', 'b_caja', 'b_inmueble', 'b_participaciones', 'b_leasing'].forEach(id =>
    document.getElementById(id).addEventListener('input', pintar));
  ['b_inmueble', 'b_participaciones', 'b_leasing'].forEach(id =>
    document.getElementById(id).addEventListener('change', pintar));
  pintar();
}


/* ------------------------------------------------------------- detector */
function componenteDetector(contenedor, cfg) {
  let acertadas = 0, respondidas = 0;

  contenedor.innerHTML = `
    <div class="panel">
      <p style="font-size:14px;color:var(--muted);margin-bottom:16px">${cfg.enunciado || ''}</p>
      ${cfg.afirmaciones.map((a, i) => `
        <div class="pregunta" id="f${i}" style="margin-bottom:12px">
          <div class="enunciado">«${a.texto}»</div>
          <div style="display:flex;gap:10px">
            <button class="opcion" style="width:auto;padding:9px 18px" data-f="${i}" data-v="1">
              Es correcto</button>
            <button class="opcion" style="width:auto;padding:9px 18px" data-f="${i}" data-v="0">
              Es un error</button>
          </div>
          <div class="explica" id="fe${i}">${a.explicacion}</div>
        </div>`).join('')}
      <div id="f_marcador" style="font-weight:500;margin-top:8px"></div>
    </div>`;

  contenedor.querySelectorAll('button[data-f]').forEach(boton => {
    boton.addEventListener('click', () => {
      const i = Number(boton.dataset.f);
      const caja = document.getElementById('f' + i);
      if (caja.dataset.respondida) return;
      caja.dataset.respondida = '1';
      const a = cfg.afirmaciones[i];
      const elegido = boton.dataset.v === '1';

      caja.querySelectorAll('button[data-f]').forEach(b => {
        b.disabled = true;
        const valor = b.dataset.v === '1';
        if (valor === a.correcta) b.classList.add('bien');
        else if (valor === elegido) b.classList.add('mal');
      });
      document.getElementById('fe' + i).classList.add('visible');
      respondidas++;
      if (elegido === a.correcta) acertadas++;

      const marcador = document.getElementById('f_marcador');
      if (respondidas === cfg.afirmaciones.length) {
        marcador.textContent = acertadas === cfg.afirmaciones.length
          ? `Has detectado los ${acertadas}. Ya puedes leer un informe ajeno con criterio.`
          : `Has acertado ${acertadas} de ${cfg.afirmaciones.length}. Lee las explicaciones de las que fallaste.`;
      } else {
        marcador.textContent = `Llevas ${acertadas} de ${respondidas}.`;
      }
    });
  });
}

const COMPONENTES = {
  simulador: componenteSimulador,
  wacc: componenteWacc,
  diagnostico: componenteDiagnostico,
  comparador: componenteComparador,
  normalizador: componenteNormalizador,
  proyeccion: componenteProyeccion,
  puente: componentePuente,
  balance: componenteBalance,
  detector: componenteDetector
};

/* --------------------------------------------------------------- página */
function cargarLeccion(numero) {
  const leccion = CURSO.lecciones.find(l => l.numero === numero);
  if (!leccion || !leccion.publicada) return false;

  document.title = `${leccion.tituloCorto} · Curso CriterioFinanciero`;
  document.getElementById('modulo').textContent = leccion.modulo;
  document.getElementById('titulo').textContent = leccion.tituloCorto;
  document.getElementById('entradilla').textContent = leccion.entradilla;
  document.getElementById('progreso').textContent = `Lección ${numero} de ${CURSO.lecciones.length}`;
  document.getElementById('video').src = `videos/leccion_${String(numero).padStart(2, '0')}.mp4`;

  montarQuiz(document.getElementById('quiz'), leccion.preguntas, acertadas => {
    const total = leccion.preguntas.length;
    const texto = acertadas === total
      ? `${acertadas} de ${total}. Perfecto: puedes pasar a la siguiente.`
      : acertadas >= Math.ceil(total * 0.6)
      ? `${acertadas} de ${total}. Bien. Lee la explicación de las que fallaste.`
      : `${acertadas} de ${total}. Vuelve al vídeo antes de seguir: es corto.`;
    document.getElementById('marcador').textContent = texto;
    try {
      localStorage.setItem('curso_l' + numero, JSON.stringify({nota: acertadas, total,
        fecha: new Date().toISOString()}));
    } catch (e) {}
  });

  const seccion = document.getElementById('interaccion');
  if (leccion.interaccion) {
    document.getElementById('interaccion-titulo').textContent = leccion.interaccion.titulo;
    document.getElementById('interaccion-intro').textContent = leccion.interaccion.intro;
    COMPONENTES[leccion.interaccion.tipo](document.getElementById('interaccion-caja'),
      leccion.interaccion);
  } else {
    seccion.style.display = 'none';
  }

  const siguiente = CURSO.lecciones.find(l => l.numero === numero + 1);
  const caja = document.getElementById('siguiente');
  if (siguiente && siguiente.publicada) {
    caja.innerHTML = `
      <div><div style="font-size:13px;color:var(--muted)">Siguiente</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:22px">
        ${siguiente.numero} · ${siguiente.tituloCorto}</div></div>
      <a class="accion" href="leccion.html?l=${siguiente.numero}">Ir a la lección ${siguiente.numero}</a>`;
  } else if (siguiente) {
    caja.innerHTML = `
      <div><div style="font-size:13px;color:var(--muted)">Siguiente</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:22px">
        ${siguiente.numero} · ${siguiente.tituloCorto}</div></div>
      <button class="accion" disabled>En preparación</button>`;
  } else {
    caja.innerHTML = '<a class="accion" href="index.html">Volver al índice del curso</a>';
  }

  let previo = null;
  try { previo = JSON.parse(localStorage.getItem('curso_l' + numero) || 'null'); } catch (e) {}
  if (previo) {
    document.getElementById('progreso').textContent += ` · ya hecha (${previo.nota}/${previo.total})`;
  }
  return true;
}
