# Pini — Asistente de Alfonso Cárdenas (GNP Seguros)

Asistente virtual conversacional que ayuda a clientes de Alfonso Cárdenas con dudas sobre sus pólizas, siniestros, uso del seguro y consejos prácticos.

## Estructura

- `index.html` → Frontend (chat completo, estilos y lógica)
- `api/chat.js` → Endpoint serverless que conecta a la API de Anthropic
- `README.md` → Este archivo

## Stack
- Hosting: Vercel
- IA: Claude Sonnet 4.6 (Anthropic)
- Frontend: HTML + CSS + JS vanilla

## Variables de entorno (Vercel)
- `ANTHROPIC_API_KEY` → Tu API key de Anthropic
