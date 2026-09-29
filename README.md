# 📦 Product Management Dashboard

Aplikacja frontendowa w **Next.js (App Router)** z wieloetapowym formularzem dodawania produktu w oknie modalnym oraz paginowaną tabelą produktów.

## 🔗 Linki

- **Live Demo:** [https://product-management-dashboard-kohl.vercel.app](https://product-management-dashboard-kohl.vercel.app)
- **Repozytorium:** [https://github.com/KonradCiepluch/product-management-dashboard](https://github.com/KonradCiepluch/product-management-dashboard)

## 🛠️ Stack Technologiczny

- **Core:** Next.js, React, TypeScript
- **UI:** shadcn/ui, Tailwind CSS, Lucide Icons
- **Formularz & Walidacja:** TanStack Form, Zod
- **URL State:** nuqs (paginacja)
- **Powiadomienia:** Sonner

## ✨ Kluczowe Funkcjonalności

- **3-etapowy formularz (Modal):** Walidacja krok po kroku (Zod), automatyczne przeliczanie cen Netto/Brutto na podstawie VAT, dynamiczne pola (produkt limitowany) i limity koszyka.
- **Nawigacja i stan:** Przycisk „Wstecz” zachowuje wprowadzone dane, natomiast zamknięcie modalu całkowicie resetuje stan i przywraca Krok 1.
- **Tabela z paginacją:** Stan strony jest synchronizowany z parametrami URL (`nuqs`).

## 🚀 Instrukcja Uruchomienia

```bash
# 1. Sklonuj repozytorium i wejdź do katalogu
git clone [https://github.com/KonradCiepluch/product-management-dashboard](https://github.com/KonradCiepluch/product-management-dashboard)
cd twoje-repo

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev

Aplikacja wystartuje pod adresem http://localhost:3000
```
