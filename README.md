# Chat medico virtual

## Requisitos

1. Clonar proyecto.
2. Añadir variables de entorno con el archivo (.env) en la raiz del proyecto.
   Las variables son.
   CORS_ORIGIN=*
   DEPLOY=false
   OPENAI_API_KEY=***
   PROMPT=promptEs

   -Con Deploy en false te dara siempre la misma respuesta de prueba.
   -Si deseas que la inteligencia artificial analice los sintomas, debes agregar una
   API_KEY de OPENAI valida
   -Si cambias la variable de entorno PROMPT a promptEn, activaras el analisis en ingles.
3. Instalar dependencias con el comando (npm install) desde la raiz del proyecto.

## Ejecución

Debes ejecutar el comando (npm run dev) para ejecutar. Puedes verificar el puerto desde el log del sistema.