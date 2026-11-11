"""Amplía el test de perfil: más datos, opción de no contestar y veredicto matizado."""
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INDEX = RAIZ / "index.html"
HTML = INDEX.read_text(encoding="utf-8")


def reemplazar(viejo: str, nuevo: str, etiqueta: str) -> None:
    global HTML
    if viejo not in HTML:
        if nuevo in HTML:
            print(f"  ya aplicado: {etiqueta}")
            return
        raise SystemExit(f"  NO ENCONTRADO: {etiqueta}")
    HTML = HTML.replace(viejo, nuevo, 1)
    print(f"  aplicado: {etiqueta}")


PREGUNTAS = '''      <div class="m-card">
        <div class="m-card-q">¿En qué tramo de edad estás? <span style="font-weight:400;color:var(--muted)">(opcional)</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem">
          <button class="m-yn" data-g="edad" onclick="mSelDato('edad','18-30',this,'edad')">18-30</button>
          <button class="m-yn" data-g="edad" onclick="mSelDato('edad','31-45',this,'edad')">31-45</button>
          <button class="m-yn" data-g="edad" onclick="mSelDato('edad','46-55',this,'edad')">46-55</button>
          <button class="m-yn" data-g="edad" onclick="mSelDato('edad','56+',this,'edad')">56 o más</button>
          <button class="m-yn" data-g="edad" onclick="mSelDato('edad','nc',this,'edad')">Prefiero no contestar</button>
        </div>
      </div>
      <div class="m-card">
        <div class="m-card-q">¿Cuál es tu situación laboral?</div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem">
          <button class="m-yn" data-g="laboral" onclick="mSelDato('laboral','ajena',this,'laboral')">Cuenta ajena</button>
          <button class="m-yn" data-g="laboral" onclick="mSelDato('laboral','autonomo',this,'laboral')">Autónomo/a</button>
          <button class="m-yn" data-g="laboral" onclick="mSelDato('laboral','paro',this,'laboral')">Sin empleo ahora</button>
          <button class="m-yn" data-g="laboral" onclick="mSelDato('laboral','jubilado',this,'laboral')">Jubilado/a</button>
          <button class="m-yn" data-g="laboral" onclick="mSelDato('laboral','nc',this,'laboral')">Prefiero no contestar</button>
        </div>
      </div>
      <div class="m-card">
        <div class="m-card-q">¿Cuántos años llevas cotizados? <span style="font-weight:400;color:var(--muted)">(opcional)</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem">
          <button class="m-yn" data-g="cotizados" onclick="mSelDato('cotizados','menos5',this,'cotizados')">Menos de 5</button>
          <button class="m-yn" data-g="cotizados" onclick="mSelDato('cotizados','5-15',this,'cotizados')">5-15</button>
          <button class="m-yn" data-g="cotizados" onclick="mSelDato('cotizados','15-25',this,'cotizados')">15-25</button>
          <button class="m-yn" data-g="cotizados" onclick="mSelDato('cotizados','25+',this,'cotizados')">Más de 25</button>
          <button class="m-yn" data-g="cotizados" onclick="mSelDato('cotizados','nc',this,'cotizados')">Prefiero no contestar</button>
        </div>
      </div>
      <div class="m-card">
        <div class="m-card-q">¿Qué formación financiera tienes?</div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem">
          <button class="m-yn" data-g="formacion" onclick="mSelDato('formacion','ninguna',this,'formacion')">Ninguna</button>
          <button class="m-yn" data-g="formacion" onclick="mSelDato('formacion','basica',this,'formacion')">Básica: leo y me informo</button>
          <button class="m-yn" data-g="formacion" onclick="mSelDato('formacion','media',this,'formacion')">Media: cursos</button>
          <button class="m-yn" data-g="formacion" onclick="mSelDato('formacion','alta',this,'formacion')">Alta: formación reglada</button>
          <button class="m-yn" data-g="formacion" onclick="mSelDato('formacion','nc',this,'formacion')">Prefiero no contestar</button>
        </div>
      </div>
      <div class="m-nav">
        <button class="m-back" onclick="mGoTo(1)">← Atrás</button>
        <button class="m-next" id="mn2" onclick="mGoTo(3)" disabled>Siguiente →'''

reemplazar(
    '''      <div class="m-nav">
        <button class="m-back" onclick="mGoTo(1)">← Atrás</button>
        <button class="m-next" id="mn2" onclick="mGoTo(3)" disabled>Siguiente →''',
    PREGUNTAS,
    "preguntas nuevas en la fase 2",
)

