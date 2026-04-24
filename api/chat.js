// /api/chat.js
// Endpoint que conecta a Pini con la API de Anthropic (Claude)
// Mantiene la API key segura del lado del servidor

export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validar que existe la API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY no configurada en variables de entorno');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  const { system, messages } = req.body;

  // Validación básica de payload
  if (!system || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Payload inválido' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        // Modelo más reciente de Claude (rápido y excelente para conversación natural)
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: system,
        messages: messages,
      }),
    });

    const data = await response.json();

    // Si la API de Anthropic regresó error, lo propagamos con info útil
    if (!response.ok) {
      console.error('Error de Anthropic:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Error en la API de Claude',
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error al conectar con Anthropic:', error);
    res.status(500).json({ error: 'Error al conectar con la API' });
  }
}
