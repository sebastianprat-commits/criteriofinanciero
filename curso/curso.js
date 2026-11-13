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

/* ------------------------------------------------------------ simulador */
function componenteSimulador(contenedor, cfg) {
  const campos = [
    {id: 'ebitda', etiqueta: 'Beneficio (EBITDA)', min: 50000, max: 2000000, paso: 10000,
     valor: cfg.ebitda || 350000, formato: euros},
    {id: 'crec', etiqueta: 'Crecimiento de ventas (5 años)', min: -5, max: 15, paso: 0.5,
     valor: cfg.crecimiento || 3, formato: pct},
    {id: 'wacc', etiqueta: 'Tasa de descuento (WACC)', min: 6, max: 18, paso: 0.1,
     valor: cfg.wacc || 10.3, formato: pct},
    {id: 'g', etiqueta: 'Crecimiento perpetuo', min: 0, max: 3.5, paso: 0.1,
     valor: cfg.g || 1.5, formato: pct}
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

/* ---------------------------------------------------------- diagnóstico */
function componenteDiagnostico(contenedor, cfg) {
  contenedor.innerHTML = `
    <div class="panel">
      <p class="intro" style="margin-bottom:18px">${cfg.enunciado || ''}</p>
      <div class="diag">
        <div class="entrada"><label for="d_ventas">Ventas (€)</label>
          <input id="d_ventas" type="number" value="${cfg.ventas || 2500000}"></div>
        <div class="entrada"><label for="d_ebitda">EBITDA (€)</label>
          <input id="d_ebitda" type="number" value="${cfg.ebitda || 350000}"></div>
        <div class="entrada"><label for="d_deuda">Deuda financiera (€)</label>
          <input id="d_deuda" type="number" value="${cfg.deuda || 400000}"></div>
        <div class="entrada"><label for="d_caja">Caja (€)</label>
          <input id="d_caja" type="number" value="${cfg.caja || 150000}"></div>
        <div class="entrada"><label for="d_capex">Inversión del año (€)</label>
          <input id="d_capex" type="number" value="${cfg.capex || 80000}"></div>
        <div class="entrada"><label for="d_perfil">Tipo de empresa</label>
          <select id="d_perfil" style="padding:10px 12px;border:1px solid #D9DEE6;border-radius:6px;
                  font-family:inherit;font-size:15px;background:#fff">
            <option value="industria">Industria o servicios</option>
            <option value="comercio">Comercio o distribución</option>
            <option value="tecnologia">Tecnología o software</option>
          </select></div>
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
    const deudaNeta = deuda - caja;
    const apalancamiento = ebitda ? deudaNeta / ebitda : 0;
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
      {titulo: '1 · Margen sobre ventas', valor: pct(margen), nivel: n1,
       ancho: Math.min(100, margen / 30 * 100)},
      {titulo: '2 · Deuda neta / EBITDA', valor: apalancamiento.toFixed(1).replace('.', ',') + '×',
       nivel: n2, ancho: Math.min(100, apalancamiento / 6 * 100)},
      {titulo: '3 · Inversión / EBITDA', valor: pct(esfuerzo), nivel: n3,
       ancho: Math.min(100, esfuerzo / 120 * 100)}
    ];

    document.getElementById('veredictos').innerHTML = tarjetas.map(t => `
      <div class="veredicto ${t.nivel}">
        <div class="titulo">${t.titulo}</div>
        <div class="valor">${t.valor}</div>
        <div class="barra"><div style="width:${t.ancho}%;background:${t.nivel === 'bien' ? '#2F7D5C' : t.nivel === 'medio' ? '#B8871F' : '#B4462F'}"></div></div>
        <div class="texto">${textos[t.nivel][t.titulo[0]]}</div>
      </div>`).join('');

    const bienes = [n1, n2, n3].filter(n => n === 'bien').length;
    const males = [n1, n2, n3].filter(n => n === 'mal').length;
    const resumen = document.getElementById('resumen');
    resumen.innerHTML = males === 0 && bienes >= 2
      ? '<strong>Negocio sólido.</strong> Las tres respuestas salen bien o aceptablemente. La valoración puede basarse en los números.'
      : males >= 2
      ? '<strong>Aquí la valoración no es lo primero.</strong> Dos de las tres respuestas son malas: antes de calcular el valor hay que hablar de riesgo.'
      : '<strong>Negocio con matices.</strong> Una respuesta floja no lo invalida, pero debe reflejarse en la tasa de descuento o en el precio.';
  }

  ['d_ventas', 'd_ebitda', 'd_deuda', 'd_caja', 'd_capex', 'd_perfil'].forEach(id =>
    document.getElementById(id).addEventListener('input', pintar));
  pintar();
}

const COMPONENTES = { simulador: componenteSimulador, diagnostico: componenteDiagnostico };

/* --------------------------------------------------------------- página */
function cargarLeccion(numero) {
  const leccion = CURSO.lecciones.find(l => l.numero === numero);
  if (!leccion) return false;

  document.title = `${leccion.titulo} · Curso CriterioFinanciero`;
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
