import type { Category, HubContent, Subsection } from "./types";

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Univerzální metoda pro Google Pixel, Xiaomi, OnePlus, Motorola a další zařízení s odemčeným bootloaderem. Vyžaduje USB ladění, správné ovladače a ověřený firmware.",
    overview: [
      "Fastboot je nízkoúrovňový režim pro flash jednotlivých particí (boot, recovery, system, vendor).",
      "ADB (Android Debug Bridge) slouží ke komunikaci se zapnutým systémem — zálohy, přesuny souborů, reboot do fastboot.",
      "Vždy ověř modelové označení (např. XT2343-2) před stahováním firmwaru.",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "Příprava PC a prostředí",
        description:
          "Správně nastavené prostředí je základ. Chybná cesta k platform-tools nebo starý ovladač jsou nejčastější příčiny selhání.",
        steps: [
          "Stáhni Android Platform Tools a rozbal do složky bez mezer (např. C:\\platform-tools).",
          "Otevři terminál v této složce nebo přidej cestu do systémové PATH.",
          "Na telefonu: Nastavení → O telefonu → 7× klepni na Číslo sestavení → Vývojářské možnosti.",
          "Zapni USB ladění a (pokud existuje) OEM odemčení bootloaderu.",
          "Připoj USB kabel, potvrď dialog „Povolit ladění USB“ na telefonu.",
          "Ověř připojení: adb devices — musí se zobrazit sériové číslo se stavem „device“.",
          "Pro flash režim: adb reboot bootloader nebo fyzická kombinace tlačítek podle výrobce.",
          "V fastboot ověř: fastboot devices",
        ],
        tips: [
          "Pokud adb devices ukazuje „unauthorized“, odpoj kabel, zruš autorizace ladění na telefonu a připoj znovu.",
          "Na Windows preferuj USB 2.0 port při problémech s rozpoznáním zařízení.",
          "Vypni MIUI optimalizaci (Xiaomi), pokud adb náhodně padá.",
        ],
        links: [
          {
            label: "Android Platform Tools (ADB & Fastboot)",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
            note: "Oficiální Google balíček — vždy aktualizuj před flashem",
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "ZIP",
          },
          {
            label: "Minimal ADB & Fastboot (alternativa)",
            url: "https://forum.xda-developers.com/t/tool-minimal-adb-and-fastboot-2-9-18.2317790/",
            fileType: "EXE",
            note: "Lehčí instalátor pro začátečníky",
          },
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flash přes Fastboot — obecný postup",
        description:
          "Manuální nebo skriptový flash oficiálních obrazů. Pořadí příkazů a názvy particí se liší podle výrobce.",
        steps: [
          "Zazálohuj fotky, kontakty a důležitá data — flash většinou smaže userdata.",
          "Ověř odemčený bootloader: fastboot oem device-info (Motorola) nebo fastboot getvar unlocked.",
          "Rozbal stažený firmware do jedné složky.",
          "Pokud balíček obsahuje flash-all.bat / flash-all.sh, preferuj tento skript před manuálním flashem.",
          "Manuálně: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "Pro A/B sloty: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "Po úspěšném flashi: fastboot reboot nebo fastboot reboot recovery.",
          "První boot po flashi trvá 5–20 minut — nedotýkej se zařízení.",
        ],
        tips: [
          "Příkaz fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img některé ROM vyžadují pro root/custom kernel.",
          "Pokud fastboot hlásí „waiting for device“, zkontroluj ovladač a kabel.",
          "Nikdy neflashuj boot.img z jiného modelu — riziko hard bricku.",
        ],
        warning:
          "Flash nesprávného firmwaru nebo přerušení procesu může zařízení trvale poškodit. Vždy ověř přesný model a variantu (Global/EU/India).",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG",
          },
          {
            label: "Xiaomi ROM balíčky",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
          {
            label: "OnePlus OxygenOS balíčky",
            url: "https://oxygenos.oneplus.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — factory image",
        description: "Oficiální způsob obnovy Pixelu do čistého stavu přímo od Google.",
        steps: [
          "Najdi kód zařízení (např. felix, cheetah) na stránce factory images.",
          "Stáhni ZIP pro přesnou verzi Androidu.",
          "Rozbal archiv, spusť flash-all.bat (Windows) nebo ./flash-all.sh (Linux/macOS).",
          "Skript automaticky restartuje do bootloaderu a flashne všechny partice.",
          "Pokud flash-all selže, spusť jednotlivé příkazy z flash-all.sh manuálně.",
        ],
        tips: [
          "Pixel 6+ používá Android Verified Boot — custom ROM vyžaduje také správný vbmeta.",
          "Pokud je bootloader uzamčený, factory image flash nebude fungovat bez odemčení.",
        ],
        links: [
          {
            label: "Pixel Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP",
          },
          {
            label: "Pixel OTA balíčky",
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
      "Kompletní průvodce pro Moto G, Moto Edge, Moto Razr a další modely (XT-xxxx). Motorola používá fastboot, vlastní unlock proces a oficiální nástroje RSA/LMSA.",
    overview: [
      "Modelové číslo najdeš v Nastavení → O telefonu → Model (např. moto g84 5G, XT2347-2).",
      "Bootloader se odemyká přes oficiální Motorola stránku — proces je bezplatný, ale může zrušit záruku.",
      "Po odemčení se zobrazí varovná hláška při startu — to je normální.",
      "Motorola často distribuuje OTA balíčky; pro downgrade potřebuješ starší RETAIL flash file.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Odemčení bootloaderu (oficiální)",
        description:
          "Bez odemčeného bootloaderu není možný custom ROM ani manuální fastboot flash většiny particí.",
        steps: [
          "Zapni Vývojářské možnosti a USB ladění na telefonu.",
          "Zapni také „OEM odemčení“ (pokud je dostupné v menu vývojáře).",
          "Připoj telefon k PC a spusť: adb reboot bootloader",
          "V fastboot získej unlock data: fastboot oem get_unlock_data",
          "Zkopíruj celý výstup (více řádků začínajících BOOTLOADER...).",
          "Navštiv Motorola bootloader unlock stránku, přihlas se účtem Moto / Lenovo.",
          "Vlož unlock data do formuláře a odešli žádost.",
          "Po schválení e-mailem spusť: fastboot oem unlock UNIQUE_KEY (klíč z e-mailu).",
          "Potvrď na telefonu Volume Up — zařízení se smaže (factory reset).",
        ],
        tips: [
          "Žádost může být zamítnuta u zařízení od operátora (carrier-locked).",
          "Ulož si UNIQUE_KEY z e-mailu — při opětovném uzamčení ho můžeš potřebovat.",
          "fastboot oem get_unlock_data funguje pouze v režimu bootloader.",
          "Některé novější Moto modely vyžadují také Wi-Fi připojení při unlock žádosti.",
        ],
        warning:
          "Odemčení bootloaderu smaže všechna data a může trvale zablokovat některé bankovní/payment aplikace (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock (oficiální)",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web",
            note: "Jediný oficiální způsob odemčení",
          },
          {
            label: "Motorola USB Drivers",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE / ZIP",
          },
          {
            label: "XDA Motorola fórum",
            url: "https://forum.xda-developers.com/c/motorola.11969/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "moto-fastboot-flash",
        title: "Flash firmwaru přes Fastboot",
        description:
          "Obnova na stock ROM, downgrade nebo oprava bootloopu po neúspěšném OTA. Vyžaduje odemčený bootloader a správný RETAIL flash balíček.",
        steps: [
          "Stáhni firmware pro přesný model XT-xxxx a variantu (RETAIL/EU/SINGLE_SIM).",
          "Rozbal ZIP — najdeš soubory boot.img, vbmeta.img, radio.img, super.img nebo sparse images.",
          "Restartuj do fastboot: adb reboot bootloader",
          "Ověř stav: fastboot getvar unlocked — musí být yes.",
          "Flashni boot: fastboot flash boot boot.img",
          "Flashni vbmeta (pokud je v balíčku): fastboot flash vbmeta vbmeta.img",
          "Flashni modem/radio (pokud je): fastboot flash modem radio.img",
          "Pro kompletní flash použij flashfile.sh / flashfile.bat z oficiálního balíčku.",
          "Restart: fastboot reboot — první boot 10–15 minut.",
        ],
        tips: [
          "Motorola super partition: novější modely používají fastboot flash super super.img.",
          "Pokud flash selže na „invalid sparse file“, stáhni jinou verzi balíčku nebo použij LMSA.",
          "Pro downgrade musí být cílová verze starší nebo stejná — novější anti-rollback může flash zablokovat.",
          "fastboot oem fb_mode_set clear může pomoci při bootloopu po neúspěšném flashi (model-specifické).",
        ],
        warning:
          "Flash nesprávného radio/modem.img pro jiný variant (např. EU vs US) může zničit síťová pásma a GPS.",
        links: [
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
            note: "Ověřené RETAIL balíčky podle modelu XT",
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
            note: "Oficiální rescue nástroj — obnova bez manuálního fastboot",
          },
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA a Rescue nástroje (oficiální GUI)",
        description:
          "Lenovo Moto Smart Assistant a Motorola RSA umožňují obnovu stock ROM přes grafické rozhraní — vhodné, pokud fastboot příkazy selhávají.",
        steps: [
          "Stáhni a nainstaluj Motorola Rescue and Smart Assistant (RSA) nebo LMSA.",
          "Zapni USB ladění na telefonu.",
          "Spusť nástroj jako administrátor na Windows.",
          "Připoj telefon — nástroj automaticky detekuje model.",
          "Vyber „Rescue“ nebo „Repair“ a stáhni doporučený firmware.",
          "Nech proces dokončit — telefon se může několikrát restartovat.",
          "Po dokončení odpoj a nech zařízení dokončit first boot.",
        ],
        tips: [
          "RSA vyžaduje stabilní internetové připojení ke stažení firmwaru.",
          "V rescue režimu se často smažou všechna data.",
          "Pokud RSA nerozpozná zařízení, zkus jiný USB port nebo Motorola ovladač.",
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
        title: "Oblíbené modely a specifika",
        description:
          "Rychlý přehled nejčastějších Motorola sérií a specifik flashování.",
        steps: [
          "Moto G série (g14, g24, g34, g54, g84): fastboot unlock + RETAIL ZIP, často MTK nebo Snapdragon.",
          "Moto Edge (edge 30, 40, 50): super partition, OTA přes LMSA, fastboot pro downgrade.",
          "Moto Razr (fold): citlivý displej — při flashi nepoužívej force reboot, pouze fastboot reboot.",
          "Moto One / Android One: bootloader unlock podle regionu, stock image od Google/Motorola.",
          "Ověř SKU v fastboot: fastboot getvar all — hledej channel-id, version-boot, product.",
        ],
        tips: [
          "Dual SIM varianty mají jiný CSC kód — firmware musí sedět.",
          "Carrier-branded modely (Verizon, AT&T) často nemají unlock možnost.",
          "Moto Actions a gesta se po flashi obnoví automaticky se stock ROM.",
        ],
        links: [
          {
            label: "Moto G firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
          },
          {
            label: "Moto Edge firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
          },
          {
            label: "XDA Moto G subfórum",
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
      "Oficiální způsob flashování Samsung Galaxy v Download módu. Vyžaduje správný firmware (AP, BL, CP, CSC), Samsung USB driver a Odin3.",
    overview: [
      "Download mód (Odin mód) se aktivuje kombinací Volume Down + Power (+ Bixby na starších modelech).",
      "CSC kód určuje region a jazyk — HOME_CSC zachová data, CSC je smaže.",
      "Odin zobrazuje Added!! když je telefon správně připojený.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Download mód, driver a záloha",
        description:
          "Před flashem vždy zazálohuj data přes Smart Switch. Nesprávný driver = telefon se v Odin nezobrazí.",
        steps: [
          "Nainstaluj Samsung USB Driver a restartuj PC.",
          "Zazálohuj telefon přes Samsung Smart Switch (fotky, kontakty, aplikace).",
          "Vypni telefon úplně.",
          "Podrž Volume Down + Power (+ Bixby pokud existuje) cca 10 sekund.",
          "Když se zobrazí varování, stiskni Volume Up pro vstup do Download módu.",
          "Připoj USB kabel — Odin by měl ukázat modrý box COM port s Added!!",
          "Spusť Odin3 jako administrátor.",
        ],
        tips: [
          "Pokud Added!! chybí, zkus jiný kabel, port nebo přeinstaluj driver.",
          "Vypni Samsung Kies / Smart Switch během flashu Odin — mohou kolidovat.",
          "Baterie by měla mít min. 50 % před flashem.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE",
            note: "Oficiální Samsung driver",
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
        title: "Flash firmwaru v Odin — AP, BL, CP, CSC",
        description:
          "Kompletní flash stock firmware. Každý soubor má svůj slot v Odin.",
        steps: [
          "Stáhni firmware pro přesný model SM-XXXX a region CSC.",
          "Rozbal .zip — najdeš AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5.",
          "V Odin klikni BL → vyber BL soubor.",
          "Klikni AP → vyber AP soubor (může trvat delší načítání).",
          "Klikni CP → vyber CP soubor (modem/radio).",
          "Klikni CSC → vyber HOME_CSC (zachová data) nebo CSC (factory reset).",
          "Zaškrtni Auto Reboot a F. Reset Time.",
          "Klikni Start — čekej na zelené PASS! (červené FAIL = něco selhalo).",
          "Telefon se restartuje — první boot 5–15 minut při velkých aktualizacích.",
        ],
        tips: [
          "AP obsahuje system, recovery, vbmeta — nikdy ho nepřeskakuj.",
          "Při FAIL zkontroluj, zda firmware sedí s modelem a zda je Download mód aktivní.",
          "Odin3 verze 3.14.1+ doporučená pro novější Galaxy (S21+).",
          "One UI downgrade může být blokován anti-rollback — flash pouze stejnou nebo novější verzi.",
        ],
        warning:
          "Flash firmware z jiného regionu může způsobit ztrátu Samsung Pay, dual SIM funkcí nebo LTE pásem.",
        links: [
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Katalog podle SM modelu a CSC",
          },
          {
            label: "Frija — Samsung firmware downloader",
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
        title: "PIT soubor a repartition",
        description:
          "Při změně velikosti particí nebo obnově po hard bricku může být potřebný PIT soubor.",
        steps: [
          "PIT soubor získej z firmware balíčku nebo přes Odin (Repartition — pouze pro pokročilé).",
          "V Odin zaškrtni Re-Partition a načti .pit soubor.",
          "Flashni poté AP, BL, CP, CSC jako při standardním postupu.",
          "Re-Partition smaže všechna data — používej pouze pokud standardní flash selže.",
        ],
        tips: [
          "Nesprávný PIT může trvale poškodit úložiště — repartition pouze jako poslední možnost.",
        ],
        warning: "Re-Partition bez správného PIT = kritické riziko hard bricku.",
        links: [
          {
            label: "Samsung Odin PIT guide (XDA)",
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
      "Flash MediaTek (MTK) čipsetů přes scatter soubor a Download Agent. Používá se u mnoha budget a mid-range zařízení včetně některých Motorola (MTK varianty).",
    overview: [
      "Scatter.txt definuje partice a adresy flash paměti.",
      "Telefon musí být vypnutý před připojením USB (Download mód).",
      "Format All bez zálohy = téměř jistý hard brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA a VCOM driver",
        description:
          "Bez správného scatter.txt, Download Agent a MediaTek VCOM drivera flash nezačne.",
        steps: [
          "Stáhni firmware pro přesný model (musí obsahovat scatter.txt a images/).",
          "Nainstaluj MediaTek USB VCOM driver (pro Windows 10/11 64-bit).",
          "Rozbal SP Flash Tool (nejnovější kompatibilní verze pro tvůj chipset).",
          "Spusť flash_tool.exe jako administrátor.",
          "Klikni Choose na Download-Agent — vyber MTK_AllInOne_DA.bin nebo DA z firmwaru.",
          "Klikni Choose na Scatter — vyber scatter.txt.",
          "Partice se načtou automaticky — nezaškrtávej zbytečné položky.",
        ],
        tips: [
          "Pro Helio G99/G100 čipsety může být potřebná novější verze SP Flash Tool v5.",
          "Pokud scatter hlásí chybu, firmware je pro jiný variant paměti (4GB vs 6GB RAM).",
          "Vypni Windows Defender během flashu — může blokovat flash_tool.",
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
        title: "Download Only vs Firmware Upgrade vs Format",
        description:
          "Tři režimy flashu — vyber podle situace. Format All je nejnebezpečnější.",
        steps: [
          "Download Only: flash vybraných particí bez mazání — na opravu boot/recovery.",
          "Firmware Upgrade: flash všech particí + update — standardní obnova stock ROM.",
          "Format All + Download: kompletní vymazání a flash — pouze při hard bricku.",
          "Vyber režim v rozbalovacím menu před kliknutím Download.",
          "Klikni Download, poté připoj vypnutý telefon přes USB.",
          "SP Flash Tool detekuje zařízení a začne progress bar.",
          "Po zeleném OK odpoj kabel a zapni telefon manuálně (dlouhé stisknutí Power).",
        ],
        tips: [
          "Pokud progress stojí na 0 %, zkontroluj VCOM driver a vypni MIUI USB debugging (secure).",
          "Pro Motorola MTK varianty používej firmware specificky pro MTK SKU.",
        ],
        warning:
          "Format All bez ověřeného firmwaru pro daný model = velké riziko trvalého bricku.",
        links: [
          {
            label: "Needrom MTK firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
          },
          {
            label: "Android MTK návody",
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
    title: "Unisoc (Spreadtrum) & UFS paměť",
    description:
      "Flash budget a mid-range zařízení s Unisoc čipsetem (Tecno, Infinix, Realme, ZTE). UFS úložiště, obnova z hardbricku a řešení FRP po factory reset.",
    overview: [
      "Unisoc (dříve Spreadtrum) používá SPD / Research Download místo fastbootu.",
      "UFS je rychlejší paměť než eMMC — flash vyžaduje správný PAC balíček a verzi Download Agent.",
      "Hardbrick = černá obrazovka, PC nerozpozná telefon — řešení přes test point nebo autorizovaný servis.",
      "FRP (Factory Reset Protection) se aktivuje po resetu bez původního Google účtu.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — flash Unisoc",
        description:
          "Standardní postup pro Unisoc zařízení s PAC firmwarem. Telefon musí být v Download módu (vypnutý + USB).",
        steps: [
          "Stáhni PAC firmware pro přesný model (CPU + RAM + UFS/eMMC variant).",
          "Nainstaluj Spreadtrum / Unisoc USB driver (SCI Android USB Driver).",
          "Spusť Research Download Tool nebo SPD Upgrade Tool jako administrátor.",
          "Vyber PAC soubor — nástroj rozbalí partice (boot, system, userdata, persist).",
          "Vypni telefon, podrž Volume Down + připoj USB (model-specifické kombinace).",
          "Klikni Start Download — progress bar musí běžet bez chyby BROM.",
          "Po PASS odpoj USB a zapni telefon (první boot 5–15 minut).",
        ],
        tips: [
          "PAC z jiného modelu = riziko hard bricku — ověř chipset (např. T606, T610, T760).",
          "Pokud nástroj hlásí „failed to open port“, přeinstaluj driver a zkus USB 2.0 port.",
          "Některé modely vyžadují starší Research Download 2.9.9004 místo RDA.",
        ],
        warning:
          "Flash nesprávného PAC nebo přerušení procesu může zařízení trvale poškodit.",
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
        title: "UFS paměť — specifika flashování",
        description:
          "UFS (Universal Flash Storage) je běžná u novějších Unisoc, Qualcomm a Samsung zařízení. Vyžaduje přesný firmware a správný Download Agent.",
        steps: [
          "Ověř typ úložiště: Nastavení → Úložiště nebo specifikace modelu (UFS 2.1 / 2.2 / 3.x).",
          "UFS firmware není kompatibilní s eMMC variantou stejného modelu.",
          "Pro Unisoc: flashuj celý PAC — nepoužívej částečný flash jednotlivých particí bez zkušeností.",
          "Pro Qualcomm UFS: EDL + firehose (QPST/QFIL) s rawprogram.xml z firmware balíčku.",
          "Po flashi UFS zařízení první boot trvá déle — nepřerušuj napájení.",
          "Pokud flash selže na „storage mismatch“, stáhni firmware pro správnou kapacitu (64/128/256 GB).",
        ],
        tips: [
          "UFS má vyšší opotřebení — opakovaný Format All zvyšuje riziko selhání čipu.",
          "Zazálohuj persist a nvram partice před experimentálním flashem (pokud máš root/debug přístup).",
        ],
        warning:
          "Nesprávný firehose nebo UFS programmer pro jiný model může úložiště nevratně poškodit.",
        links: [
          {
            label: "Android MTK — UFS návody",
            url: "https://androidmtk.com/",
            fileType: "Guide",
          },
          {
            label: "Needrom Unisoc firmware",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC / ZIP",
          },
        ],
      },
      {
        id: "unisoc-frp",
        title: "FRP bypass / odstranění ochrany",
        description:
          "Factory Reset Protection blokuje nastavení po resetu bez původního Google účtu. Legální řešení = přihlášení vlastnického účtu.",
        steps: [
          "Oficiálně: přihlas Google účet, který byl na zařízení před resetem.",
          "Pokud máš přístup k menu: Nastavení → Účty → odstraň starý účet před factory reset.",
          "Po flashi stock PAC bez wipe userdata může FRP zůstat — použij clean flash (userdata format).",
          "Download mód + flash plný stock PAC často resetuje FRP spolu se systémem.",
          "U operátorských modelů kontaktuj operátora s dokladem o vlastnictví.",
          "Servisní nástroje (autorizované) mohou FRP vymazat legálně při opravě.",
        ],
        tips: [
          "Nikdy nekupuj telefon s aktivním FRP — může být ztracený nebo odcizený.",
          "Po úspěšném flashi dokonči setup wizard s vlastním Google účtem.",
        ],
        warning:
          "Obcházení FRP na cizím zařízení může být nelegální. Postupuj pouze na vlastním telefonu nebo se souhlasem vlastníka.",
        links: [
          {
            label: "Google FRP help (oficiální)",
            url: "https://support.google.com/android/answer/2812853",
            fileType: "Guide",
          },
          {
            label: "XDA Unisoc fórum",
            url: "https://forum.xda-developers.com/c/unisoc.12597/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "unisoc-hardbrick",
        title: "Oživení z hardbricku",
        description:
          "Zařízení nereaguje, černá obrazovka, PC nevidí ADB ani fastboot. Postup od nejméně invazivního kroku.",
        steps: [
          "Soft brick: zkus Download mód (Volume Down + USB) a flash stock PAC přes Research Download.",
          "Pokud PC nevidí zařízení: přeinstaluj Spreadtrum driver, vyměň kabel a port.",
          "Stiskni kombinaci pro BROM mód (často Volume Up + USB při vypnutém telefonu).",
          "Test point: zkrat testovací body na PCB podle schématu modelu — vstup do Download módu.",
          "Pokud flash selže na 0 %: nesprávný PAC, poškozený UFS čip nebo vybitá baterie.",
          "Úroveň servisu: ISP / UFS programmer při fyzickém poškození paměti nebo PMIC.",
          "Po úspěšném flashi nech zařízení 20 minut na nabíječce před prvním bootem.",
        ],
        tips: [
          "Zapiš si poslední funkční PAC a verzi před experimentem — usnadní downgrade.",
          "Baterie pod 20 % často způsobí failed flash na UFS zařízeních.",
          "Pokud telefon vibruje, ale nemá obraz, problém může být displej — ne brick.",
        ],
        warning:
          "Test point a ISP zásah vyžadují zkušenosti — nesprávný postup může poškodit motherboard.",
        links: [
          {
            label: "GSMHosting Unisoc firmware",
            url: "https://www.gsmhosting.com/unisoc-firmware/",
            fileType: "PAC",
          },
          {
            label: "XDA Hard Brick poradna",
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
      "Zařízení se neustále restartuje, zasekne na logu nebo vůbec nereaguje. Diagnostika začíná identifikací dostupného režimu.",
    overview: [
      "Soft brick: zařízení se dá dostat do fastboot/download/EDL — obnovitelné flashem.",
      "Hard brick: žádná odezva, černá obrazovka, PC nerozpozná zařízení — vyžaduje test point nebo servis.",
      "Bootloop po OTA: často pomůže wipe cache nebo re-flash posledního funkčního ROM.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Identifikace režimu a symptomů",
        description:
          "Správná diagnóza režimu určí, který nástroj použít — Odin, fastboot, SP Flash nebo QPST.",
        steps: [
          "Fastboot: černá obrazovka + text „FASTBOOT MODE“ — řešení přes fastboot flash nebo RSA (Motorola).",
          "Download/Odin: Samsung logo + text „Downloading...“ — řešení přes Odin3.",
          "EDL (Qualcomm 9008): černá obrazovka, ve Správci zařízení Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola rescue.",
          "MTK Download: vypnutý telefon, SP Flash Tool detekuje po USB — scatter flash.",
          "Unisoc Download: vypnutý telefon, Research Download detekuje Spreadtrum port — PAC flash.",
          "Bootloop na logu: opakovaný restart při animaci — wipe cache, re-flash boot/system.",
          "Hard brick: žádné LED, žádná vibrace — test point, EDL/SPD vynucení nebo servis.",
        ],
        tips: [
          "Motorola: bootloop po špatném OTA často vyřeší LMSA Rescue bez manuálního fastboot.",
          "Samsung: bootloop po root — flash HOME_CSC + AP přes Odin.",
          "Zapiš si poslední známou verzi ROM před flashem — pomůže při downgrade.",
        ],
        links: [
          {
            label: "XDA Bootloop poradna",
            url: "https://forum.xda-developers.com/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "diag-obnova",
        title: "Postup obnovy podle závažnosti",
        description: "Od nejméně invazivního kroku po kompletní re-flash.",
        steps: [
          "Úroveň 1: Vynucený restart (Power 15–30 s) nebo recovery wipe cache partition.",
          "Úroveň 2: Recovery factory reset (smaže data, zachová firmware).",
          "Úroveň 3: Re-flash posledního funkčního stock ROM (Odin/fastboot/LMSA).",
          "Úroveň 4: Flash starší verze ROM (downgrade), pokud anti-rollback dovolí.",
          "Úroveň 5: EDL/QPST nebo test point pro hard brick.",
          "Pokud 3 pokusy selžou, konzultuj XDA thread pro konkrétní model.",
        ],
        tips: [
          "Před každým flashem nabij na min. 50 %.",
          "Odstraň SIM a SD kartu před Odin flashem (doporučené).",
        ],
        links: [
          {
            label: "ADB Backup návod",
            url: "https://developer.android.com/tools/adb#backup",
            fileType: "Guide",
          },
          {
            label: "Motorola Rescue (bootloop fix)",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE",
          },
        ],
      },
      {
        id: "diag-motorola",
        title: "Motorola — specifické problémy",
        description:
          "Nejčastější Motorola problémy po flashi, OTA nebo odemčení bootloaderu.",
        steps: [
          "„Bootloader unlocked“ warning při startu — normální po unlock, není to chyba.",
          "Stuck on Motorola logo: zkus fastboot flash boot + vbmeta, poté fastboot reboot.",
          "No service / invalid IMEI po flashi radio: re-flash správný radio.img pro tvůj variant.",
          "„Fail to boot“ po OTA na unlocked bootloader: flash full RETAIL firmware přes LMSA.",
          "FRP lock po resetu: přihlas původní Google účet nebo oficiální Motorola FRP postup.",
          "Slot A/B mismatch: flash boot do obou slotů — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "fastboot getvar all ulož do textového souboru — obsahuje diag verze pro XDA pomoc.",
          "Moto G MTK modely: pokud fastboot nefunguje, zkus SP Flash Tool s Motorola MTK scatter.",
        ],
        warning: "Re-flash radio z jiného regionu může trvale poškodit mobilní síť.",
        links: [
          {
            label: "Moto G XDA poradna",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide",
          },
          {
            label: "Lolinet Motorola firmware",
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
      "Emergency Download Mode pro Snapdragon zařízení — Xiaomi, OnePlus, některé Motorola, Samsung (vzácně).",
    overview: [
      "V EDL módu je obrazovka černá a PC vidí Qualcomm HS-USB QDLoader 9008.",
      "Vyžaduje správný firehose/programmer a auth (u některých výrobců).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Vstup do EDL módu",
        description: "Metoda závisí na výrobci a stavu bootloaderu.",
        steps: [
          "adb reboot edl — funguje pouze s povoleným EDL access (root/debug, model-specifické).",
          "fastboot oem edl — některé Xiaomi/OnePlus modely.",
          "Test point: zkrácení bodů na PCB podle schématu (vyžaduje rozebrání).",
          "EDL kabel (datové piny propojené) — hardwarový způsob bez test point.",
          "Ověř ve Správci zařízení: Qualcomm HS-USB QDLoader 9008 (COM port).",
        ],
        tips: [
          "Motorola Snapdragon: EDL přístup je často omezený — preferuj RSA/LMSA.",
          "Bez správného autentifikátoru Mi Flash odmítne flash (Xiaomi).",
        ],
        links: [
          {
            label: "Qualcomm QDLoader driver",
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
        title: "Flash v EDL režimu",
        description: "Pokročilá obnova přes QPST/QFIL nebo Mi Flash.",
        steps: [
          "Nainstaluj Qualcomm driver a QPST/QFIL.",
          "Stáhni firehose/programmer pro přesný model (není vždy veřejně dostupný).",
          "V QFIL: Configuration → Load XML → vyber rawprogram.xml + patch.xml z firmwaru.",
          "Klikni Download Content — proces flashne všechny partice.",
          "Po dokončení odpoj USB a dlouho podrž Power pro zapnutí.",
        ],
        warning: "Nesprávný firehose pro jiný model = kritické poškození NAND.",
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
    title: "USB / Driver problémy",
    description:
      "PC nerozpozná zařízení v ADB, fastboot, Odin nebo SP Flash — nejčastější příčina neúspěšného flashu.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Řešení krok za krokem",
        description: "Systematická diagnostika před opakovaným flashem.",
        steps: [
          "Vyměň USB kabel za ověřený datový (ne pouze nabíjecí).",
          "Připoj přímo do USB portu na PC (ne přes hub).",
          "Ve Správci zařízení odstraň všechny žluté vykřičníky u Android/ADB/Samsung/MTK.",
          "Nainstaluj správný driver podle režimu: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "Restartuj PC i telefon.",
          "Zkus jiný USB port (USB 2.0 často stabilnější než 3.0).",
          "Na Windows dočasně vypni driver signature enforcement, pokud driver není podepsaný.",
        ],
        tips: [
          "Zadig může přepsat driver na WinUSB — užitečné pro fastboot na Windows.",
          "Linux: pravidla udev pro adb (sudo usermod -aG plugdev).",
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
            label: "Zadig (re-driver)",
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
    title: "Flash nástroje",
    description: "Oficiální a ověřené nástroje pro jednotlivé platformy — vždy stahuj z důvěryhodných zdrojů.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description: "Základní balíček pro Android flash, ladění a komunikaci se zařízením.",
        steps: [
          "Stáhni ZIP z developer.android.com.",
          "Rozbal do C:\\platform-tools nebo ~/platform-tools.",
          "Otevři terminál ve složce: cd C:\\platform-tools",
          "Ověř: adb version && fastboot --version",
          "Příkazy: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
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
        title: "Motorola — RSA a LMSA",
        description: "Oficiální GUI nástroje pro rescue, repair a správu Moto zařízení.",
        steps: [
          "RSA: rescue a obnova stock ROM bez příkazového řádku.",
          "LMSA: správa zařízení, zálohy, aktualizace, repair.",
          "Oba nástroje vyžadují internet ke stažení firmwaru.",
          "Spouštěj jako administrátor na Windows 10/11.",
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
        description: "Samsung Download mode flash nástroj — pouze pro Galaxy zařízení.",
        steps: [
          "Používej Odin3 verzi 3.13.1 nebo 3.14.1+ podle modelu.",
          "Nespouštěj více instancí najednou.",
          "Firmware musí sedět s modelem SM-XXXX a CSC kódem.",
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
        description: "Flash MTK zařízení přes scatter — včetně některých Motorola MTK modelů.",
        steps: [
          "Vyžaduje VCOM driver a vypnuté zařízení.",
          "Nepoužívej Format All bez ověřeného firmwaru.",
          "Download Agent musí být kompatibilní s chipsetem.",
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
        description: "Flash Unisoc čipsetů přes PAC balíček v Download módu.",
        steps: [
          "Nainstaluj Spreadtrum USB driver.",
          "Vyber PAC firmware pro přesný model.",
          "Vypni telefon, připoj USB v Download módu, spusť flash.",
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
        description: "Xiaomi oficiální flash nástroj pro EDL a fastboot režim.",
        steps: [
          "Některé modely vyžadují autorizovaný Mi účet.",
          "Režimy: clean all (smaže data), save user data, clean all and lock.",
          "Používej fastboot ROM .tgz balíčky.",
        ],
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
          {
            label: "Xiaomi ROM katalog",
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
    title: "Firmware balíčky podle značky",
    description: "Katalogy oficiálních a ověřených ROM — vždy ověř modelové označení před stahováním.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description: "RETAIL flash files pro Moto G, Edge, Razr a další. Variant SINGLE_SIM/DUAL_SIM a region mají význam.",
        steps: [
          "Najdi model v Nastavení → O telefonu (např. XT2347-2).",
          "Vyber RETAIL channel firmware (ne RETAILD for carrier).",
          "Stáhni ZIP a rozbal — flash přes fastboot nebo LMSA.",
          "Pro OTA balíčky: metadata a payload.bin vyžadují recovery sideload.",
        ],
        tips: [
          "Lolinet mirror je komunitou ověřený zdroj RETAIL balíčků.",
          "Carrier firmware (Verizon, T-Mobile) není kompatibilní s unlocked bootloaderem.",
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
        description: "Kompletní firmware s AP, BL, CP, CSC. CSC kód = region (ORX, XEO, OXM...).",
        steps: [
          "Ověř model: Nastavení → Informace → Modelové číslo SM-XXXX.",
          "Zjisti aktuální CSC: *#1234# nebo v Odin info.",
          "Stáhni odpovídající firmware nebo multi-CSC (OXM).",
        ],
        links: [
          { label: "SamMobile", url: "https://www.sammobile.com/samsung/firmware/", fileType: "ZIP" },
          { label: "Frija downloader", url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/", fileType: "EXE" },
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) pro Mi Flash, Recovery ZIP pro OTA/TWRP.",
        steps: [
          "Fastboot ROM: kompletní flash přes Mi Flash v EDL/fastboot.",
          "Recovery ZIP: OTA aktualizace přes recovery sideload.",
          "Ověř codename (např. tapas, marble), ne marketingový název.",
        ],
        links: [
          { label: "Xiaomi Firmware Updater", url: "https://xiaomifirmwareupdater.com/", fileType: "TAR" },
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory images a OTA balíčky přímo od Google.",
        steps: [
          "Najdi codename zařízení na developers.google.com/android/images.",
          "Stáhni image pro přesnou verzi.",
          "Spusť flash-all skript z balíčku.",
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
      "Standardní způsob ochrany firmwaru, scatter souborů, DA loaderů a citlivých návodů před přenosem.",
    steps: [
      "Vyber složku nebo soubory ke sdílení (firmware, nástroje, dokumentace).",
      "Pravý klik → 7-Zip → Add to archive.",
      "Archive format: zip (ne 7z, pokud chceš max. kompatibilitu).",
      "Encryption method: AES-256 (ne ZipCrypto — je slabé).",
      "Zadej silné heslo (min. 16 znaků, velká/malá písmena, čísla, symboly).",
      "Zaškrtni Encrypt file names, pokud je dostupné.",
      "Heslo pošli jiným kanálem — Signal, Threema, SMS, osobně.",
    ],
    tips: [
      "7z formát má lepší kompresi, ale ZIP s AES-256 je univerzálnější.",
      "Pro velké firmware balíčky (2+ GB) zvaž rozdělení na části.",
    ],
    links: [
      { label: "7-Zip (Windows)", url: "https://www.7-zip.org/download.html", fileType: "EXE" },
      { label: "7-Zip (Linux/macOS)", url: "https://www.7-zip.org/download.html", fileType: "TAR / PKG" },
      { label: "PeaZip (alternativa)", url: "https://peazip.github.io/", fileType: "EXE" },
    ],
  },
  {
    id: "zdielanie-platformy",
    title: "Doporučené platformy pro sdílení",
    description:
      "Bezpečné odeslání velkých souborů (firmware, tool balíčky) s heslem v samostatné zprávě.",
    steps: [
      "Nahraj zašifrovaný ZIP na platformu s expirací odkazu (7–30 dní).",
      "Zkopíruj odkaz a pošli příjemci.",
      "Heslo pošli jiným kanálem (ne ve stejném e-mailu/chatu jako odkaz).",
      "Příjemce stáhne, rozbalí 7-Zipem a ověří hash souboru, pokud je k dispozici.",
      "Po úspěšném stažení smaž soubor ze serveru.",
    ],
    tips: [
      "SwissTransfer: do 50 GB zdarma, bez registrace, švýcarské servery.",
      "Proton Drive: end-to-end šifrování, vhodné pro citlivá data.",
      "GitHub Releases: vhodné pro veřejné open-source nástroje (ne pro placený firmware).",
    ],
    links: [
      { label: "SwissTransfer", url: "https://www.swisstransfer.com/", fileType: "Web", note: "Do 50 GB, expirace" },
      { label: "WeTransfer", url: "https://wetransfer.com/", fileType: "Web" },
      { label: "Proton Drive", url: "https://proton.me/drive", fileType: "Web" },
      { label: "MEGA", url: "https://mega.io/", fileType: "Web", note: "E2E šifrování" },
      { label: "GitHub Releases", url: "https://github.com/JVVMEDIA/flash-diagnostics-hub/releases", fileType: "Web" },
    ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Bezpečnostní pravidla při sdílení",
    description: "Jak sdílet firmware a nástroje legálně a bezpečně.",
    steps: [
      "Sdílej pouze firmware a nástroje, ke kterým máš právo (oficiální, open-source, vlastní).",
      "Nikdy neposílej heslo ve stejném e-mailu jako odkaz na soubor.",
      "Ověř SHA256 hash staženého souboru před flashem.",
      "Nepoužívej veřejné USB klíče pro citlivá data.",
      "Loguj komu a kdy jsi soubor odeslal (pro servisní účely).",
    ],
    tips: [
      "Hash ověření: certutil -hashfile firmware.zip SHA256 (Windows).",
      "Pro Motorola firmware ověř RETAIL channel v názvu souboru.",
    ],
    warning: "Sdílení proprietárního firmwaru bez povolení může porušovat licenční podmínky výrobce.",
    links: [
      {
        label: "VirusTotal (ověření souborů)",
        url: "https://www.virustotal.com/",
        fileType: "Web",
      },
    ],
  },
];

export const csHubContent: HubContent = {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
};