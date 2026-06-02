<div align="center">

# Heart Chain

> A lovely Virtual Letter

</div>

A modern way to express affection through personalized virtual love letters, bringing heartfelt messages to life in a digital format.

## Project Structure

```text
heart-chain/
├── public/
├── src/
├── supabase/
├── .env
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.app.json
└── ... (5 more files/directories)

```

Auto-scanned layout listing primary folders and configs.

## Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## API Reference

#### `POST` `/api/v1/auth/shortener`

**Headers:**
```text
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_90210",
    "name": "Ayanokouj1x"
  }
}
```

## License

Distributed under the **Unlicense** License. See `LICENSE` for more information.

Copyright (c) 2026 Ayanokouj1x

<!-- readme-builder-state: W3sidHlwZSI6InRpdGxlIiwidGl0bGUiOiJQcm9qZWN0IFRpdGxlIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJ0ZXh0IjoiSGVhcnQgQ2hhaW4iLCJzdWJ0aXRsZSI6IkEgbG92ZWx5IFZpcnR1YWwgTGV0dGVyIiwiYWxpZ24iOiJjZW50ZXIiLCJsb2dvVXJsIjoiIiwibG9nb1dpZHRoIjoiMTAwIn19LHsidHlwZSI6ImN1c3RvbS1tYXJrZG93biIsInRpdGxlIjoiUHJvamVjdCBpbmZvIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJtYXJrZG93biI6IkEgbW9kZXJuIHdheSB0byBleHByZXNzIGFmZmVjdGlvbiB0aHJvdWdoIHBlcnNvbmFsaXplZCB2aXJ0dWFsIGxvdmUgbGV0dGVycywgYnJpbmdpbmcgaGVhcnRmZWx0IG1lc3NhZ2VzIHRvIGxpZmUgaW4gYSBkaWdpdGFsIGZvcm1hdC4ifX0seyJ0eXBlIjoiZm9sZGVyLXN0cnVjdHVyZSIsInRpdGxlIjoiRm9sZGVyIFN0cnVjdHVyZSIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsidHJlZSI6ImhlYXJ0LWNoYWluL1xu4pSc4pSA4pSAIHB1YmxpYy9cbuKUnOKUgOKUgCBzcmMvXG7ilJzilIDilIAgc3VwYWJhc2UvXG7ilJzilIDilIAgLmVudlxu4pSc4pSA4pSAIC5naXRpZ25vcmVcbuKUnOKUgOKUgCBidW4ubG9ja2JcbuKUnOKUgOKUgCBjb21wb25lbnRzLmpzb25cbuKUnOKUgOKUgCBlc2xpbnQuY29uZmlnLmpzXG7ilJzilIDilIAgaW5kZXguaHRtbFxu4pSc4pSA4pSAIHBhY2thZ2UtbG9jay5qc29uXG7ilJzilIDilIAgcGFja2FnZS5qc29uXG7ilJzilIDilIAgcG9zdGNzcy5jb25maWcuanNcbuKUnOKUgOKUgCBSRUFETUUubWRcbuKUnOKUgOKUgCB0YWlsd2luZC5jb25maWcudHNcbuKUlOKUgOKUgCB0c2NvbmZpZy5hcHAuanNvblxu4pSU4pSA4pSAIC4uLiAoNSBtb3JlIGZpbGVzL2RpcmVjdG9yaWVzKVxuIiwiZXhwbGFuYXRpb24iOiJBdXRvLXNjYW5uZWQgbGF5b3V0IGxpc3RpbmcgcHJpbWFyeSBmb2xkZXJzIGFuZCBjb25maWdzLiJ9fSx7InR5cGUiOiJ0ZWNoLXN0YWNrIiwidGl0bGUiOiJUZWNoIFN0YWNrIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJiYWRnZXMiOlt7ImxhYmVsIjoiUmVhY3QiLCJtZXNzYWdlIjoiUmVhY3QiLCJjb2xvciI6IjYxREFGQiIsImxvZ28iOiJyZWFjdCJ9LHsibGFiZWwiOiJUYWlsd2luZCBDU1MiLCJtZXNzYWdlIjoiVGFpbHdpbmRDU1MiLCJjb2xvciI6IjA2QjZENCIsImxvZ28iOiJ0YWlsd2luZGNzcyJ9LHsibGFiZWwiOiJTdXBhYmFzZSIsIm1lc3NhZ2UiOiJTdXBhYmFzZSIsImNvbG9yIjoiM0VDRjhFIiwibG9nbyI6InN1cGFiYXNlIn0seyJsYWJlbCI6IlZlcmNlbCIsIm1lc3NhZ2UiOiJWZXJjZWwiLCJjb2xvciI6IjAwMDAwMCIsImxvZ28iOiJ2ZXJjZWwifSx7ImxhYmVsIjoiVHlwZVNjcmlwdCIsIm1lc3NhZ2UiOiJUeXBlU2NyaXB0IiwiY29sb3IiOiIzMTc4QzYiLCJsb2dvIjoidHlwZXNjcmlwdCJ9XX19LHsidHlwZSI6ImFwaS1zZXR1cCIsInRpdGxlIjoiQVBJIFNldHVwIiwidmlzaWJsZSI6dHJ1ZSwiY29udGVudCI6eyJlbmRwb2ludCI6Ii9hcGkvdjEvYXV0aC9zaG9ydGVuZXIiLCJtZXRob2QiOiJQT1NUIiwiaGVhZGVycyI6IkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuQXV0aG9yaXphdGlvbjogQmVhcmVyIDxUT0tFTj4iLCJib2R5Ijoie1xuICBcImVtYWlsXCI6IFwidXNlckBleGFtcGxlLmNvbVwiLFxuICBcInBhc3N3b3JkXCI6IFwic2VjdXJlcGFzc3dvcmQxMjNcIlxufSIsInJlc3BvbnNlIjoie1xuICBcInN0YXR1c1wiOiBcInN1Y2Nlc3NcIixcbiAgXCJ0b2tlblwiOiBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS4uLlwiLFxuICBcInVzZXJcIjoge1xuICAgIFwiaWRcIjogXCJ1c3JfOTAyMTBcIixcbiAgICBcIm5hbWVcIjogXCJBeWFub2tvdWoxeFwiXG4gIH1cbn0ifX0seyJ0eXBlIjoibGljZW5zZSIsInRpdGxlIjoiTGljZW5zZSIsInZpc2libGUiOnRydWUsImNvbnRlbnQiOnsidHlwZSI6IlVubGljZW5zZSIsImF1dGhvciI6IkF5YW5va291ajF4IiwieWVhciI6IjIwMjYifX1d -->
