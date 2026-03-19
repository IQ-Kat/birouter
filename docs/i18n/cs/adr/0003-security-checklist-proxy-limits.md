# ADR-0003: Kontrolní seznam zabezpečení pro registr proxy a kontroly používání

Datum: 17. 3. 2026 Stav: Přijato

## Kontrolní seznam

- Ověřte všechny datové části správy pomocí Zodu.
- Odmítnout aktualizace chybně formátovaného přiřazení rozsahu se stavem 400.
- Odmítnout smazání používané proxy se stavem 409, pokud to není vynuceno.
- Ve výchozím nastavení nikdy nezobrazovat uživatelské jméno/heslo proxy v odpovědích seznamu.
- Nikdy nezaznamenávejte nezpracované přihlašovací údaje ani hodnoty tokenů.
- Udržujte chybové odpovědi bez interních trasování zásobníku.
- Chraňte koncové body správy pomocí stávajících zásad middlewaru pro ověřování.
- Auditovat mutující operace: vytvořit/aktualizovat/smazat/přiřadit/migraci.
- Zajistěte, aby se resolver během přechodu vrátil k původní konfiguraci.
