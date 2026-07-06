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
  links: FileLink[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subsections: Subsection[];
};

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    title: "Fastboot / ADB",
    description: "Google Pixel, Xiaomi, OnePlus, Motorola a ďalšie zariadenia s odomknutým bootloaderom.",
    subsections: [
      {
        id: "fastboot-priprava",
        title: "Príprava prostredia",
        description: "Nainštaluj oficiálne nástroje a over komunikáciu so zariadením.",
        steps: [
          "Stiahni Android Platform Tools a rozbaľ do priečinka bez medzier v ceste.",
          "Na telefóne zapni Vývojárske možnosti a USB ladenie.",
          "Pripoj kábel a over príkazom: adb devices",
          "Pre flash režim: adb reboot bootloader alebo kombinácia tlačidiel podľa výrobcu.",
        ],
        links: [
          {
            label: "Android Platform Tools (ADB & Fastboot)",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
            note: "Oficiálny Google balík",
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "ZIP",
          },
          {
            label: "Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG",
          },
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flash cez Fastboot",
        description: "Obnova alebo inštalácia oficiálnych obrazov po zálohovaní dát.",
        steps: [
          "Over stav: fastboot devices",
          "Rozbaľ factory image a spusti flash-all.bat / flash-all.sh (ak je súčasťou balíka).",
          "Pri manuálnom flashi: fastboot flash boot boot.img, fastboot flash system system.img atď.",
          "Reštart: fastboot reboot",
        ],
        links: [
          {
            label: "Xiaomi ROM balíky (oficiálne)",
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
    ],
  },
  {
    id: "odin-samsung",
    title: "Odin (Samsung)",
    description: "Oficiálne Samsung postupy pre Galaxy zariadenia v Download móde.",
    subsections: [
      {
        id: "odin-priprava",
        title: "Download mód a driver",
        description: "Samsung zariadenie musí byť rozpoznané v Odin ako Added!!",
        steps: [
          "Vypni telefón, podrž Volume Down + Home/Bixby + Power (podľa modelu).",
          "Potvrď Download mód kombináciou Volume Up.",
          "Nainštaluj Samsung USB Driver a reštartuj PC.",
          "Spusti Odin ako administrátor.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE",
            note: "Oficiálny Samsung driver",
          },
          {
            label: "Samsung Smart Switch (zálohovanie)",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG",
          },
        ],
      },
      {
        id: "odin-flash",
        title: "Flash firmvéru v Odin",
        description: "Používaj len firmware pre presný model (CSC + AP + BL + CP podľa potreby).",
        steps: [
          "Rozbaľ firmware .zip a načítaj súbory do AP, BL, CP, CSC v Odin.",
          "Zaškrtni Auto Reboot a F. Reset Time (odporúčané).",
          "Klikni Start a čakaj na PASS! (zlyhanie = FAIL).",
          "Prvý boot môže trvať 5–15 minút.",
        ],
        links: [
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Overený katalóg podľa modelu",
          },
          {
            label: "Frija / SamFirm (oficiálne sťahovanie)",
            url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/",
            fileType: "EXE",
          },
        ],
      },
    ],
  },
  {
    id: "sp-flash",
    title: "SP Flash Tool",
    description: "MediaTek (MTK) zariadenia — scatter súbor a DA loader.",
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter a USB driver",
        description: "Bez správneho scatter.txt a VCOM drivera flash zlyhá.",
        steps: [
          "Stiahni firmware pre presný model (obsahuje scatter.txt).",
          "Nainštaluj MediaTek USB VCOM driver.",
          "Vypni telefón, pripoj USB až po kliknutí Download v SP Flash Tool.",
          "Vyber Download-Agent a scatter zo firmware balíka.",
        ],
        links: [
          {
            label: "SP Flash Tool (MediaTek)",
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
        title: "Download Only vs Firmware Upgrade",
        description: "Download Only pre jednotlivé partície, Firmware Upgrade pre kompletný flash.",
        steps: [
          "Načítaj scatter file — partície sa zobrazia automaticky.",
          "Pre formát + flash: Firmware Upgrade + Download.",
          "Pre opravu boot: Download Only + vyber len boot/recovery.",
          "Po PASS odpoj kábel a zapni zariadenie manuálne.",
        ],
        links: [
          {
            label: "Needrom MTK firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
            note: "Over model pred sťahovaním",
          },
        ],
      },
    ],
  },
];

