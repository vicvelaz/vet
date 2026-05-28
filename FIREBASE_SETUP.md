# Firebase Setup Guide

Guía completa para configurar Firebase como backend de contenidos dinámicos en la aplicación Angular.

---

## 1. Crear el proyecto en Firebase Console

1. Accede a [https://console.firebase.google.com](https://console.firebase.google.com).
2. Clic en **"Añadir proyecto"** → introduce el nombre del proyecto.
3. Desactiva Google Analytics si no lo necesitas → **"Crear proyecto"**.

---

## 2. Registrar la aplicación web

1. Desde la página de inicio del proyecto, haz clic en el icono **`</>`** (Web).
2. Ponle un nombre al app (e.g. `vet-web`).
3. Copia el objeto `firebaseConfig` que se genera — lo necesitarás en el siguiente paso.

---

## 3. Configurar las credenciales en la aplicación

Edita `src/environments/environment.ts` (desarrollo) y `src/environments/environment.prod.ts` (producción):

```typescript
export const environment = {
  production: false, // true en environment.prod.ts
  firebase: {
    apiKey: 'AIzaSy...',
    authDomain: 'mi-proyecto.firebaseapp.com',
    projectId: 'mi-proyecto',
    storageBucket: 'mi-proyecto.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abc123',
  },
};
```

> ⚠️ **Nunca subas estos archivos a un repositorio público.**
> Añádelos a `.gitignore` y usa variables de entorno en CI/CD.

---

## 4. Activar Firestore

1. En Firebase Console → **Firestore Database** → **"Crear base de datos"**.
2. Selecciona **"Comenzar en modo de producción"** (más seguro).
3. Elige la región más cercana a tus usuarios (e.g. `europe-west1`).

---

## 5. Estructura de datos en Firestore

La aplicación espera una **colección** llamada `app-content` con los siguientes **documentos**:

```
app-content/          ← colección
├── header            ← documento
├── footer            ← documento
├── hero              ← documento
├── services          ← documento
├── timetable         ← documento
├── contact           ← documento
├── promotions        ← documento
└── insurances        ← documento
```

### Documento: `header`

```json
{
  "name": "Valdeoso",
  "logo": "logo.webp",
  "links": [
    { "label": "Servicios", "url": "servicios" },
    { "label": "Promociones", "url": "promociones" },
    { "label": "Horario", "url": "horario" },
    { "label": "Planes", "url": "seguros" },
    { "label": "Contacto", "url": "contacto" }
  ],
  "button": {
    "label": "Solicitar Cita",
    "url": "34667357720",
    "message": "Hola, me gustaría pedir una cita."
  }
}
```

### Documento: `footer`

```json
{
  "message": "© 2025 Centro Veterinario Valdeoso. Todos los derechos reservados.",
  "links": [
    { "label": "Términos y Condiciones", "url": "/terminos-condiciones" },
    { "label": "Aviso legal", "url": "/legal" }
  ]
}
```

### Documento: `hero`

```json
{
  "title": "Centro Veterinario Valdeoso",
  "subtitle": "Dónde clínica de barrio significa cercanía y calidad médica",
  "banner": "banner-texto.webp",
  "button": {
    "primary": {
      "label": "Pedir Cita",
      "url": "34667357720",
      "message": "Hola, me gustaría pedir una cita."
    },
    "secondary": {
      "label": "Nuestros Servicios",
      "url": "servicios"
    },
    "moreInfo": {
      "label": "Descubre más",
      "url": "promociones"
    }
  }
}
```

### Documento: `services`

```json
{
  "title": "Nuestros Servicios",
  "subtitle": "Atención profesional y especializada para el bienestar de tu mascota.",
  "items": [
    {
      "icon": "stethoscope",
      "title": "Medicina interna",
      "description": "Servicio de consulta, diagnóstico, tratamiento y seguimiento..."
    }
  ]
}
```

### Documento: `timetable`

```json
{
  "title": "Horario de Atención",
  "items": [
    { "day": "Lunes a Viernes", "hours": "10:00 - 13:00" },
    { "day": "", "hours": "16:00 - 20:30" },
    { "day": "Sabado y Domingo", "hours": "Cerrado" },
    { "day": "Urgencias", "hours": "Hospital Veterinario Europeo" },
    { "day": "", "hours": "Hospital Vetsia" }
  ],
  "recomendation": {
    "icon": "fa-clock",
    "text": "Recomendamos pedir cita previa para evitar esperas."
  }
}
```

### Documento: `contact`

```json
{
  "title": "Dónde Estamos",
  "subtitle": "Encuentra fácilmente nuestra clínica...",
  "items": [
    { "icon": "place", "value": "C/ Anita Martínez, nº8 (Leganés, Madrid)" },
    { "icon": "phone", "value": "+34667357720" },
    { "icon": "email", "value": "info@centroveterinariovaldeoso.com" },
    { "icon": "clock", "value": "Lun-Vie: 10:00-13:00, 16:00-20:30" }
  ],
  "socialMedia": [
    { "icon": "instagram", "url": "https://www.instagram.com/centroveterinariovaldeoso" },
    { "icon": "whatsapp", "url": "34667357720", "message": "Hola, me gustaría pedir una cita." }
  ]
}
```

### Documento: `promotions`

```json
{
  "title": "Promociones Especiales",
  "subtitle": "Aprovecha nuestras ofertas exclusivas en prevención",
  "items": [
    {
      "title": "Campaña Sénior",
      "description": "Análisis de sangre, medición de T4...",
      "offer": "100€",
      "date": "2026-01-31",
      "label": "Más información",
      "image": "promo-senior.webp"
    }
  ]
}
```

### Documento: `insurances`

```json
{
  "title": "Planes de salud anuales",
  "subtitle": "Cuida de tu mascota todo el año con nuestros seguros personalizados.",
  "items": [
    {
      "title": "Seguro vacunal perro",
      "description": "Protocolo vacunal, antiparasitario interno y externo completo.",
      "offer": "190€",
      "label": "Más información",
      "image": "seguro-vacunal.webp"
    }
  ]
}
```

---

## 6. Cómo funciona el servicio (`FirebaseDataService`)

```
Firestore
   │
   │  docData(ref)          ← escucha cambios en tiempo real
   ▼
getDoc<T>()                 ← helper tipado por documento
   │
   ├── shareReplay(1)       ← cachea el último valor; múltiples suscriptores
   │                           comparten una sola conexión a Firestore
   ├── catchError           ← devuelve {} si el documento no existe o hay error
   ▼
header$, hero$, services$, ... (streams individuales, lazy)
   │
   ▼
appData$ = combineLatest([...]).pipe(shareReplay(1))
   │       ↑ espera a que TODOS los documentos emitan antes de combinar
   ▼
toSignal(fb.appData$, { initialValue: null })
   │       ↑ convierte el Observable en Signal de Angular
   ▼
Templates: @if (data(); as appData) { ... }
           ↑ el bloque no se renderiza hasta que Firebase responda
```

### Flujo de carga

1. Al arrancar la app, `toSignal` suscribe `appData$`.
2. Cada `getDoc()` hace una petición a Firestore y queda **escuchando cambios en tiempo real**.
3. Cuando los 8 documentos emiten su primer valor, `combineLatest` emite `AppData`.
4. `toSignal` actualiza el signal → Angular re-renderiza los templates.
5. Si cualquier documento cambia en Firestore, la UI se actualiza **automáticamente sin recargar la página**.

---

## 7. Reglas de seguridad en Firestore

Copia estas reglas en **Firebase Console → Firestore → Reglas**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // app-content: solo lectura pública, nunca escritura desde cliente
    match /app-content/{document} {
      allow read: if true;
      allow write: if false;
    }

    // Bloquea cualquier otra colección
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> Las actualizaciones de contenido se hacen **directamente desde la Firebase Console** o mediante un script de administración con el Firebase Admin SDK (nunca desde el cliente).

---

## 8. Ignorar los archivos de entorno en Git

Añade al `.gitignore`:

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Crea plantillas sin valores reales para el repositorio:

```
src/environments/environment.template.ts
```

---

## 9. Variables de entorno en Vercel (CI/CD)

En el panel de Vercel → **Settings → Environment Variables**, añade:

| Variable                      | Valor              |
|-------------------------------|--------------------|
| `FIREBASE_API_KEY`            | `AIzaSy...`        |
| `FIREBASE_AUTH_DOMAIN`        | `mi-proyecto...`   |
| `FIREBASE_PROJECT_ID`         | `mi-proyecto`      |
| `FIREBASE_STORAGE_BUCKET`     | `mi-proyecto...`   |
| `FIREBASE_MESSAGING_SENDER_ID`| `123456789`        |
| `FIREBASE_APP_ID`             | `1:123...`         |

En el script de build, genera el fichero de entorno antes de compilar:

```bash
# build.sh
echo "export const environment = {
  production: true,
  firebase: {
    apiKey: '$FIREBASE_API_KEY',
    authDomain: '$FIREBASE_AUTH_DOMAIN',
    projectId: '$FIREBASE_PROJECT_ID',
    storageBucket: '$FIREBASE_STORAGE_BUCKET',
    messagingSenderId: '$FIREBASE_MESSAGING_SENDER_ID',
    appId: '$FIREBASE_APP_ID'
  }
};" > src/environments/environment.prod.ts
ng build --configuration production
```
