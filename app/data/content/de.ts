import type { Category, HubContent, Subsection } from "./types";

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Universelle Methode für Google Pixel, Xiaomi, OnePlus, Motorola und andere Geräte mit entsperrtem Bootloader. Erfordert USB-Debugging, korrekte Treiber und verifizierte Firmware.",
    overview: [
      "Fastboot ist ein Low-Level-Modus zum Flashen einzelner Partitionen (boot, recovery, system, vendor).",
      "ADB (Android Debug Bridge) dient der Kommunikation mit eingeschaltetem System — Backups, Dateiübertragungen, Reboot in den Fastboot-Modus.",
      "Modellbezeichnung immer vor dem Firmware-Download prüfen (z. B. XT2343-2).",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "PC- und Umgebungsvorbereitung",
        description:
          "Eine korrekt eingerichtete Umgebung ist die Grundlage. Falscher Pfad zu platform-tools oder veralteter Treiber sind die häufigsten Fehlerursachen.",
        steps: [
          "Android Platform Tools herunterladen und in einen Ordner ohne Leerzeichen entpacken (z. B. C:\\platform-tools).",
          "Terminal in diesem Ordner öffnen oder den Pfad zur System-PATH hinzufügen.",
          "Am Telefon: Einstellungen → Über das Telefon → 7× auf Build-Nummer tippen → Entwickleroptionen.",
          "USB-Debugging aktivieren und (falls vorhanden) OEM-Bootloader-Entsperrung.",
          "USB-Kabel anschließen und den Dialog „USB-Debugging zulassen“ am Telefon bestätigen.",
          "Verbindung prüfen: adb devices — Seriennummer mit Status „device“ muss angezeigt werden.",
          "Für Flash-Modus: adb reboot bootloader oder physische Tastenkombination je nach Hersteller.",
          "Im Fastboot prüfen: fastboot devices",
        ],
        tips: [
          "Zeigt adb devices „unauthorized“, Kabel trennen, Debugging-Autorisierungen am Telefon widerrufen und erneut verbinden.",
          "Bei Erkennungsproblemen unter Windows USB-2.0-Port bevorzugen.",
          "MIUI-Optimierung (Xiaomi) deaktivieren, wenn adb zufällig abstürzt.",
        ],
        links: [
          {
            label: "Android Platform Tools (ADB & Fastboot)",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
            note: "Offizielles Google-Paket — vor dem Flashen immer aktualisieren",
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "ZIP",
          },
          {
            label: "Minimal ADB & Fastboot (Alternative)",
            url: "https://forum.xda-developers.com/t/tool-minimal-adb-and-fastboot-2-9-18.2317790/",
            fileType: "EXE",
            note: "Leichter Installer für Einsteiger",
          },
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flashen über Fastboot — allgemeines Vorgehen",
        description:
          "Manuelles oder skriptbasiertes Flashen offizieller Images. Befehlsreihenfolge und Partitionsnamen unterscheiden sich je nach Hersteller.",
        steps: [
          "Fotos, Kontakte und wichtige Daten sichern — Flashen löscht meist userdata.",
          "Entsperrten Bootloader prüfen: fastboot oem device-info (Motorola) oder fastboot getvar unlocked.",
          "Heruntergeladene Firmware in einen Ordner entpacken.",
          "Enthält das Paket flash-all.bat / flash-all.sh, dieses Skript vor manuellem Flashen bevorzugen.",
          "Manuell: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "Für A/B-Slots: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "Nach erfolgreichem Flash: fastboot reboot oder fastboot reboot recovery.",
          "Erster Boot nach dem Flash dauert 5–20 Minuten — Gerät nicht berühren.",
        ],
        tips: [
          "Der Befehl fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img wird von einigen ROMs für Root/Custom Kernel benötigt.",
          "Meldet fastboot „waiting for device“, Treiber und Kabel prüfen.",
          "Niemals boot.img eines anderen Modells flashen — Risiko eines Hard Bricks.",
        ],
        warning:
          "Falsche Firmware oder ein abgebrochener Vorgang kann das Gerät dauerhaft beschädigen. Modell und Variante (Global/EU/India) immer exakt prüfen.",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG",
          },
          {
            label: "Xiaomi ROM-Pakete",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
          {
            label: "OnePlus OxygenOS-Pakete",
            url: "https://oxygenos.oneplus.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — Factory Image",
        description: "Offizielle Methode zur Wiederherstellung des Pixel auf einen sauberen Zustand direkt von Google.",
        steps: [
          "Gerätecode finden (z. B. felix, cheetah) auf der Factory-Images-Seite.",
          "ZIP für die exakte Android-Version herunterladen.",
          "Archiv entpacken, flash-all.bat (Windows) oder ./flash-all.sh (Linux/macOS) ausführen.",
          "Das Skript startet automatisch in den Bootloader und flasht alle Partitionen.",
          "Schlägt flash-all fehl, einzelne Befehle aus flash-all.sh manuell ausführen.",
        ],
        tips: [
          "Pixel 6+ nutzt Android Verified Boot — Custom ROM erfordert auch korrektes vbmeta.",
          "Ist der Bootloader gesperrt, funktioniert Factory-Image-Flash ohne Entsperrung nicht.",
        ],
        links: [
          {
            label: "Pixel Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP",
          },
          {
            label: "Pixel OTA-Pakete",
            url: "https://developers.google.com/android/ota",
            fileType: "ZIP",
          },
        ],
      },
    ],
  },
  {
    id: "motorola",
    brandId: "motorola",
    title: "Motorola (Moto)",
    description:
      "Vollständiger Leitfaden für Moto G, Moto Edge, Moto Razr und weitere Modelle (XT-xxxx). Motorola nutzt Fastboot, einen eigenen Unlock-Prozess und offizielle RSA/LMSA-Tools.",
    overview: [
      "Modellnummer unter Einstellungen → Über das Telefon → Modell (z. B. moto g84 5G, XT2347-2).",
      "Bootloader wird über die offizielle Motorola-Seite entsperrt — kostenlos, kann aber die Garantie aufheben.",
      "Nach der Entsperrung erscheint beim Start eine Warnmeldung — das ist normal.",
      "Motorola verteilt oft OTA-Pakete; für ein Downgrade wird eine ältere RETAIL-Flash-Datei benötigt.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Bootloader entsperren (offiziell)",
        description:
          "Ohne entsperrten Bootloader sind Custom ROM und manuelles Fastboot-Flashen der meisten Partitionen nicht möglich.",
        steps: [
          "Entwickleroptionen und USB-Debugging am Telefon aktivieren.",
          "Auch „OEM-Entsperrung“ aktivieren (falls im Entwicklermenü verfügbar).",
          "Telefon mit PC verbinden und ausführen: adb reboot bootloader",
          "Im Fastboot Unlock-Daten abrufen: fastboot oem get_unlock_data",
          "Gesamte Ausgabe kopieren (mehrere Zeilen beginnend mit BOOTLOADER...).",
          "Motorola Bootloader-Unlock-Seite besuchen, mit Moto-/Lenovo-Konto anmelden.",
          "Unlock-Daten in das Formular einfügen und Antrag senden.",
          "Nach E-Mail-Freigabe ausführen: fastboot oem unlock UNIQUE_KEY (Schlüssel aus der E-Mail).",
          "Am Telefon mit Volume Up bestätigen — Gerät wird gelöscht (Factory Reset).",
        ],
        tips: [
          "Antrag kann bei Carrier-locked Geräten abgelehnt werden.",
          "UNIQUE_KEY aus der E-Mail speichern — beim erneuten Sperren kann er benötigt werden.",
          "fastboot oem get_unlock_data funktioniert nur im Bootloader-Modus.",
          "Einige neuere Moto-Modelle erfordern bei der Unlock-Anfrage auch eine WLAN-Verbindung.",
        ],
        warning:
          "Bootloader-Entsperrung löscht alle Daten und kann einige Banking-/Payment-Apps dauerhaft blockieren (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock (offiziell)",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web",
            note: "Einzige offizielle Entsperrmethode",
          },
          {
            label: "Motorola USB Drivers",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE / ZIP",
          },
          {
            label: "XDA Motorola Forum",
            url: "https://forum.xda-developers.com/c/motorola.11969/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "moto-fastboot-flash",
        title: "Firmware über Fastboot flashen",
        description:
          "Wiederherstellung auf Stock ROM, Downgrade oder Behebung eines Bootloops nach fehlgeschlagenem OTA. Erfordert entsperrten Bootloader und korrektes RETAIL-Flash-Paket.",
        steps: [
          "Firmware für exaktes XT-xxxx-Modell und Variante (RETAIL/EU/SINGLE_SIM) herunterladen.",
          "ZIP entpacken — Dateien boot.img, vbmeta.img, radio.img, super.img oder sparse images finden.",
          "In Fastboot neu starten: adb reboot bootloader",
          "Status prüfen: fastboot getvar unlocked — muss yes sein.",
          "Boot flashen: fastboot flash boot boot.img",
          "vbmeta flashen (falls im Paket): fastboot flash vbmeta vbmeta.img",
          "Modem/Radio flashen (falls vorhanden): fastboot flash modem radio.img",
          "Für vollständigen Flash flashfile.sh / flashfile.bat aus dem offiziellen Paket verwenden.",
          "Neustart: fastboot reboot — erster Boot 10–15 Minuten.",
        ],
        tips: [
          "Motorola Super-Partition: neuere Modelle nutzen fastboot flash super super.img.",
          "Schlägt Flash mit „invalid sparse file“ fehl, andere Paketversion herunterladen oder LMSA verwenden.",
          "Für Downgrade muss Zielversion älter oder gleich sein — neueres Anti-Rollback kann Flash blockieren.",
          "fastboot oem fb_mode_set clear kann bei Bootloop nach fehlgeschlagenem Flash helfen (modellspezifisch).",
        ],
        warning:
          "Falsches radio/modem.img für andere Variante (z. B. EU vs. US) kann Netzwerkbänder und GPS zerstören.",
        links: [
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
            note: "Verifizierte RETAIL-Pakete nach XT-Modell",
          },
          {
            label: "Android File Host (Motorola)",
            url: "https://androidfilehost.com/?w=files&flist=1&s=Motorola",
            fileType: "ZIP",
          },
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE",
            note: "Offizielles Rescue-Tool — Wiederherstellung ohne manuelles Fastboot",
          },
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA und Rescue-Tools (offizielle GUI)",
        description:
          "Lenovo Moto Smart Assistant und Motorola RSA ermöglichen Stock-ROM-Wiederherstellung über grafische Oberfläche — geeignet, wenn Fastboot-Befehle fehlschlagen.",
        steps: [
          "Motorola Rescue and Smart Assistant (RSA) oder LMSA herunterladen und installieren.",
          "USB-Debugging am Telefon aktivieren.",
          "Tool unter Windows als Administrator starten.",
          "Telefon verbinden — Tool erkennt Modell automatisch.",
          "„Rescue“ oder „Repair“ wählen und empfohlene Firmware herunterladen.",
          "Vorgang abschließen lassen — Telefon kann sich mehrfach neu starten.",
          "Nach Abschluss trennen und Gerät den ersten Boot abschließen lassen.",
        ],
        tips: [
          "RSA erfordert stabile Internetverbindung zum Firmware-Download.",
          "Im Rescue-Modus werden oft alle Daten gelöscht.",
          "Erkennt RSA das Gerät nicht, anderen USB-Port oder Motorola-Treiber versuchen.",
        ],
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE",
          },
          {
            label: "Lenovo Moto Smart Assistant (LMSA)",
            url: "https://support.lenovo.com/us/en/downloads/ds101291",
            fileType: "EXE",
          },
        ],
      },
      {
        id: "moto-modely",
        title: "Beliebte Modelle und Besonderheiten",
        description:
          "Kurzer Überblick über die häufigsten Motorola-Serien und Flash-Spezifika.",
        steps: [
          "Moto G-Serie (g14, g24, g34, g54, g84): Fastboot-Unlock + RETAIL ZIP, oft MTK oder Snapdragon.",
          "Moto Edge (edge 30, 40, 50): Super-Partition, OTA über LMSA, Fastboot für Downgrade.",
          "Moto Razr (Fold): empfindliches Display — beim Flashen keinen Force Reboot, nur fastboot reboot.",
          "Moto One / Android One: Bootloader-Unlock je nach Region, Stock Image von Google/Motorola.",
          "SKU im Fastboot prüfen: fastboot getvar all — channel-id, version-boot, product suchen.",
        ],
        tips: [
          "Dual-SIM-Varianten haben anderen CSC-Code — Firmware muss passen.",
          "Carrier-Branded-Modelle (Verizon, AT&T) haben oft keine Unlock-Möglichkeit.",
          "Moto Actions und Gesten werden nach Flash mit Stock ROM automatisch wiederhergestellt.",
        ],
        links: [
          {
            label: "Moto G Firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
          },
          {
            label: "Moto Edge Firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
          },
          {
            label: "XDA Moto G Subforum",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
  {
    id: "odin-samsung",
    brandId: "samsung",
    title: "Odin (Samsung)",
    description:
      "Offizielle Methode zum Flashen von Samsung Galaxy im Download-Modus. Erfordert korrekte Firmware (AP, BL, CP, CSC), Samsung USB Driver und Odin3.",
    overview: [
      "Download-Modus (Odin-Modus) wird mit Volume Down + Power (+ Bixby bei älteren Modellen) aktiviert.",
      "CSC-Code bestimmt Region und Sprache — HOME_CSC behält Daten, CSC löscht sie.",
      "Odin zeigt Added!!, wenn das Telefon korrekt verbunden ist.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Download-Modus, Treiber und Backup",
        description:
          "Vor dem Flashen immer Daten über Smart Switch sichern. Falscher Treiber = Telefon erscheint nicht in Odin.",
        steps: [
          "Samsung USB Driver installieren und PC neu starten.",
          "Telefon über Samsung Smart Switch sichern (Fotos, Kontakte, Apps).",
          "Telefon vollständig ausschalten.",
          "Volume Down + Power (+ Bixby falls vorhanden) ca. 10 Sekunden gedrückt halten.",
          "Bei Warnung Volume Up drücken, um in den Download-Modus zu gelangen.",
          "USB-Kabel anschließen — Odin sollte blauen COM-Port-Box mit Added!! anzeigen.",
          "Odin3 als Administrator starten.",
        ],
        tips: [
          "Fehlt Added!!, anderes Kabel, Port versuchen oder Treiber neu installieren.",
          "Samsung Kies / Smart Switch während Odin-Flash deaktivieren — können kollidieren.",
          "Akku sollte vor dem Flash min. 50 % haben.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE",
            note: "Offizieller Samsung-Treiber",
          },
          {
            label: "Samsung Smart Switch",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG",
          },
        ],
      },
      {
        id: "odin-flash",
        title: "Firmware in Odin flashen — AP, BL, CP, CSC",
        description:
          "Vollständiger Flash der Stock-Firmware. Jede Datei hat ihren Slot in Odin.",
        steps: [
          "Firmware für exaktes SM-XXXX-Modell und CSC-Region herunterladen.",
          ".zip entpacken — AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5 finden.",
          "In Odin BL klicken → BL-Datei auswählen.",
          "AP klicken → AP-Datei auswählen (Laden kann länger dauern).",
          "CP klicken → CP-Datei auswählen (Modem/Radio).",
          "CSC klicken → HOME_CSC (Daten behalten) oder CSC (Factory Reset) auswählen.",
          "Auto Reboot und F. Reset Time aktivieren.",
          "Start klicken — auf grünes PASS! warten (rotes FAIL = etwas ist fehlgeschlagen).",
          "Telefon startet neu — erster Boot 5–15 Minuten bei großen Updates.",
        ],
        tips: [
          "AP enthält system, recovery, vbmeta — niemals überspringen.",
          "Bei FAIL prüfen, ob Firmware zum Modell passt und Download-Modus aktiv ist.",
          "Odin3 Version 3.14.1+ empfohlen für neuere Galaxy (S21+).",
          "One UI Downgrade kann durch Anti-Rollback blockiert sein — nur gleiche oder neuere Version flashen.",
        ],
        warning:
          "Firmware aus anderer Region kann Verlust von Samsung Pay, Dual-SIM-Funktionen oder LTE-Bändern verursachen.",
        links: [
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Katalog nach SM-Modell und CSC",
          },
          {
            label: "Frija — Samsung Firmware Downloader",
            url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/",
            fileType: "EXE",
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "odin-pit",
        title: "PIT-Datei und Repartition",
        description:
          "Bei Änderung der Partitionsgröße oder Wiederherstellung nach Hard Brick kann eine PIT-Datei erforderlich sein.",
        steps: [
          "PIT-Datei aus Firmware-Paket oder über Odin erhalten (Repartition — nur für Fortgeschrittene).",
          "In Odin Re-Partition aktivieren und .pit-Datei laden.",
          "Danach AP, BL, CP, CSC wie beim Standardvorgang flashen.",
          "Re-Partition löscht alle Daten — nur verwenden, wenn Standard-Flash fehlschlägt.",
        ],
        tips: [
          "Falsche PIT kann Speicher dauerhaft beschädigen — Repartition nur als letzte Option.",
        ],
        warning: "Re-Partition ohne korrekte PIT = kritisches Hard-Brick-Risiko.",
        links: [
          {
            label: "Samsung Odin PIT Guide (XDA)",
            url: "https://forum.xda-developers.com/t/guide-odin-pit-file.2191465/",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
  {
    id: "sp-flash",
    brandId: "mediatek",
    title: "SP Flash Tool (MediaTek)",
    description:
      "Flashen von MediaTek (MTK)-Chipsets über Scatter-Datei und Download Agent. Wird bei vielen Budget- und Mid-Range-Geräten verwendet, einschließlich einiger Motorola (MTK-Varianten).",
    overview: [
      "Scatter.txt definiert Partitionen und Flash-Speicheradressen.",
      "Telefon muss vor USB-Verbindung ausgeschaltet sein (Download-Modus).",
      "Format All ohne Backup = fast sicherer Hard Brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA und VCOM-Treiber",
        description:
          "Ohne korrekte scatter.txt, Download Agent und MediaTek VCOM-Treiber startet der Flash nicht.",
        steps: [
          "Firmware für exaktes Modell herunterladen (muss scatter.txt und images/ enthalten).",
          "MediaTek USB VCOM Driver installieren (für Windows 10/11 64-bit).",
          "SP Flash Tool entpacken (neueste kompatible Version für deinen Chipset).",
          "flash_tool.exe als Administrator starten.",
          "Bei Download-Agent auf Choose klicken — MTK_AllInOne_DA.bin oder DA aus Firmware wählen.",
          "Bei Scatter auf Choose klicken — scatter.txt auswählen.",
          "Partitionen werden automatisch geladen — unnötige Einträge nicht aktivieren.",
        ],
        tips: [
          "Für Helio G99/G100-Chipsets kann neuere SP Flash Tool v5-Version erforderlich sein.",
          "Meldet scatter einen Fehler, ist Firmware für andere Speichervariante (4 GB vs. 6 GB RAM).",
          "Windows Defender während des Flashens deaktivieren — kann flash_tool blockieren.",
        ],
        links: [
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP",
          },
          {
            label: "MediaTek USB VCOM Driver",
            url: "https://androidmtk.com/download-mtk-usb-vcom-drivers",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "sp-flash-postup",
        title: "Download Only vs. Firmware Upgrade vs. Format",
        description:
          "Drei Flash-Modi — je nach Situation wählen. Format All ist am gefährlichsten.",
        steps: [
          "Download Only: ausgewählte Partitionen ohne Löschen flashen — zur Reparatur von boot/recovery.",
          "Firmware Upgrade: alle Partitionen flashen + Update — Standard-Wiederherstellung Stock ROM.",
          "Format All + Download: vollständiges Löschen und Flashen — nur bei Hard Brick.",
          "Modus im Dropdown-Menü vor Klick auf Download wählen.",
          "Download klicken, dann ausgeschaltetes Telefon per USB verbinden.",
          "SP Flash Tool erkennt Gerät und startet Fortschrittsbalken.",
          "Nach grünem OK Kabel trennen und Telefon manuell einschalten (Power lange gedrückt halten).",
        ],
        tips: [
          "Bleibt Fortschritt bei 0 %, VCOM-Treiber prüfen und MIUI USB debugging (secure) deaktivieren.",
          "Für Motorola MTK-Varianten Firmware speziell für MTK-SKU verwenden.",
        ],
        warning:
          "Format All ohne verifizierte Firmware für das Modell = hohes Risiko eines dauerhaften Bricks.",
        links: [
          {
            label: "Needrom MTK Firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
          },
          {
            label: "Android MTK Anleitungen",
            url: "https://androidmtk.com/",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
  {
    id: "unisoc-ufs",
    brandIds: ["unisoc"],
    title: "Unisoc (Spreadtrum) & UFS-Speicher",
    description:
      "Flashen von Budget- und Mid-Range-Geräten mit Unisoc-Chipset (Tecno, Infinix, Realme, ZTE). UFS-Speicher, Wiederherstellung aus Hard Brick und FRP-Lösung nach Factory Reset.",
    overview: [
      "Unisoc (ehemals Spreadtrum) nutzt SPD / Research Download statt Fastboot.",
      "UFS ist schnellerer Speicher als eMMC — Flash erfordert korrektes PAC-Paket und Download-Agent-Version.",
      "Hard Brick = schwarzer Bildschirm, PC erkennt Telefon nicht — Lösung über Test Point oder autorisierten Service.",
      "FRP (Factory Reset Protection) wird nach Reset ohne ursprüngliches Google-Konto aktiviert.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — Unisoc flashen",
        description:
          "Standardvorgang für Unisoc-Geräte mit PAC-Firmware. Telefon muss im Download-Modus sein (aus + USB).",
        steps: [
          "PAC-Firmware für exaktes Modell herunterladen (CPU + RAM + UFS/eMMC-Variante).",
          "Spreadtrum / Unisoc USB Driver installieren (SCI Android USB Driver).",
          "Research Download Tool oder SPD Upgrade Tool als Administrator starten.",
          "PAC-Datei auswählen — Tool entpackt Partitionen (boot, system, userdata, persist).",
          "Telefon ausschalten, Volume Down gedrückt halten + USB verbinden (modellspezifische Kombinationen).",
          "Start Download klicken — Fortschrittsbalken muss ohne BROM-Fehler laufen.",
          "Nach PASS USB trennen und Telefon einschalten (erster Boot 5–15 Minuten).",
        ],
        tips: [
          "PAC von anderem Modell = Hard-Brick-Risiko — Chipset prüfen (z. B. T606, T610, T760).",
          "Meldet Tool „failed to open port“, Treiber neu installieren und USB-2.0-Port versuchen.",
          "Einige Modelle erfordern älteres Research Download 2.9.9004 statt RDA.",
        ],
        warning:
          "Falsches PAC oder Abbruch des Vorgangs kann das Gerät dauerhaft beschädigen.",
        links: [
          {
            label: "Unisoc / Spreadtrum USB Driver",
            url: "https://androidmtk.com/download-spreadtrum-drivers",
            fileType: "ZIP",
          },
          {
            label: "Research Download Tool",
            url: "https://androidmtk.com/download-research-download-tool",
            fileType: "ZIP",
          },
          {
            label: "SPD Upgrade Tool",
            url: "https://spdflashtool.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "ufs-pamat-flash",
        title: "UFS-Speicher — Flash-Besonderheiten",
        description:
          "UFS (Universal Flash Storage) ist üblich bei neueren Unisoc-, Qualcomm- und Samsung-Geräten. Erfordert exakte Firmware und korrekten Download Agent.",
        steps: [
          "Speichertyp prüfen: Einstellungen → Speicher oder Modellspezifikation (UFS 2.1 / 2.2 / 3.x).",
          "UFS-Firmware ist nicht kompatibel mit eMMC-Variante desselben Modells.",
          "Für Unisoc: gesamtes PAC flashen — kein partielles Flashen einzelner Partitionen ohne Erfahrung.",
          "Für Qualcomm UFS: EDL + firehose (QPST/QFIL) mit rawprogram.xml aus Firmware-Paket.",
          "Nach Flash von UFS-Gerät dauert erster Boot länger — Stromversorgung nicht unterbrechen.",
          "Schlägt Flash mit „storage mismatch“ fehl, Firmware für richtige Kapazität herunterladen (64/128/256 GB).",
        ],
        tips: [
          "UFS hat höheren Verschleiß — wiederholtes Format All erhöht Chip-Ausfallrisiko.",
          "persist- und nvram-Partitionen vor experimentellem Flash sichern (falls Root/Debug-Zugriff vorhanden).",
        ],
        warning:
          "Falscher firehose oder UFS-Programmer für anderes Modell kann Speicher irreversibel beschädigen.",
        links: [
          {
            label: "Android MTK — UFS Anleitungen",
            url: "https://androidmtk.com/",
            fileType: "Guide",
          },
          {
            label: "Needrom Unisoc Firmware",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC / ZIP",
          },
        ],
      },
      {
        id: "unisoc-frp",
        title: "FRP Bypass / Schutz entfernen",
        description:
          "Factory Reset Protection blockiert Einrichtung nach Reset ohne ursprüngliches Google-Konto. Legale Lösung = Anmeldung mit Eigentümerkonto.",
        steps: [
          "Offiziell: Google-Konto anmelden, das vor dem Reset auf dem Gerät war.",
          "Bei Menüzugriff: Einstellungen → Konten → altes Konto vor Factory Reset entfernen.",
          "Nach Stock-PAC-Flash ohne userdata-Wipe kann FRP bleiben — Clean Flash verwenden (userdata format).",
          "Download-Modus + vollständiger Stock-PAC-Flash setzt FRP oft zusammen mit System zurück.",
          "Bei Carrier-Modellen Carrier mit Eigentumsnachweis kontaktieren.",
          "Service-Tools (autorisiert) können FRP bei Reparatur legal löschen.",
        ],
        tips: [
          "Niemals Telefon mit aktivem FRP kaufen — kann verloren oder gestohlen sein.",
          "Nach erfolgreichem Flash Setup-Assistenten mit eigenem Google-Konto abschließen.",
        ],
        warning:
          "FRP-Umgehung auf fremdem Gerät kann illegal sein. Nur auf eigenem Telefon oder mit Zustimmung des Eigentümers vorgehen.",
        links: [
          {
            label: "Google FRP Hilfe (offiziell)",
            url: "https://support.google.com/android/answer/2812853",
            fileType: "Guide",
          },
          {
            label: "XDA Unisoc Forum",
            url: "https://forum.xda-developers.com/c/unisoc.12597/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "unisoc-hardbrick",
        title: "Wiederbelebung aus Hard Brick",
        description:
          "Gerät reagiert nicht, schwarzer Bildschirm, PC sieht weder ADB noch Fastboot. Vorgehen vom wenigsten invasiven Schritt.",
        steps: [
          "Soft Brick: Download-Modus versuchen (Volume Down + USB) und Stock PAC über Research Download flashen.",
          "Erkennt PC Gerät nicht: Spreadtrum-Treiber neu installieren, Kabel und Port wechseln.",
          "Kombination für BROM-Modus drücken (oft Volume Up + USB bei ausgeschaltetem Telefon).",
          "Test Point: Testpunkte auf PCB nach Modellschema kurzschließen — Einstieg in Download-Modus.",
          "Schlägt Flash bei 0 % fehl: falsches PAC, beschädigter UFS-Chip oder leerer Akku.",
          "Service-Ebene: ISP / UFS-Programmer bei physischer Speicher- oder PMIC-Beschädigung.",
          "Nach erfolgreichem Flash Gerät 20 Minuten am Ladegerät lassen vor erstem Boot.",
        ],
        tips: [
          "Letztes funktionierendes PAC und Version vor Experiment notieren — erleichtert Downgrade.",
          "Akku unter 20 % verursacht oft fehlgeschlagenen Flash bei UFS-Geräten.",
          "Vibriert Telefon ohne Bild, kann Problem Display sein — kein Brick.",
        ],
        warning:
          "Test Point und ISP-Eingriff erfordern Erfahrung — falsches Vorgehen kann Motherboard beschädigen.",
        links: [
          {
            label: "GSMHosting Unisoc Firmware",
            url: "https://www.gsmhosting.com/unisoc-firmware/",
            fileType: "PAC",
          },
          {
            label: "XDA Hard Brick Beratung",
            url: "https://forum.xda-developers.com/t/guide-soft-brick-hard-brick.2092846/",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
];

export const diagnostikaCategories: Category[] = [
  {
    id: "bootloop-brick",
    brandIds: ["motorola", "samsung", "android"],
    title: "Bootloop / Brick",
    description:
      "Gerät startet ständig neu, bleibt am Logo hängen oder reagiert gar nicht. Diagnose beginnt mit Identifikation des verfügbaren Modus.",
    overview: [
      "Soft Brick: Gerät lässt sich in fastboot/download/EDL bringen — durch Flashen wiederherstellbar.",
      "Hard Brick: keine Reaktion, schwarzer Bildschirm, PC erkennt Gerät nicht — erfordert Test Point oder Service.",
      "Bootloop nach OTA: oft hilft wipe cache oder Re-Flash der letzten funktionierenden ROM.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Modus- und Symptomidentifikation",
        description:
          "Korrekte Modusdiagnose bestimmt, welches Tool zu verwenden ist — Odin, Fastboot, SP Flash oder QPST.",
        steps: [
          "Fastboot: schwarzer Bildschirm + Text „FASTBOOT MODE“ — Lösung über Fastboot-Flash oder RSA (Motorola).",
          "Download/Odin: Samsung-Logo + Text „Downloading...“ — Lösung über Odin3.",
          "EDL (Qualcomm 9008): schwarzer Bildschirm, im Geräte-Manager Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola Rescue.",
          "MTK Download: ausgeschaltetes Telefon, SP Flash Tool erkennt nach USB — Scatter-Flash.",
          "Unisoc Download: ausgeschaltetes Telefon, Research Download erkennt Spreadtrum-Port — PAC-Flash.",
          "Bootloop am Logo: wiederholter Neustart bei Animation — wipe cache, Re-Flash boot/system.",
          "Hard Brick: keine LED, keine Vibration — Test Point, EDL/SPD-Erzwingung oder Service.",
        ],
        tips: [
          "Motorola: Bootloop nach fehlerhaftem OTA löst oft LMSA Rescue ohne manuelles Fastboot.",
          "Samsung: Bootloop nach Root — HOME_CSC + AP über Odin flashen.",
          "Letzte bekannte ROM-Version vor Flash notieren — hilft beim Downgrade.",
        ],
        links: [
          {
            label: "XDA Bootloop Beratung",
            url: "https://forum.xda-developers.com/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "diag-obnova",
        title: "Wiederherstellungsvorgehen nach Schweregrad",
        description: "Vom wenigsten invasiven Schritt bis zum vollständigen Re-Flash.",
        steps: [
          "Stufe 1: Erzwungener Neustart (Power 15–30 s) oder Recovery wipe cache partition.",
          "Stufe 2: Recovery Factory Reset (löscht Daten, behält Firmware).",
          "Stufe 3: Re-Flash der letzten funktionierenden Stock ROM (Odin/Fastboot/LMSA).",
          "Stufe 4: Ältere ROM-Version flashen (Downgrade), wenn Anti-Rollback es erlaubt.",
          "Stufe 5: EDL/QPST oder Test Point bei Hard Brick.",
          "Schlagen 3 Versuche fehl, XDA-Thread für konkretes Modell konsultieren.",
        ],
        tips: [
          "Vor jedem Flash auf min. 50 % laden.",
          "SIM und SD-Karte vor Odin-Flash entfernen (empfohlen).",
        ],
        links: [
          {
            label: "ADB Backup Anleitung",
            url: "https://developer.android.com/tools/adb#backup",
            fileType: "Guide",
          },
          {
            label: "Motorola Rescue (Bootloop-Fix)",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE",
          },
        ],
      },
      {
        id: "diag-motorola",
        title: "Motorola — spezifische Probleme",
        description:
          "Häufigste Motorola-Probleme nach Flash, OTA oder Bootloader-Entsperrung.",
        steps: [
          "„Bootloader unlocked“-Warnung beim Start — normal nach Unlock, kein Fehler.",
          "Stuck on Motorola logo: fastboot flash boot + vbmeta versuchen, dann fastboot reboot.",
          "No service / invalid IMEI nach Radio-Flash: korrektes radio.img für deine Variante erneut flashen.",
          "„Fail to boot“ nach OTA bei entsperrtem Bootloader: vollständige RETAIL-Firmware über LMSA flashen.",
          "FRP-Lock nach Reset: ursprüngliches Google-Konto anmelden oder offiziellen Motorola-FRP-Vorgang.",
          "Slot A/B mismatch: boot in beide Slots flashen — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "fastboot getvar all in Textdatei speichern — enthält Diag-Versionen für XDA-Hilfe.",
          "Moto G MTK-Modelle: funktioniert Fastboot nicht, SP Flash Tool mit Motorola MTK Scatter versuchen.",
        ],
        warning: "Re-Flash von Radio aus anderer Region kann Mobilfunknetz dauerhaft beschädigen.",
        links: [
          {
            label: "Moto G XDA Beratung",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide",
          },
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP",
          },
        ],
      },
    ],
  },
  {
    id: "edl-qualcomm",
    brandId: "qualcomm",
    title: "EDL / Qualcomm (9008)",
    description:
      "Emergency Download Mode für Snapdragon-Geräte — Xiaomi, OnePlus, einige Motorola, Samsung (selten).",
    overview: [
      "Im EDL-Modus ist Bildschirm schwarz und PC sieht Qualcomm HS-USB QDLoader 9008.",
      "Erfordert korrekten firehose/programmer und Auth (bei einigen Herstellern).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Einstieg in den EDL-Modus",
        description: "Methode hängt vom Hersteller und Bootloader-Status ab.",
        steps: [
          "adb reboot edl — funktioniert nur mit erlaubtem EDL-Zugriff (Root/Debug, modellspezifisch).",
          "fastboot oem edl — einige Xiaomi/OnePlus-Modelle.",
          "Test Point: Punkte auf PCB nach Schema kurzschließen (erfordert Zerlegung).",
          "EDL-Kabel (Datenpins verbunden) — Hardware-Methode ohne Test Point.",
          "Im Geräte-Manager prüfen: Qualcomm HS-USB QDLoader 9008 (COM-Port).",
        ],
        tips: [
          "Motorola Snapdragon: EDL-Zugriff oft eingeschränkt — RSA/LMSA bevorzugen.",
          "Ohne korrekten Authentifikator lehnt Mi Flash Flash ab (Xiaomi).",
        ],
        links: [
          {
            label: "Qualcomm QDLoader Driver",
            url: "https://qcomdriver.com/",
            fileType: "ZIP",
          },
          {
            label: "QPST Flash Tool",
            url: "https://qpsttool.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "diag-edl-flash",
        title: "Flashen im EDL-Modus",
        description: "Fortgeschrittene Wiederherstellung über QPST/QFIL oder Mi Flash.",
        steps: [
          "Qualcomm-Treiber und QPST/QFIL installieren.",
          "firehose/programmer für exaktes Modell herunterladen (nicht immer öffentlich verfügbar).",
          "In QFIL: Configuration → Load XML → rawprogram.xml + patch.xml aus Firmware wählen.",
          "Download Content klicken — Vorgang flasht alle Partitionen.",
          "Nach Abschluss USB trennen und Power lange gedrückt halten zum Einschalten.",
        ],
        warning: "Falscher firehose für anderes Modell = kritische NAND-Beschädigung.",
        links: [
          {
            label: "Mi Flash Tool (Xiaomi EDL)",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
        ],
      },
    ],
  },
  {
    id: "usb-driver",
    title: "USB- / Treiberprobleme",
    description:
      "PC erkennt Gerät nicht in ADB, Fastboot, Odin oder SP Flash — häufigste Ursache für fehlgeschlagenen Flash.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Schritt-für-Schritt-Lösung",
        description: "Systematische Diagnose vor erneutem Flash-Versuch.",
        steps: [
          "USB-Kabel durch verifiziertes Datenkabel ersetzen (nicht nur Ladekabel).",
          "Direkt an PC-USB-Port anschließen (nicht über Hub).",
          "Im Geräte-Manager alle gelben Ausrufezeichen bei Android/ADB/Samsung/MTK entfernen.",
          "Korrekten Treiber je nach Modus installieren: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "PC und Telefon neu starten.",
          "Anderen USB-Port versuchen (USB 2.0 oft stabiler als 3.0).",
          "Unter Windows vorübergehend Treibersignaturprüfung deaktivieren, wenn Treiber nicht signiert ist.",
        ],
        tips: [
          "Zadig kann Treiber auf WinUSB umschreiben — nützlich für Fastboot unter Windows.",
          "Linux: udev-Regeln für adb (sudo usermod -aG plugdev).",
        ],
        links: [
          {
            label: "Universal ADB Driver",
            url: "https://adb.clockworkmod.com/",
            fileType: "EXE",
          },
          {
            label: "Motorola USB Driver",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE",
          },
          {
            label: "Zadig (Re-Driver)",
            url: "https://zadig.akeo.ie/",
            fileType: "EXE",
          },
        ],
      },
    ],
  },
];

export const nastrojeCategories: Category[] = [
  {
    id: "flash-nastroje",
    brandIds: ["fastboot", "odin", "spflash", "miflash", "rsa", "qpst", "spd-flash"],
    title: "Flash-Tools",
    description: "Offizielle und verifizierte Tools für einzelne Plattformen — immer aus vertrauenswürdigen Quellen herunterladen.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description: "Grundpaket für Android-Flash, Debugging und Gerätekommunikation.",
        steps: [
          "ZIP von developer.android.com herunterladen.",
          "Nach C:\\platform-tools oder ~/platform-tools entpacken.",
          "Terminal im Ordner öffnen: cd C:\\platform-tools",
          "Prüfen: adb version && fastboot --version",
          "Befehle: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
        ],
        links: [
          {
            label: "Platform Tools",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "nastroj-motorola",
        title: "Motorola — RSA und LMSA",
        description: "Offizielle GUI-Tools für Rescue, Repair und Verwaltung von Moto-Geräten.",
        steps: [
          "RSA: Rescue und Stock-ROM-Wiederherstellung ohne Kommandozeile.",
          "LMSA: Geräteverwaltung, Backups, Updates, Repair.",
          "Beide Tools erfordern Internet zum Firmware-Download.",
          "Unter Windows 10/11 als Administrator ausführen.",
        ],
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE",
          },
          {
            label: "Lenovo Moto Smart Assistant",
            url: "https://support.lenovo.com/us/en/downloads/ds101291",
            fileType: "EXE",
          },
          {
            label: "Motorola Bootloader Unlock",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web",
          },
        ],
      },
      {
        id: "nastroj-odin",
        title: "Odin 3 (Samsung)",
        description: "Samsung Download-Mode-Flash-Tool — nur für Galaxy-Geräte.",
        steps: [
          "Odin3 Version 3.13.1 oder 3.14.1+ je nach Modell verwenden.",
          "Nicht mehrere Instanzen gleichzeitig starten.",
          "Firmware muss zu Modell SM-XXXX und CSC-Code passen.",
        ],
        links: [
          {
            label: "Odin3 (XDA Thread)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "nastroj-spflash",
        title: "SP Flash Tool (MediaTek)",
        description: "MTK-Geräte über Scatter flashen — einschließlich einiger Motorola MTK-Modelle.",
        steps: [
          "Erfordert VCOM-Treiber und ausgeschaltetes Gerät.",
          "Format All ohne verifizierte Firmware nicht verwenden.",
          "Download Agent muss mit Chipset kompatibel sein.",
        ],
        links: [
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "nastroj-spd",
        title: "SPD / Research Download (Unisoc)",
        description: "Unisoc-Chipsets über PAC-Paket im Download-Modus flashen.",
        steps: [
          "Spreadtrum USB Driver installieren.",
          "PAC-Firmware für exaktes Modell auswählen.",
          "Telefon ausschalten, USB im Download-Modus verbinden, Flash starten.",
        ],
        links: [
          {
            label: "Research Download Tool",
            url: "https://androidmtk.com/download-research-download-tool",
            fileType: "ZIP",
          },
          {
            label: "Unisoc Firmware (Needrom)",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC",
          },
        ],
      },
      {
        id: "nastroj-miflash",
        title: "Mi Flash (Xiaomi)",
        description: "Offizielles Xiaomi-Flash-Tool für EDL- und Fastboot-Modus.",
        steps: [
          "Einige Modelle erfordern autorisiertes Mi-Konto.",
          "Modi: clean all (löscht Daten), save user data, clean all and lock.",
          "Fastboot ROM .tgz-Pakete verwenden.",
        ],
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
          {
            label: "Xiaomi ROM-Katalog",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
        ],
      },
    ],
  },
  {
    id: "firmver-baliky",
    brandIds: ["motorola", "samsung", "xiaomi", "google"],
    title: "Firmware-Pakete nach Marke",
    description: "Kataloge offizieller und verifizierter ROMs — Modellbezeichnung vor Download immer prüfen.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description: "RETAIL Flash Files für Moto G, Edge, Razr und weitere. Variante SINGLE_SIM/DUAL_SIM und Region sind wichtig.",
        steps: [
          "Modell unter Einstellungen → Über das Telefon finden (z. B. XT2347-2).",
          "RETAIL-Channel-Firmware wählen (nicht RETAILD for carrier).",
          "ZIP herunterladen und entpacken — Flash über Fastboot oder LMSA.",
          "Für OTA-Pakete: metadata und payload.bin erfordern Recovery Sideload.",
        ],
        tips: [
          "Lolinet Mirror ist community-verifizierte Quelle für RETAIL-Pakete.",
          "Carrier-Firmware (Verizon, T-Mobile) ist nicht kompatibel mit entsperrtem Bootloader.",
        ],
        links: [
          {
            label: "Lolinet Motorola Mirror",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
          },
          {
            label: "Moto G Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
          },
          {
            label: "Moto Edge Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fw-samsung",
        title: "Samsung (SM-XXXX)",
        description: "Vollständige Firmware mit AP, BL, CP, CSC. CSC-Code = Region (ORX, XEO, OXM...).",
        steps: [
          "Modell prüfen: Einstellungen → Info → Modellnummer SM-XXXX.",
          "Aktuellen CSC ermitteln: *#1234# oder in Odin-Info.",
          "Passende Firmware oder Multi-CSC (OXM) herunterladen.",
        ],
        links: [
          { label: "SamMobile", url: "https://www.sammobile.com/samsung/firmware/", fileType: "ZIP" },
          { label: "Frija Downloader", url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/", fileType: "EXE" },
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) für Mi Flash, Recovery ZIP für OTA/TWRP.",
        steps: [
          "Fastboot ROM: vollständiger Flash über Mi Flash in EDL/Fastboot.",
          "Recovery ZIP: OTA-Update über Recovery Sideload.",
          "Codename prüfen (z. B. tapas, marble), nicht Marketingname.",
        ],
        links: [
          { label: "Xiaomi Firmware Updater", url: "https://xiaomifirmwareupdater.com/", fileType: "TAR" },
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory Images und OTA-Pakete direkt von Google.",
        steps: [
          "Geräte-Codename auf developers.google.com/android/images finden.",
          "Image für exakte Version herunterladen.",
          "flash-all-Skript aus dem Paket ausführen.",
        ],
        links: [
          { label: "Google Factory Images", url: "https://developers.google.com/android/images", fileType: "ZIP" },
          { label: "Google OTA", url: "https://developers.google.com/android/ota", fileType: "ZIP" },
        ],
      },
    ],
  },
];

export const zdielanieSubsections: Subsection[] = [
  {
    id: "zip-7zip",
    title: "Password-protected ZIP (AES-256)",
    description:
      "Standardmethode zum Schutz von Firmware, Scatter-Dateien, DA-Loadern und sensiblen Anleitungen vor der Übertragung.",
    steps: [
      "Ordner oder Dateien zum Teilen auswählen (Firmware, Tools, Dokumentation).",
      "Rechtsklick → 7-Zip → Add to archive.",
      "Archive format: zip (nicht 7z, wenn maximale Kompatibilität gewünscht).",
      "Encryption method: AES-256 (nicht ZipCrypto — ist schwach).",
      "Starkes Passwort eingeben (min. 16 Zeichen, Groß-/Kleinbuchstaben, Zahlen, Symbole).",
      "Encrypt file names aktivieren, falls verfügbar.",
      "Passwort über anderen Kanal senden — Signal, Threema, SMS, persönlich.",
    ],
    tips: [
      "7z-Format hat bessere Kompression, aber ZIP mit AES-256 ist universeller.",
      "Für große Firmware-Pakete (2+ GB) Aufteilung in Teile erwägen.",
    ],
    links: [
      { label: "7-Zip (Windows)", url: "https://www.7-zip.org/download.html", fileType: "EXE" },
      { label: "7-Zip (Linux/macOS)", url: "https://www.7-zip.org/download.html", fileType: "TAR / PKG" },
      { label: "PeaZip (Alternative)", url: "https://peazip.github.io/", fileType: "EXE" },
    ],
  },
  {
    id: "zdielanie-platformy",
    title: "Empfohlene Plattformen zum Teilen",
    description:
      "Sicheres Senden großer Dateien (Firmware, Tool-Pakete) mit Passwort in separater Nachricht.",
    steps: [
      "Verschlüsseltes ZIP auf Plattform mit Link-Ablauf hochladen (7–30 Tage).",
      "Link kopieren und an Empfänger senden.",
      "Passwort über anderen Kanal senden (nicht in derselben E-Mail/Chat wie der Link).",
      "Empfänger lädt herunter, entpackt mit 7-Zip und prüft Datei-Hash, falls verfügbar.",
      "Nach erfolgreichem Download Datei vom Server löschen.",
    ],
    tips: [
      "SwissTransfer: bis 50 GB kostenlos, ohne Registrierung, Schweizer Server.",
      "Proton Drive: Ende-zu-Ende-Verschlüsselung, geeignet für sensible Daten.",
      "GitHub Releases: geeignet für öffentliche Open-Source-Tools (nicht für kostenpflichtige Firmware).",
    ],
    links: [
      { label: "SwissTransfer", url: "https://www.swisstransfer.com/", fileType: "Web", note: "Bis 50 GB, Ablauf" },
      { label: "WeTransfer", url: "https://wetransfer.com/", fileType: "Web" },
      { label: "Proton Drive", url: "https://proton.me/drive", fileType: "Web" },
      { label: "MEGA", url: "https://mega.io/", fileType: "Web", note: "E2E-Verschlüsselung" },
      { label: "GitHub Releases", url: "https://github.com/JVVMEDIA/flash-diagnostics-hub/releases", fileType: "Web" },
    ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Sicherheitsregeln beim Teilen",
    description: "Wie Firmware und Tools legal und sicher geteilt werden.",
    steps: [
      "Nur Firmware und Tools teilen, für die du berechtigt bist (offiziell, Open Source, eigene).",
      "Passwort niemals in derselben E-Mail wie den Dateilink senden.",
      "SHA256-Hash der heruntergeladenen Datei vor dem Flash prüfen.",
      "Keine öffentlichen USB-Sticks für sensible Daten verwenden.",
      "Protokollieren, wem und wann die Datei gesendet wurde (für Servicezwecke).",
    ],
    tips: [
      "Hash-Prüfung: certutil -hashfile firmware.zip SHA256 (Windows).",
      "Bei Motorola-Firmware RETAIL-Channel im Dateinamen prüfen.",
    ],
    warning: "Teilen proprietärer Firmware ohne Erlaubnis kann Lizenzbedingungen des Herstellers verletzen.",
    links: [
      {
        label: "VirusTotal (Dateiprüfung)",
        url: "https://www.virustotal.com/",
        fileType: "Web",
      },
    ],
  },
];

export const deHubContent: HubContent = {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
};