export const diagnostikaCategories: Category[] = [
  {
    id: "bootloop-brick",
    title: "Bootloop / Brick",
    description: "Zariadenie sa neustále reštartuje alebo nejde zapnúť.",
    subsections: [
      {
        id: "diag-rezimy",
        title: "Identifikácia režimu",
        description: "Urči, do akého módu sa zariadenie dá dostať — to rozhodne o metóde obnovy.",
        steps: [
          "Fastboot: logo + text fastboot — obnova cez fastboot/flash tool.",
          "Download/Odin: Samsung logo s textom Downloading — Odin.",
          "EDL (Qualcomm): čierna obrazovka, PC rozpozná Qualcomm HS-USB — QPST/MI Flash.",
          "Hard brick: žiadna odozva — test point alebo autorizovaný servis.",
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
        title: "Postup obnovy",
        description: "Vždy skús najprv oficiálny firmware pre daný model.",
        steps: [
          "Zálohuj dáta ak je to ešte možné (adb backup / Smart Switch).",
          "Flash posledný známy funkčný oficiálny ROM.",
          "Wipe cache/dalvik ak bootloop po OTA.",
          "Ak zlyhá 3×, skús predchádzajúcu verziu firmvéru.",
        ],
        links: [
          {
            label: "ADB Backup návod",
            url: "https://developer.android.com/tools/adb#backup",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
  {
    id: "edl-qualcomm",
    title: "EDL / Qualcomm",
    description: "Emergency Download Mode pre Snapdragon zariadenia.",
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Vstup do EDL",
        description: "Metóda závisí od výrobcu — test point, adb alebo kombinácia tlačidiel.",
        steps: [
          "adb reboot edl (ak je povolené a máš root/debug).",
          "Test point: skrátenie určených bodov na doske (podľa schémy modelu).",
          "Niektoré Xiaomi: Volume Up + Volume Down + USB.",
          "Over v Správcovi zariadení: Qualcomm HS-USB QDLoader 9008.",
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
    ],
  },
  {
    id: "usb-driver",
    title: "USB / Driver problémy",
    description: "PC nerozpozná zariadenie — najčastejšia príčina zlyhaného flashu.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Riešenie krok za krokom",
        description: "Skontroluj kábel, port a driver pred opakovaným flashom.",
        steps: [
          "Použi priamy USB port (nie hub), vymeň kábel za dátový.",
          "Odinštaluj staré ADB/USB drivery v Správcovi zariadení.",
          "Nainštaluj správny driver pre režim (ADB / VCOM / Samsung / Qualcomm).",
          "Reštartuj PC a telefón, skús iný USB port.",
        ],
        links: [
          {
            label: "Universal ADB Driver",
            url: "https://adb.clockworkmod.com/",
            fileType: "EXE",
          },
          {
            label: "Zadig (re-driver pre Windows)",
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
    title: "Flash nástroje",
    description: "Oficiálne a overené nástroje pre jednotlivé platformy.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB",
        description: "Základný balík pre Android flash a ladenie.",
        steps: [
          "Rozbaľ ZIP do C:\\platform-tools alebo ~/platform-tools.",
          "Pridaj cestu do PATH alebo spúšťaj z priečinka.",
          "Over: adb version && fastboot --version",
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
        id: "nastroj-odin",
        title: "Odin 3",
        description: "Samsung Download mode flash nástroj.",
        steps: [
          "Používaj Odin3 len z overených zdrojov.",
          "Nespúšťaj viacero inštancií naraz.",
          "Firmware musí sedieť s modelom (SM-XXXX).",
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
        title: "SP Flash Tool",
        description: "MediaTek flash s scatter súborom.",
        steps: [
          "Vyžaduje VCOM driver a vypnuté zariadenie.",
          "Nepoužívaj Format All bez zálohy (hard brick).",
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
        id: "nastroj-miflash",
        title: "Mi Flash",
        description: "Xiaomi oficiálny flash nástroj pre EDL/Fastboot.",
        steps: [
          "Vyžaduje autorizovaný Mi account pre niektoré modely.",
          "Vyber správny režim: clean all / save user data.",
        ],
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP",
          },
          {
            label: "Xiaomi ROM",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
        ],
      },
    ],
  },
  {
    id: "firmver-baliky",
    title: "Firmvér balíky",
    description: "Katalógy oficiálnych a overených ROM podľa značky.",
    subsections: [
      {
        id: "fw-samsung",
        title: "Samsung",
        description: "Vyhľadaj podľa modelu SM-XXXX a regiónu CSC.",
        steps: ["Over presný model v Nastavenia → Informácie.", "Sťahuj len kompletný firmware balík."],
        links: [
          { label: "SamMobile", url: "https://www.sammobile.com/samsung/firmware/", fileType: "ZIP" },
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM vs Recovery ROM — vyber podľa režimu flashu.",
        steps: ["Fastboot ROM pre Mi Flash.", "Recovery ZIP pre TWRP/oficiálne OTA."],
        links: [
          { label: "Xiaomi Firmware Updater", url: "https://xiaomifirmwareupdater.com/", fileType: "TAR" },
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory images priamo od Google.",
        steps: ["Stiahni image pre presný kód zariadenia.", "Použi flash-all skript z balíka."],
        links: [
          { label: "Google Factory Images", url: "https://developers.google.com/android/images", fileType: "ZIP" },
        ],
      },
    ],
  },
];

export const zdielanieSubsections: Subsection[] = [
  {
    id: "zip-7zip",
    title: "Password-protected ZIP (AES-256)",
    description: "Štandardný spôsob ochrany firmvéru a citlivých súborov pred prenosom.",
    steps: [
      "Pravý klik na priečinok → 7-Zip → Add to archive.",
      "Formát: zip, šifrovanie: AES-256, zadaj silné heslo.",
      "Heslo pošli iným kanálom (Signal, SMS, osobne).",
    ],
    links: [
      { label: "7-Zip (Windows)", url: "https://www.7-zip.org/download.html", fileType: "EXE" },
      { label: "7-Zip (Linux/macOS)", url: "https://www.7-zip.org/download.html", fileType: "TAR / PKG" },
    ],
  },
  {
    id: "zdielanie-platformy",
    title: "Odporúčané platformy",
    description: "Bezpečné odoslanie veľkých súborov s heslom v samostatnej správe.",
    steps: [
      "Nahraj ZIP na platformu s expiráciou odkazu.",
      "Heslo pošli cez iný kanál (nie v tom istom e-maile).",
      "Po stiahnutí zmaž súbor zo servera ak je to možné.",
    ],
    links: [
      { label: "SwissTransfer", url: "https://www.swisstransfer.com/", fileType: "Web" },
      { label: "WeTransfer", url: "https://wetransfer.com/", fileType: "Web" },
      { label: "Proton Drive", url: "https://proton.me/drive", fileType: "Web" },
      { label: "MEGA", url: "https://mega.io/", fileType: "Web" },
    ],
  },
];