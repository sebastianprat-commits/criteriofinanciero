# Web en modo pruebas

Desde el **12 de noviembre de 2026** criteriofinanciero.org está en modo pruebas, a la espera
de que se resuelva la situación laboral. El objetivo es que la web exista, se pueda enseñar
y capte interesados, **sin realizar ninguna actividad económica**.

## Qué está desactivado

| Elemento | Estado |
|---|---|
| Formulario de pedido | Sustituido por lista de espera (solo email) |
| Checkout | Página de aviso; el formulario está oculto |
| Precios | Ocultos en la portada, el catálogo y el checkout |
| Oferta del 25 % | Retirada |
| Botones de compra | "Disponible próximamente" / "Avísame" |
| Bizum | No se muestra ninguna instrucción de pago |

## Qué sigue funcionando

- Test de perfil (gratuito, sin datos bancarios).
- Captación de email por MailerLite (lista de espera y newsletter).
- Glosario, artículos, páginas legales y descarga del informe de muestra.
- Analítica con consentimiento.

Captar correos y publicar contenido gratuito no constituye actividad económica a efectos
del SEPE. Cobrar, sí. Por eso no hay ningún punto de pago activo.

## Cuándo revertirlo

Solo cuando:

1. Esté resuelta la compatibilización con el paro o el pago único, **y**
2. se haya consultado al SEPE el inicio de actividad, **y**
3. exista alta en el RETA y criterio fiscal claro (facturación, IVA).

Entonces hay que revertir el commit `39edb8c` ("Modo pruebas: sin venta, aviso y lista de
espera") y volver a generar:

```
cd C:\AI\Proyectos\Web\criteriofinanciero
git revert 39edb8c --no-commit
python actualizar.py --publicar
```

Eso devuelve el formulario de pedido, el checkout con Bizum, los precios y la oferta.

## Antes de abrir, pendiente

- [ ] Alta como autónomo y epígrafe correcto (asesoría / servicios financieros).
- [ ] Consulta al SEPE sobre compatibilización (15 días desde el inicio de actividad).
- [ ] Confirmar el encaje CNMV: informes genéricos, sin recomendación personalizada.
- [ ] Bizum de empresa o pasarela de pago, en lugar de la cuenta personal.
- [ ] Revisar el contrato actual por exclusividad o no concurrencia.