reemplazar(
    "  if(ms.da&&ms.fe&&ms.dep&&ms.exp) document.getElementById('mn2').disabled=false;\n}",
    "  chk2();\n}\n"
    "function chk2(){\n"
    "  var ok = ms.da&&ms.fe&&ms.dep&&ms.exp&&ms.edad&&ms.laboral&&ms.cotizados&&ms.formacion;\n"
    "  document.getElementById('mn2').disabled = !ok;\n"
    "}\n"
    "function mSelDato(k,v,el,g){\n"
    "  ms[k]=v;\n"
    "  document.querySelectorAll('[data-g=\"'+g+'\"]').forEach(function(b){b.classList.remove('yes')});\n"
    "  el.classList.add('yes');\n"
    "  chk2();\n"
    "}",
    "logica de seleccion de datos",
)

reemplazar(
    """function mCalcPerfil(){
  var sc=0;
  if(ms.riesgo==='1') sc+=0; else if(ms.riesgo==='2') sc+=1; else if(ms.riesgo==='3') sc+=2; else sc+=3;
  if(ms.exp==='si') sc+=1;
  if(ms.horizonte>=15) sc+=2; else if(ms.horizonte>=7) sc+=1;
  var alertas=[];
  if(ms.da==='si') alertas.push('Tienes deudas con interés alto. Amortizarlas puede ser la mejor inversión antes de empezar.');
  if(ms.fe==='no') alertas.push('Sin fondo de emergencia, cualquier imprevisto puede obligarte a deshacer posiciones en mal momento.');""",
    """function mCalcPerfil(){
  var sc=0;
  if(ms.riesgo==='1') sc+=0; else if(ms.riesgo==='2') sc+=1; else if(ms.riesgo==='3') sc+=2; else sc+=3;
  if(ms.exp==='si') sc+=1;
  if(ms.horizonte>=15) sc+=2; else if(ms.horizonte>=7) sc+=1;
  if(ms.edad==='18-30') sc+=1; else if(ms.edad==='56+') sc-=1;
  if(ms.laboral==='autonomo' && ms.fe!=='si') sc-=1;
  if(ms.cotizados==='25+') sc-=1;
  var alertas=[];
  if(ms.da==='si') alertas.push('Tienes deudas con interés alto. Amortizarlas puede ser la mejor inversión antes de empezar.');
  if(ms.fe==='no') alertas.push('Sin fondo de emergencia, cualquier imprevisto puede obligarte a deshacer posiciones en mal momento.');
  if(ms.laboral==='autonomo') alertas.push('Con ingresos de autónomo, el colchón debería cubrir 9-12 meses de gastos, no seis.');
  if(ms.cotizados==='25+' && ms.horizonte>=15) alertas.push('Te queda poco para la jubilación y planteas un horizonte muy largo: revisa si el objetivo y el plazo encajan de verdad.');
  if(ms.edad==='56+' && ms.riesgo==='4') alertas.push('Con tu edad, una caída fuerte tiene menos tiempo para recuperarse. La tolerancia que declaras y el horizonte no encajan.');
  if(ms.formacion==='ninguna') alertas.push('Antes de asumir riesgo, conviene dedicar tiempo a entender qué estás contratando. Los primeros pasos de la cartera pueden ir más despacio.');""",
    "puntuacion y alertas con los datos nuevos",
)

reemplazar(
    """  document.getElementById('m-perfil-pill').innerHTML='<div class="perfil-pill" style="background:'+color+'">Perfil '+perfil+'</div>';""",
    """  var nc=['edad','laboral','cotizados','formacion'].filter(function(k){return ms[k]==='nc'}).length;
  var prefijo = nc===0 ? 'Con alta probabilidad,' : (nc<=2 ? 'En principio,' : 'Estimación orientativa:');
  var respuestas = 8 - nc;
  document.getElementById('m-perfil-pill').innerHTML=
    '<div class="perfil-pill" style="background:'+color+'">Perfil estimado: '+perfil+'</div>'
    +'<p style="margin:.9rem 0 0;font-size:.95rem;line-height:1.6">'+prefijo+' tu perfil es <strong>'+perfil.toLowerCase()
    +'</strong>, según '+respuestas+' de las 8 preguntas respondidas.</p>'
    +'<p style="margin:.5rem 0 0;font-size:.78rem;color:var(--muted);line-height:1.5">Orientación educativa, no un perfil de idoneidad MiFID II ni una recomendación personalizada. Para una decisión real hace falta revisar tu situación completa.</p>';""",
    "veredicto matizado con grado de confianza",
)

INDEX.write_text(HTML, encoding="utf-8")
print(f"\nEscrito index.html ({len(HTML)} bytes).")
