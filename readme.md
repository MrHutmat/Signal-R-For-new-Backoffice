# Projektopsætning

For at køre denne applikation kræves følgende software og trin:

1. **.NET 8 Installation:**

   - [Download .NET 8](https://dotnet.microsoft.com/download/dotnet/8.0) og følg installationsinstruktionerne.

2. **Node.js v18 Installation:**

   - [Download Node.js](https://nodejs.org/) i version 18.

3. **Visual Studio Opdatering:**

   - Sørg for at have den nyeste version af Visual Studio installeret.

4. **Aktiver Long Path Name (Lange Filstier):**

   - Åbn PowerShell som administrator og aktiver lange filstier ved at følge [disse instruktioner](https://docs.microsoft.com/en-us/dotnet/api/system.io.path?view=net-8.0#longpath).

5. **Projekt Klone:**

   - Klone projektet ved at køre følgende kommando:
     ```bash
     git clone https://github.com/MrHutmat/Signal-R-For-new-Backoffice.git
     ```

6. **Fjern Connection String:**

   - Fjern eventuelle forbindelsesstrenge i `appsettings.json` i projektets rodmappe.

7. **Ryd Umbraco Data:**

   - Slet alt indhold i mappen `/umbraco/Data`.

8. **Byg og Installer Plugin:**

   - Åbn terminalen og naviger til `/App_plugin/my_plugin`.
     ```bash
     npm install --force
     npm run dev
     ```

9. **Start Dotnet Applikation:**

   - Gå tilbage til roden af projektet og kør følgende kommando:
     ```bash
     dotnet run
     ```

10. **Åbn Applikationen:**

    - Åbn det HTTPS-link, der vises i terminalen.

11. **Opsætning og Login:**

    - Følg opsætningsprocessen og log ind.

12. **Luk og Stop:**

    - Luk applikationssiden og stop applikationen.

13. **Genstart Applikation:**
    - Start applikationen igen ved at køre `dotnet run` i terminalen.
