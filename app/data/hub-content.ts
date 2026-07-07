export type FileLink = {
  label: string;
  url: string;
  fileType?: string;
  note?: string;
};

export type Subsection = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips?: string[];
  warning?: string;
  links: FileLink[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  brandId?: string;
  brandIds?: string[];
  overview?: string[];
  subsections: Subsection[];
};

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Univerzálna metóda pre Google Pixel, Xiaomi, OnePlus, Motorola a ďalšie zariadenia s odomknutým bootloaderom. Vyžaduje USB ladenie, správne drivery a overený firmvér.",
    overview: [
      "Fastboot je nízkoúrovňový režim pre flash jednotlivých partícií (boot, recovery, system, vendor).",
      "ADB (Android Debug Bridge) slúži na komunikáciu so zapnutým systémom — zálohy, presuny súborov, reboot do fastboot.",
      "Vždy over modelové označenie (napr. XT2343-2) pred sťahovaním firmvéru.",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "Príprava PC a prostredia",
        description:
          "Správne nastavené prostredie je základ. Chybná cesta k platform-tools alebo starý driver sú najčastejšie príčiny zlyhania.",
        steps: [
          "Stiahni Android Platform Tools a rozbaľ do priečinka bez medzier (napr. C:\\platform-tools).",
          "Otvor terminál v tomto priečinku alebo pridaj cestu do systémovej PATH.",
          "Na telefóne: Nastavenia → O telefóne → 7× klepni na Číslo zostavy → Vývojárske možnosti.",
          "Zapni USB ladenie a (ak existuje) OEM odomknutie bootloadera.",
          "Pripoj USB kábel, potvrď dialóg „Povoliť ladenie USB“ na telefóne.",
          "Over spojenie: adb devices — musí sa zobraziť sériové číslo so stavom „device“.",
          "Pre flash režim: adb reboot bootloader alebo fyzická kombinácia tlačidiel podľa výrobcu.",
          "V fastboot over: fastboot devices",
        ],
        tips: [
          "Ak adb devices ukazuje „unauthorized“, odpoj kábel, zruš autorizácie ladenia na telefóne a pripoj znova.",
          "Na Windows preferuj USB 2.0 port pri problémoch s rozpoznaním zariadenia.",
          "Vypni MIUI optimalizáciu (Xiaomi) ak adb náhodne padá.",
        ],
        links: [
          {
            label: "Android Platform Tools (ADB & Fastboot)",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
            note: "Oficiálny Google balík — vždy aktualizuj pred flashom",
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "ZIP",
          },
          {
            label: "Minimal ADB & Fastboot (alternatíva)",
            url: "https://forum.xda-developers.com/t/tool-minimal-adb-and-fastboot-2-9-18.2317790/",
            fileType: "EXE",
            note: "Ľahší inštalátor pre začiatočníkov",
          },
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flash cez Fastboot — všeobecný postup",
        description:
          "Manuálny alebo skriptový flash oficiálnych obrazov. Poradie príkazov a názvy partícií sa líšia podľa výrobcu.",
        steps: [
          "Zálohuj fotky, kontakty a dôležité dáta — flash väčšinou vymaže userdata.",
          "Over odomknutý bootloader: fastboot oem device-info (Motorola) alebo fastboot getvar unlocked.",
          "Rozbaľ stiahnutý firmware do jedného priečinka.",
          "Ak balík obsahuje flash-all.bat / flash-all.sh, preferuj tento skript pred manuálnym flashom.",
          "Manuálne: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "Pre A/B sloty: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "Po úspešnom flashi: fastboot reboot alebo fastboot reboot recovery.",
          "Prvý boot po flashi trvá 5–20 minút — nedotýkaj sa zariadenia.",
        ],
        tips: [
          "Príkaz fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img niektoré ROM vyžadujú pre root/custom kernel.",
          "Ak fastboot hlási „waiting for device“, skontroluj driver a kábel.",
          "Nikdy neflashuj boot.img z iného modelu — riziko hard bricku.",
        ],
        warning:
          "Flash nesprávneho firmvéru alebo prerušenie procesu môže zariadenie natrvalo poškodiť. Vždy over presný model a variant (Global/EU/India).",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG",
          },
          {
            label: "Xiaomi ROM balíky",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
          {
            label: "OnePlus OxygenOS balíky",
            url: "https://oxygenos.oneplus.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — factory image",
        description: "Oficiálny spôsob obnovy Pixelu na čistý stav priamo od Google.",
        steps: [
          "Nájdi kód zariadenia (napr. felix, cheetah) na stránke factory images.",
          "Stiahni ZIP pre presnú verziu Androidu.",
          "Rozbaľ archív, spusti flash-all.bat (Windows) alebo ./flash-all.sh (Linux/macOS).",
          "Skript automaticky reštartuje do bootloadera a flashne všetky partície.",
          "Ak flash-all zlyhá, spusti jednotlivé príkazy z flash-all.sh manuálne.",
        ],
        tips: [
          "Pixel 6+ používa Android Verified Boot — custom ROM vyžaduje aj správny vbmeta.",
          "Ak je bootloader zamknutý, factory image flash nebude fungovať bez odomknutia.",
        ],
        links: [
          {
            label: "Pixel Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP",
          },
          {
            label: "Pixel OTA balíky",
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
      "Kompletný sprievodca pre Moto G, Moto Edge, Moto Razr a ďalšie modely (XT-xxxx). Motorola používa fastboot, vlastný unlock proces a oficiálne nástroje RSA/LMSA.",
    overview: [
      "Modelové číslo nájdeš v Nastavenia → O telefóne → Model (napr. moto g84 5G, XT2347-2).",
      "Bootloader sa odomyká cez oficiálnu Motorola stránku — proces je bezplatný, ale môže zrušiť záruku.",
      "Po odomknutí sa zobrazí varovná hláška pri štarte — to je normálne.",
      "Motorola často distribuuje OTA balíky; pre downgrade potrebuješ starší RETAIL flash file.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Odomknutie bootloadera (oficiálne)",
        description:
          "Bez odomknutého bootloadera nie je možný custom ROM ani manuálny fastboot flash väčšiny partícií.",
        steps: [
          "Zapni Vývojárske možnosti a USB ladenie na telefóne.",
          "Zapni tiež „OEM odomknutie“ (ak je dostupné v menu vývojára).",
          "Pripoj telefón k PC a spusti: adb reboot bootloader",
          "V fastboot získaj unlock dáta: fastboot oem get_unlock_data",
          "Skopíruj celý výstup (viac riadkov začínajúcich BOOTLOADER...).",
          "Navštív Motorola bootloader unlock stránku, prihlás sa účtom Moto / Lenovo.",
          "Vlož unlock dáta do formulára a odošli žiadosť.",
          "Po schválení e-mailom spusti: fastboot oem unlock UNIQUE_KEY (kľúč z e-mailu).",
          "Potvrď na telefóne Volume Up — zariadenie sa vymaže (factory reset).",
        ],
        tips: [
          "Žiadosť môže byť zamietnutá u zariadení od operátora (carrier-locked).",
          "Ulož si UNIQUE_KEY z e-mailu — pri opätovnom locknutí ho môžeš potrebovať.",
          "fastboot oem get_unlock_data funguje len v bootloader móde.",
          "Niektoré novšie Moto modely vyžadujú aj Wi-Fi pripojenie pri unlock žiadosti.",
        ],
        warning:
          "Odomknutie bootloadera vymaže všetky dáta a môže natrvalo zablokovať niektoré bankové/payment aplikácie (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock (oficiálne)",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web",
            note: "Jediný oficiálny spôsob odomknutia",
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
        title: "Flash firmvéru cez Fastboot",
        description:
          "Obnova na stock ROM, downgrade alebo oprava bootloopu po neúspešnom OTA. Vyžaduje odomknutý bootloader a správny RETAIL flash balík.",
        steps: [
          "Stiahni firmware pre presný model XT-xxxx a variant (RETAIL/EU/SINGLE_SIM).",
          "Rozbaľ ZIP — nájdeš súbory boot.img, vbmeta.img, radio.img, super.img alebo sparse images.",
          "Reštartuj do fastboot: adb reboot bootloader",
          "Over stav: fastboot getvar unlocked — musí byť yes.",
          "Flashni boot: fastboot flash boot boot.img",
          "Flashni vbmeta (ak je v balíku): fastboot flash vbmeta vbmeta.img",
          "Flashni modem/radio (ak je): fastboot flash modem radio.img",
          "Pre kompletný flash použi flashfile.sh / flashfile.bat z oficiálneho balíka.",
          "Reštart: fastboot reboot — prvý boot 10–15 minút.",
        ],
        tips: [
          "Motorola super partition: novšie modely používajú fastboot flash super super.img.",
          "Ak flash zlyhá na „invalid sparse file“, stiahni inú verziu balíka alebo použi LMSA.",
          "Pre downgrade musí byť cieľová verzia staršia alebo rovnaká — novší anti-rollback môže flash zablokovať.",
          "fastboot oem fb_mode_set clear môže pomôcť pri bootloop po neúspešnom flashi (model-špecifické).",
        ],
        warning:
          "Flash nesprávneho radio/modem.img pre iný variant (napr. EU vs US) môže zničiť sieťové pásma a GPS.",
        links: [
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
            note: "Overené RETAIL balíky podľa modelu XT",
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
            note: "Oficiálny rescue nástroj — obnova bez manuálneho fastboot",
          },
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA a Rescue nástroje (oficiálne GUI)",
        description:
          "Lenovo Moto Smart Assistant a Motorola RSA umožňujú obnovu stock ROM cez grafické rozhranie — vhodné ak fastboot príkazy zlyhávajú.",
        steps: [
          "Stiahni a nainštaluj Motorola Rescue and Smart Assistant (RSA) alebo LMSA.",
          "Zapni USB ladenie na telefóne.",
          "Spusti nástroj ako administrátor na Windows.",
          "Pripoj telefón — nástroj automaticky deteguje model.",
          "Vyber „Rescue“ alebo „Repair“ a stiahni odporúčaný firmware.",
          "Nechaj proces dokončiť — telefón sa môže niekoľkokrát reštartovať.",
          "Po dokončení odpoj a nechaj zariadenie dokončiť first boot.",
        ],
        tips: [
          "RSA vyžaduje stabilné internetové pripojenie na stiahnutie firmvéru.",
          "Pri rescue režime sa často vymažú všetky dáta.",
          "Ak RSA nerozpozná zariadenie, skús iný USB port alebo Motorola driver.",
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
        title: "Populárne modely a špecifiká",
        description:
          "Rýchly prehľad najčastejších Motorola sérií a špecifík flashovania.",
        steps: [
          "Moto G séria (g14, g24, g34, g54, g84): fastboot unlock + RETAIL ZIP, často MTK alebo Snapdragon.",
          "Moto Edge (edge 30, 40, 50): super partition, OTA cez LMSA, fastboot pre downgrade.",
          "Moto Razr (fold): citlivý displej — pri flashi nepoužívaj force reboot, len fastboot reboot.",
          "Moto One / Android One: bootloader unlock podľa regiónu, stock image od Google/Motorola.",
          "Over SKU v fastboot: fastboot getvar all — hľadaj channel-id, version-boot, product.",
        ],
        tips: [
          "Dual SIM varianty majú iný CSC kód — firmware musí sedieť.",
          "Carrier-branded modely (Verizon, AT&T) často nemajú unlock možnosť.",
          "Moto Actions a gestá sa po flashi obnovia automaticky s stock ROM.",
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
      "Oficiálny spôsob flashovania Samsung Galaxy v Download móde. Vyžaduje správny firmware (AP, BL, CP, CSC), Samsung USB driver a Odin3.",
    overview: [
      "Download mód (Odin mód) sa aktivuje kombináciou Volume Down + Power (+ Bixby na starších modeloch).",
      "CSC kód určuje región a jazyk — HOME_CSC zachová dáta, CSC ich vymaže.",
      "Odin zobrazuje Added!! keď je telefón správne pripojený.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Download mód, driver a záloha",
        description:
          "Pred flashom vždy zálohuj dáta cez Smart Switch. Nesprávny driver = telefón sa v Odin nezobrazí.",
        steps: [
          "Nainštaluj Samsung USB Driver a reštartuj PC.",
          "Zálohuj telefón cez Samsung Smart Switch (fotky, kontakty, aplikácie).",
          "Vypni telefón úplne.",
          "Podrž Volume Down + Power (+ Bixby ak existuje) cca 10 sekúnd.",
          "Keď sa zobrazí varovanie, stlač Volume Up pre vstup do Download módu.",
          "Pripoj USB kábel — Odin by mal ukázať modrý box COM port s Added!!",
          "Spusti Odin3 ako administrátor.",
        ],
        tips: [
          "Ak Added!! chýba, skús iný kábel, port alebo reinstaluj driver.",
          "Vypni Samsung Kies / Smart Switch počas flashu Odin — môžu kolidovať.",
          "Batéria by mala mať min. 50 % pred flashom.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE",
            note: "Oficiálny Samsung driver",
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
        title: "Flash firmvéru v Odin — AP, BL, CP, CSC",
        description:
          "Kompletný flash stock firmware. Každý súbor má svoj slot v Odin.",
        steps: [
          "Stiahni firmware pre presný model SM-XXXX a región CSC.",
          "Rozbaľ .zip — nájdeš AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5.",
          "V Odin klikni BL → vyber BL súbor.",
          "Klikni AP → vyber AP súbor (môže trvať dlhšie načítanie).",
          "Klikni CP → vyber CP súbor (modem/radio).",
          "Klikni CSC → vyber HOME_CSC (zachová dáta) alebo CSC (factory reset).",
          "Zaškrtni Auto Reboot a F. Reset Time.",
          "Klikni Start — čakaj na zelené PASS! (červené FAIL = niečo zlyhalo).",
          "Telefón sa reštartuje — prvý boot 5–15 minút pri veľkých aktualizáciách.",
        ],
        tips: [
          "AP obsahuje system, recovery, vbmeta — nikdy ho nepreskakuj.",
          "Pri FAIL skontroluj, či firmware sedí s modelom a či je Download mód aktívny.",
          "Odin3 verzia 3.14.1+ odporúčaná pre novšie Galaxy (S21+).",
          "One UI downgrade môže byť blokovaný anti-rollback — flash len rovnakú alebo novšiu verziu.",
        ],
        warning:
          "Flash firmware z iného regiónu môže spôsobiť stratu Samsung Pay, dual SIM funkcií alebo LTE pásiem.",
        links: [
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Katalóg podľa SM modelu a CSC",
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
        title: "PIT súbor a repartition",
        description:
          "Pri zmene veľkosti partícií alebo obnove po hard bricku môže byť potrebný PIT súbor.",
        steps: [
          "PIT súbor získaj z firmware balíka alebo cez Odin (Repartition — len pre pokročilých).",
          "V Odin zaškrtni Re-Partition a načítaj .pit súbor.",
          "Flashni potom AP, BL, CP, CSC ako pri štandardnom postupe.",
          "Re-Partition vymaže všetky dáta — používaj len ak štandardný flash zlyhá.",
        ],
        tips: [
          "Nesprávny PIT môže trvalo poškodiť úložisko — repartition len ako posledná možnosť.",
        ],
        warning: "Re-Partition bez správneho PIT = kritické riziko hard bricku.",
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
      "Flash MediaTek (MTK) čipsetov cez scatter súbor a Download Agent. Používa sa u mnohých budget a mid-range zariadení vrátane niektorých Motorola (MTK varianty).",
    overview: [
      "Scatter.txt definuje partície a adresy flash pamäte.",
      "Telefón musí byť vypnutý pred pripojením USB (Download mód).",
      "Format All bez zálohy = takmer istý hard brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA a VCOM driver",
        description:
          "Bez správneho scatter.txt, Download Agent a MediaTek VCOM drivera flash nezačne.",
        steps: [
          "Stiahni firmware pre presný model (musí obsahovať scatter.txt a images/).",
          "Nainštaluj MediaTek USB VCOM driver (pre Windows 10/11 64-bit).",
          "Rozbaľ SP Flash Tool (najnovšia kompatibilná verzia pre tvoj chipset).",
          "Spusti flash_tool.exe ako administrátor.",
          "Klikni Choose na Download-Agent — vyber MTK_AllInOne_DA.bin alebo DA zo firmware.",
          "Klikni Choose na Scatter — vyber scatter.txt.",
          "Partície sa načítajú automaticky — nezaškrtávaj zbytočné položky.",
        ],
        tips: [
          "Pre Helio G99/G100 čipsety môže byť potrebná novšia verzia SP Flash Tool v5.",
          "Ak scatter hlási chybu, firmware je pre iný variant pamäte (4GB vs 6GB RAM).",
          "Vypni Windows Defender počas flashu — môže blokovať flash_tool.",
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
          "Tri režimy flashu — vyber podľa situácie. Format All je najnebezpečnejší.",
        steps: [
          "Download Only: flash vybraných partícií bez mazania — na opravu boot/recovery.",
          "Firmware Upgrade: flash všetkých partícií + update — štandardná obnova stock ROM.",
          "Format All + Download: kompletné vymazanie a flash — len pri hard bricku.",
          "Vyber režim v rozbaľovacom menu pred kliknutím Download.",
          "Klikni Download, potom pripoj vypnutý telefón cez USB.",
          "SP Flash Tool deteguje zariadenie a začne progress bar.",
          "Po zelenom OK odpoj kábel a zapni telefón manuálne (dlhé stlačenie Power).",
        ],
        tips: [
          "Ak progress stojí na 0 %, skontroluj VCOM driver a vypni MIUI USB debugging (secure).",
          "Pre Motorola MTK varianty používaj firmware špecificky pre MTK SKU.",
        ],
        warning:
          "Format All bez overeného firmware pre daný model = veľké riziko trvalého bricku.",
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
    title: "Unisoc (Spreadtrum) & UFS pamäť",
    description:
      "Flash budget a mid-range zariadení s Unisoc čipsetom (Tecno, Infinix, Realme, ZTE). UFS úložisko, obnova z hardbricku a riešenie FRP po factory reset.",
    overview: [
      "Unisoc (dříve Spreadtrum) používa SPD / Research Download namiesto fastbootu.",
      "UFS je rýchlejšia pamäť než eMMC — flash vyžaduje správny PAC balík a verziu Download Agent.",
      "Hardbrick = čierna obrazovka, PC nerozpozná telefón — riešenie cez test point alebo autorizovaný servis.",
      "FRP (Factory Reset Protection) sa aktivuje po resete bez pôvodného Google účtu.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — flash Unisoc",
        description:
          "Štandardný postup pre Unisoc zariadenia s PAC firmvérom. Telefón musí byť v Download móde (vypnutý + USB).",
        steps: [
          "Stiahni PAC firmvér pre presný model (CPU + RAM + UFS/eMMC variant).",
          "Nainštaluj Spreadtrum / Unisoc USB driver (SCI Android USB Driver).",
          "Spusti Research Download Tool alebo SPD Upgrade Tool ako administrátor.",
          "Vyber PAC súbor — nástroj rozbalí partície (boot, system, userdata, persist).",
          "Vypni telefón, podrž Volume Down + pripoj USB (model-špecifické kombinácie).",
          "Klikni Start Download — progress bar musí bežať bez chyby BROM.",
          "Po PASS odpoj USB a zapni telefón (prvý boot 5–15 minút).",
        ],
        tips: [
          "PAC z iného modelu = riziko hard bricku — over chipset (napr. T606, T610, T760).",
          "Ak nástroj hlási „failed to open port“, reinstaluj driver a skús USB 2.0 port.",
          "Niektoré modely vyžadujú starší Research Download 2.9.9004 namiesto RDA.",
        ],
        warning:
          "Flash nesprávneho PAC alebo prerušenie procesu môže zariadenie natrvalo poškodiť.",
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
        title: "UFS pamäť — špecifiká flashovania",
        description:
          "UFS (Universal Flash Storage) je bežná u novších Unisoc, Qualcomm a Samsung zariadení. Vyžaduje presný firmware a správny Download Agent.",
        steps: [
          "Over typ úložiska: Nastavenia → Úložisko alebo špecifikácia modelu (UFS 2.1 / 2.2 / 3.x).",
          "UFS firmvér nie je kompatibilný s eMMC variantom toho istého modelu.",
          "Pre Unisoc: flashuj celý PAC — nepoužívaj čiastočný flash jednotlivých partícií bez skúseností.",
          "Pre Qualcomm UFS: EDL + firehose (QPST/QFIL) s rawprogram.xml z firmware balíka.",
          "Po flashi UFS zariadenia prvý boot trvá dlhšie — neprerušuj napájanie.",
          "Ak flash zlyhá na „storage mismatch“, stiahni firmware pre správnu kapacitu (64/128/256 GB).",
        ],
        tips: [
          "UFS má vyšší wear — opakovaný Format All zvyšuje riziko zlyhania čipu.",
          "Zálohuj persist a nvram partície pred experimentálnym flashom (ak máš root/debug prístup).",
        ],
        warning:
          "Nesprávny firehose alebo UFS programmer pre iný model môže úložisko nezvratne poškodiť.",
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
        title: "FRP bypass / odstránenie ochrany",
        description:
          "Factory Reset Protection blokuje nastavenie po resete bez pôvodného Google účtu. Legálne riešenie = prihlásenie vlastníckeho účtu.",
        steps: [
          "Oficiálne: prihlás Google účet, ktorý bol na zariadení pred resetom.",
          "Ak máš prístup k menu: Nastavenia → Účty → odstráň starý účet pred factory reset.",
          "Po flashi stock PAC bez wipe userdata môže FRP ostať — použij clean flash (userdata format).",
          "Download mód + flash plný stock PAC často resetuje FRP spolu so systémom.",
          "U operátorských modelov kontaktuj operátora s dokladom o vlastníctve.",
          "Servisné nástroje (autorizované) môžu FRP vymazať legálne pri oprave.",
        ],
        tips: [
          "Nikdy nekupuj telefón s aktívnym FRP — môže byť stratený alebo kradnutý.",
          "Po úspešnom flashi dokonči setup wizard s vlastným Google účtom.",
        ],
        warning:
          "Obchádzanie FRP na cudzom zariadení môže byť nelegálne. Postupuj len na vlastnom telefóne alebo so súhlasom vlastníka.",
        links: [
          {
            label: "Google FRP help (oficiálne)",
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
        title: "Oživenie z hardbricku",
        description:
          "Zariadenie nereaguje, čierna obrazovka, PC nevidí ADB ani fastboot. Postup od najmenej invazívneho kroku.",
        steps: [
          "Soft brick: skús Download mód (Volume Down + USB) a flash stock PAC cez Research Download.",
          "Ak PC nevidí zariadenie: reinstaluj Spreadtrum driver, vymeň kábel a port.",
          "Stlač kombináciu pre BROM mód (často Volume Up + USB pri vypnutom telefóne).",
          "Test point: skráť testovacie body na PCB podľa schémy modelu — vstup do Download módu.",
          "Ak flash zlyhá na 0 %: nesprávny PAC, poškodený UFS čip alebo vybitá batéria.",
          "Úroveň servis: ISP / UFS programmer pri fyzickom poškodení pamäte alebo PMIC.",
          "Po úspešnom flashi nechaj zariadenie 20 minút na nabíjačke pred prvým bootom.",
        ],
        tips: [
          "Zapíš si posledný funkčný PAC a verziu pred experimentom — uľahčí downgrade.",
          "Batéria pod 20 % často spôsobí failed flash na UFS zariadeniach.",
          "Ak telefón vibruje ale nemá obraz, problém môže byť display — nie brick.",
        ],
        warning:
          "Test point a ISP zásah vyžadujú skúsenosti — nesprávny postup môže poškodiť motherboard.",
        links: [
          {
            label: "GSMHosting Unisoc firmware",
            url: "https://www.gsmhosting.com/unisoc-firmware/",
            fileType: "PAC",
          },
          {
            label: "XDA Hard Brick poradňa",
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
      "Zariadenie sa neustále reštartuje, zasekne na logu alebo vôbec nereaguje. Diagnostika začína identifikáciou dostupného režimu.",
    overview: [
      "Soft brick: zariadenie sa dá dostať do fastboot/download/EDL — obnoviteľné flashom.",
      "Hard brick: žiadna odozva, čierna obrazovka, PC nerozpozná zariadenie — vyžaduje test point alebo servis.",
      "Bootloop po OTA: často pomôže wipe cache alebo re-flash posledného funkčného ROM.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Identifikácia režimu a symptómov",
        description:
          "Správna diagnóza režimu určí, ktorý nástroj použiť — Odin, fastboot, SP Flash alebo QPST.",
        steps: [
          "Fastboot: čierna obrazovka + text „FASTBOOT MODE“ — riešenie cez fastboot flash alebo RSA (Motorola).",
          "Download/Odin: Samsung logo + text „Downloading...“ — riešenie cez Odin3.",
          "EDL (Qualcomm 9008): čierna obrazovka, v Správcovi zariadení Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola rescue.",
          "MTK Download: vypnutý telefón, SP Flash Tool deteguje po USB — scatter flash.",
          "Unisoc Download: vypnutý telefón, Research Download deteguje Spreadtrum port — PAC flash.",
          "Bootloop na logu: opakovaný restart pri animácii — wipe cache, re-flash boot/system.",
          "Hard brick: žiadne LED, žiadna vibrácia — test point, EDL/SPD forcovanie alebo servis.",
        ],
        tips: [
          "Motorola: bootloop po zlom OTA často vyrieši LMSA Rescue bez manuálneho fastboot.",
          "Samsung: bootloop po root — flash HOME_CSC + AP cez Odin.",
          "Zapíš si poslednú známu verziu ROM pred flashom — pomôže pri downgrade.",
        ],
        links: [
          {
            label: "XDA Bootloop poradňa",
            url: "https://forum.xda-developers.com/",
            fileType: "Guide",
          },
        ],
      },
      {
        id: "diag-obnova",
        title: "Postup obnovy podľa závažnosti",
        description: "Od najmenej invazívneho kroku po kompletný re-flash.",
        steps: [
          "Úroveň 1: Vynútený restart (Power 15–30 s) alebo recovery wipe cache partition.",
          "Úroveň 2: Recovery factory reset (vymaže dáta, zachová firmware).",
          "Úroveň 3: Re-flash posledný funkčný stock ROM (Odin/fastboot/LMSA).",
          "Úroveň 4: Flash staršej verzie ROM (downgrade) ak anti-rollback dovolí.",
          "Úroveň 5: EDL/QPST alebo test point pre hard brick.",
          "Ak 3 pokusy zlyhajú, konzultuj XDA thread pre konkrétny model.",
        ],
        tips: [
          "Pred každým flashom nabij na min. 50 %.",
          "Odstráň SIM a SD kartu pred Odin flashom (odporúčané).",
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
        title: "Motorola — špecifické problémy",
        description:
          "Najčastejšie Motorola problémy po flashi, OTA alebo odomknutí bootloadera.",
        steps: [
          "„Bootloader unlocked“ warning pri štarte — normálne po unlock, nie je to chyba.",
          "Stuck on Motorola logo: skús fastboot flash boot + vbmeta, potom fastboot reboot.",
          "No service / invalid IMEI po flashi radio: re-flash správny radio.img pre tvoj variant.",
          "„Fail to boot“ po OTA na unlocked bootloader: flash full RETAIL firmware cez LMSA.",
          "FRP lock po resete: prihlás pôvodný Google účet alebo oficiálny Motorola FRP postup.",
          "Slot A/B mismatch: flash boot do oboch slotov — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "fastboot getvar all ulož do textáku — obsahuje diag verzie pre XDA pomoc.",
          "Moto G MTK modely: ak fastboot nefunguje, skús SP Flash Tool s Motorola MTK scatter.",
        ],
        warning: "Re-flash radio z iného regiónu môže natrvalo poškodiť mobilnú sieť.",
        links: [
          {
            label: "Moto G XDA poradňa",
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
      "Emergency Download Mode pre Snapdragon zariadenia — Xiaomi, OnePlus, niektoré Motorola, Samsung (vzácne).",
    overview: [
      "V EDL móde je obrazovka čierna a PC vidí Qualcomm HS-USB QDLoader 9008.",
      "Vyžaduje správny firehose/programmer a auth (u niektorých výrobcov).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Vstup do EDL módu",
        description: "Metóda závisí od výrobcu a stavu bootloadera.",
        steps: [
          "adb reboot edl — funguje len s povoleným EDL access (root/debug, model-špecifické).",
          "fastboot oem edl — niektoré Xiaomi/OnePlus modely.",
          "Test point: skrátenie bodov na PCB podľa schémy (vyžaduje rozobratie).",
          "EDL kábel (dáta piny prepojené) — hardvérový spôsob bez test point.",
          "Over v Správcovi zariadení: Qualcomm HS-USB QDLoader 9008 (COM port).",
        ],
        tips: [
          "Motorola Snapdragon: EDL prístup je často obmedzený — preferuj RSA/LMSA.",
          "Bez správneho autentifikátora Mi Flash odmietne flash (Xiaomi).",
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
        title: "Flash v EDL režime",
        description: "Pokročilá obnova cez QPST/QFIL alebo Mi Flash.",
        steps: [
          "Nainštaluj Qualcomm driver a QPST/QFIL.",
          "Stiahni firehose/programmer pre presný model (nie vždy verejne dostupný).",
          "V QFIL: Configuration → Load XML → vyber rawprogram.xml + patch.xml z firmware.",
          "Klikni Download Content — proces flashne všetky partície.",
          "Po dokončení odpoj USB a dlho podrž Power pre zapnutie.",
        ],
        warning: "Nesprávny firehose pre iný model = kritické poškodenie NAND.",
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
      "PC nerozpozná zariadenie v ADB, fastboot, Odin alebo SP Flash — najčastejšia príčina zlyhaného flashu.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Riešenie krok za krokom",
        description: "Systematická diagnostika pred opakovaným flashom.",
        steps: [
          "Vymeň USB kábel za overený dátový (nie len nabíjací).",
          "Pripoj priamo do USB portu na PC (nie cez hub).",
          "V Správcovi zariadení odstráň všetky žlté výkričníky pri Android/ADB/Samsung/MTK.",
          "Nainštaluj správny driver podľa režimu: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "Reštartuj PC aj telefón.",
          "Skús iný USB port (USB 2.0 často stabilnejší ako 3.0).",
          "Na Windows vypni dočasne driver signature enforcement ak driver nie je podpísaný.",
        ],
        tips: [
          "Zadig môže prepísať driver na WinUSB — užitočné pre fastboot na Windows.",
          "Linux: pravidlá udev pre adb (sudo usermod -aG plugdev).",
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
    description: "Oficiálne a overené nástroje pre jednotlivé platformy — vždy sťahuj z dôveryhodných zdrojov.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description: "Základný balík pre Android flash, ladenie a komunikáciu so zariadením.",
        steps: [
          "Stiahni ZIP z developer.android.com.",
          "Rozbaľ do C:\\platform-tools alebo ~/platform-tools.",
          "Otvor terminál v priečinku: cd C:\\platform-tools",
          "Over: adb version && fastboot --version",
          "Príkazy: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
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
        description: "Oficiálne GUI nástroje pre rescue, repair a správu Moto zariadení.",
        steps: [
          "RSA: rescue a obnova stock ROM bez príkazového riadku.",
          "LMSA: správa zariadenia, zálohy, aktualizácie, repair.",
          "Oba nástroje vyžadujú internet na stiahnutie firmvéru.",
          "Spúšťaj ako administrátor na Windows 10/11.",
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
        description: "Samsung Download mode flash nástroj — len pre Galaxy zariadenia.",
        steps: [
          "Používaj Odin3 verziu 3.13.1 alebo 3.14.1+ podľa modelu.",
          "Nespúšťaj viacero inštancií naraz.",
          "Firmware musí sedieť s modelom SM-XXXX a CSC kódom.",
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
        description: "Flash MTK zariadení cez scatter — vrátane niektorých Motorola MTK modelov.",
        steps: [
          "Vyžaduje VCOM driver a vypnuté zariadenie.",
          "Nepoužívaj Format All bez overeného firmware.",
          "Download Agent musí byť kompatibilný s chipsetom.",
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
        description: "Flash Unisoc čipsetov cez PAC balík v Download móde.",
        steps: [
          "Nainštaluj Spreadtrum USB driver.",
          "Vyber PAC firmvér pre presný model.",
          "Vypni telefón, pripoj USB v Download móde, spusti flash.",
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
        description: "Xiaomi oficiálny flash nástroj pre EDL a fastboot režim.",
        steps: [
          "Niektoré modely vyžadujú autorizovaný Mi account.",
          "Režimy: clean all (vymaže dáta), save user data, clean all and lock.",
          "Používaj fastboot ROM .tgz balíky.",
        ],
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
          {
            label: "Xiaomi ROM katalóg",
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
    title: "Firmvér balíky podľa značky",
    description: "Katalógy oficiálnych a overených ROM — vždy over modelové označenie pred sťahovaním.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description: "RETAIL flash files pre Moto G, Edge, Razr a ďalšie. Variant SINGLE_SIM/DUAL_SIM a región majú význam.",
        steps: [
          "Nájdi model v Nastavenia → O telefóne (napr. XT2347-2).",
          "Vyber RETAIL channel firmware (nie RETAILD for carrier).",
          "Stiahni ZIP a rozbaľ — flash cez fastboot alebo LMSA.",
          "Pre OTA balíky: metadata a payload.bin vyžadujú recovery sideload.",
        ],
        tips: [
          "Lolinet mirror je komunitou overený zdroj RETAIL balíkov.",
          "Carrier firmware (Verizon, T-Mobile) nie je kompatibilný s unlocked bootloaderom.",
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
        description: "Kompletný firmware s AP, BL, CP, CSC. CSC kód = región (ORX, XEO, OXM...).",
        steps: [
          "Over model: Nastavenia → Informácie → Model číslo SM-XXXX.",
          "Zisti aktuálny CSC: *#1234# alebo v Odin info.",
          "Stiahni matching firmware alebo multi-CSC (OXM).",
        ],
        links: [
          { label: "SamMobile", url: "https://www.sammobile.com/samsung/firmware/", fileType: "ZIP" },
          { label: "Frija downloader", url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/", fileType: "EXE" },
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) pre Mi Flash, Recovery ZIP pre OTA/TWRP.",
        steps: [
          "Fastboot ROM: kompletný flash cez Mi Flash v EDL/fastboot.",
          "Recovery ZIP: OTA aktualizácia cez recovery sideload.",
          "Over codename (napr. tapas, marble) nie marketingový názov.",
        ],
        links: [
          { label: "Xiaomi Firmware Updater", url: "https://xiaomifirmwareupdater.com/", fileType: "TAR" },
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory images a OTA balíky priamo od Google.",
        steps: [
          "Nájdi codename zariadenia na developers.google.com/android/images.",
          "Stiahni image pre presnú verziu.",
          "Spusti flash-all skript z balíka.",
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
      "Štandardný spôsob ochrany firmvéru, scatter súborov, DA loaderov a citlivých návodov pred prenosom.",
    steps: [
      "Vyber priečinok alebo súbory na zdieľanie (firmware, nástroje, dokumentácia).",
      "Pravý klik → 7-Zip → Add to archive.",
      "Archive format: zip (nie 7z ak chceš max. kompatibilitu).",
      "Encryption method: AES-256 (nie ZipCrypto — je slabé).",
      "Zadaj silné heslo (min. 16 znakov, veľké/malé písmená, čísla, symboly).",
      "Zaškrtni Encrypt file names ak je dostupné.",
      "Heslo pošli iným kanálom — Signal, Threema, SMS, osobne.",
    ],
    tips: [
      "7z formát má lepšiu kompresiu, ale ZIP s AES-256 je univerzálnejší.",
      "Pre veľké firmware balíky (2+ GB) zváž rozdelenie na časti.",
    ],
    links: [
      { label: "7-Zip (Windows)", url: "https://www.7-zip.org/download.html", fileType: "EXE" },
      { label: "7-Zip (Linux/macOS)", url: "https://www.7-zip.org/download.html", fileType: "TAR / PKG" },
      { label: "PeaZip (alternatíva)", url: "https://peazip.github.io/", fileType: "EXE" },
    ],
  },
  {
    id: "zdielanie-platformy",
    title: "Odporúčané platformy na zdieľanie",
    description:
      "Bezpečné odoslanie veľkých súborov (firmware, tool balíky) s heslom v samostatnej správe.",
    steps: [
      "Nahraj zašifrovaný ZIP na platformu s expiráciou odkazu (7–30 dní).",
      "Skopíruj odkaz a pošli príjemcovi.",
      "Heslo pošli cez iný kanál (nie v tom istom e-maile/chatu ako odkaz).",
      "Príjemca stiahne, rozbalí 7-Zipom a overí hash súboru ak je k dispozícii.",
      "Po úspešnom stiahnutí zmaž súbor zo servera.",
    ],
    tips: [
      "SwissTransfer: do 50 GB zadarmo, bez registrácie, švajčiarske servery.",
      "Proton Drive: end-to-end šifrovanie, vhodné pre citlivé dáta.",
      "GitHub Releases: vhodné pre verejné open-source nástroje (nie pre paid firmware).",
    ],
    links: [
      { label: "SwissTransfer", url: "https://www.swisstransfer.com/", fileType: "Web", note: "Do 50 GB, expirácia" },
      { label: "WeTransfer", url: "https://wetransfer.com/", fileType: "Web" },
      { label: "Proton Drive", url: "https://proton.me/drive", fileType: "Web" },
      { label: "MEGA", url: "https://mega.io/", fileType: "Web", note: "E2E šifrovanie" },
      { label: "GitHub Releases", url: "https://github.com/JVVMEDIA/flash-diagnostics-hub/releases", fileType: "Web" },
    ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Bezpečnostné pravidlá pri zdieľaní",
    description: "Ako zdieľať firmvér a nástroje legálne a bezpečne.",
    steps: [
      "Zdieľaj len firmware a nástroje, ku ktorým máš právo (oficiálne, open-source, vlastné).",
      "Nikdy neposielaj heslo v tom istom e-maile ako odkaz na súbor.",
      "Over SHA256 hash stiahnutého súboru pred flashom.",
      "Nepoužívaj verejné USB kľúče pre citlivé dáta.",
      "Loguj komu a kedy si súbor odoslal (pre servisné účely).",
    ],
    tips: [
      "Hash overenie: certutil -hashfile firmware.zip SHA256 (Windows).",
      "Pre Motorola firmware over RETAIL channel v názve súboru.",
    ],
    warning: "Zdieľanie proprietárneho firmware bez povolenia môže porušovať licenčné podmienky výrobcu.",
    links: [
      {
        label: "VirusTotal (overenie súborov)",
        url: "https://www.virustotal.com/",
        fileType: "Web",
      },
    ],
  },
];