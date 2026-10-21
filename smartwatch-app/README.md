# Calculadora de Propinas para Smart Watch (Expo)

Aplicación móvil construida con Expo + React Native + TypeScript, basada en la arquitectura del documento:

- capa de presentación (UI)
- capa de lógica y estado (React Hooks)
- capa de motor de cálculo y servicios (funciones puras + hápticos)

## Requisitos

- Node.js 20+ (recomendado)
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run start
```

También puedes abrir directo por plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Funcionalidades implementadas

- entrada del monto de la cuenta (`bill`)
- selección de propina con presets (`10%`, `15%`, `18%`, `20%`)
- división de cuenta por número de personas (`split`)
- cálculo en tiempo real de:
  - monto de propina
  - total
  - total por persona
- feedback háptico con `expo-haptics` al modificar valores
- interfaz de alto contraste sobre fondo oscuro para pantallas compactas/OLED

## Estructura de código

- `App.tsx`: composición de pantalla principal y flujo de estado
- `src/services/tipCalculatorEngine.ts`: motor matemático y sanitización de entrada
- `src/services/hapticsService.ts`: integración centralizada con `expo-haptics`
- `src/components/TipPresetButton.tsx`: componente de interacción táctil reutilizable
- `src/theme/colors.ts`: tokens de color del tema oscuro
