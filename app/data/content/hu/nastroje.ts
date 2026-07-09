import type { Category } from "../types";

export const nastrojeCategories: Category[] = [
  {
    id: "flash-nastroje",
    brandIds: ["fastboot", "odin", "spflash", "miflash", "rsa", "qpst", "spd-flash"],
    title: "Flash eszközök",
    description:
      "Hivatalos és ellenőrzött eszközök az egyes platformokhoz — mindig megbízható forrásból töltsd le.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description:
          "Alapcsomag Android flash-eléshez, hibakereséshez és az eszközzel való kommunikációhoz.",
        steps: [
          "Töltsd le a ZIP-et a developer.android.com oldalról.",
          "Csomagold ki C:\\platform-tools vagy ~/platform-tools mappába.",
          "Nyisd meg a terminált a mappában: cd C:\\platform-tools",
          "Ellenőrizd: adb version && fastboot --version",
          "Parancsok: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
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
        title: "Motorola — RSA és LMSA",
        description:
          "Hivatalos GUI eszközök mentéshez, javításhoz és Moto eszközök kezeléséhez.",
        steps: [
          "RSA: mentés és gyári ROM visszaállítása parancssor nélkül.",
          "LMSA: eszközkezelés, biztonsági mentések, frissítések, javítás.",
          "Mindkét eszköz internetkapcsolatot igényel a firmware letöltéséhez.",
          "Windows 10/11 alatt rendszergazdaként futtasd.",
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
        description: "Samsung Download mód flash eszköz — csak Galaxy eszközökhöz.",
        steps: [
          "Használj Odin3 3.13.1 vagy 3.14.1+ verziót a modelltől függően.",
          "Ne futtass egyszerre több példányt.",
          "A firmware-nek meg kell egyeznie az SM-XXXX modellel és a CSC kóddal.",
        ],
        links: [
          {
            label: "Odin3 (XDA thread)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "nastroj-spflash",
        title: "SP Flash Tool (MediaTek)",
        description:
          "MTK eszközök flash-elése scatter fájlon keresztül — beleértve néhány Motorola MTK modellt is.",
        steps: [
          "VCOM illesztőprogramot és kikapcsolt eszközt igényel.",
          "Ne használd a Format All funkciót ellenőrzött firmware nélkül.",
          "A Download Agent kompatibilis legyen a chipsettel.",
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
        description: "Unisoc chipsetek flash-elése PAC csomagon keresztül Download módban.",
        steps: [
          "Telepítsd a Spreadtrum USB illesztőprogramot.",
          "Válaszd ki a PAC firmware-t a pontos modellhez.",
          "Kapcsold ki a telefont, csatlakoztasd USB-n Download módban, indítsd el a flash-elést.",
        ],
        links: [
          {
            label: "Research Download Tool",
            url: "https://androidmtk.com/download-research-download-tool",
            fileType: "ZIP",
          },
          {
            label: "Unisoc firmware (Needrom)",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC",
          },
        ],
      },
      {
        id: "nastroj-miflash",
        title: "Mi Flash (Xiaomi)",
        description: "Xiaomi hivatalos flash eszköz EDL és fastboot módhoz.",
        steps: [
          "Egyes modellek engedélyezett Mi fiókot igényelnek.",
          "Módok: clean all (törli az adatokat), save user data, clean all and lock.",
          "Használj fastboot ROM .tgz csomagokat.",
        ],
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
          {
            label: "Xiaomi ROM katalógus",
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
    title: "Firmware csomagok márkánként",
    description:
      "Hivatalos és ellenőrzött ROM katalógusok — letöltés előtt mindig ellenőrizd a modell megnevezését.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description:
          "RETAIL flash fájlok Moto G, Edge, Razr és más modellekhez. A SINGLE_SIM/DUAL_SIM változat és a régió számít.",
        steps: [
          "Keresd meg a modellt a Beállítások → Telefon névjegye menüben (pl. XT2347-2).",
          "Válaszd a RETAIL channel firmware-t (ne RETAILD for carrier).",
          "Töltsd le a ZIP-et és csomagold ki — flash fastboot-tal vagy LMSA-val.",
          "OTA csomagoknál: a metadata és payload.bin recovery sideload-ot igényel.",
        ],
        tips: [
          "A Lolinet mirror közösség által ellenőrzött forrás RETAIL csomagokhoz.",
          "A szolgáltatói firmware (Verizon, T-Mobile) nem kompatibilis feloldott bootloaderrel.",
        ],
        links: [
          {
            label: "Lolinet Motorola Mirror",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
          },
          {
            label: "Moto G firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
          },
          {
            label: "Moto Edge firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fw-samsung",
        title: "Samsung (SM-XXXX)",
        description:
          "Teljes firmware AP, BL, CP, CSC részekkel. CSC kód = régió (ORX, XEO, OXM...).",
        steps: [
          "Ellenőrizd a modellt: Beállítások → Névjegy → Modellszám SM-XXXX.",
          "Állapítsd meg az aktuális CSC-t: *#1234# vagy az Odin infóban.",
          "Töltsd le a megfelelő firmware-t vagy multi-CSC (OXM) csomagot.",
        ],
        links: [
          {
            label: "SamMobile",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
          },
          {
            label: "Frija downloader",
            url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/",
            fileType: "EXE",
          },
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) Mi Flash-hez, Recovery ZIP OTA/TWRP-hez.",
        steps: [
          "Fastboot ROM: teljes flash Mi Flash-sel EDL/fastboot módban.",
          "Recovery ZIP: OTA frissítés recovery sideload-dal.",
          "Ellenőrizd a codename-t (pl. tapas, marble), ne a marketing nevet.",
        ],
        links: [
          {
            label: "Xiaomi Firmware Updater",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR",
          },
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory image-ek és OTA csomagok közvetlenül a Google-tól.",
        steps: [
          "Keresd meg az eszköz codename-jét a developers.google.com/android/images oldalon.",
          "Töltsd le az image-et a pontos verzióhoz.",
          "Futtasd a flash-all szkriptet a csomagból.",
        ],
        links: [
          {
            label: "Google Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP",
          },
          {
            label: "Google OTA",
            url: "https://developers.google.com/android/ota",
            fileType: "ZIP",
          },
        ],
      },
    ],
  },
];