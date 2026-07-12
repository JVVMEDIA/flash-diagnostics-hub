import type { Category } from "../types";

export const diagnostikaCategories: Category[] = [
  {
    id: "bootloop-brick",
    brandIds: ["motorola", "samsung", "android"],
    title: "Bootloop / Brick",
    description:
      "A készülék folyamatosan újraindul, a logónál ragad, vagy egyáltalán nem reagál. A diagnosztika az elérhető mód azonosításával kezdődik.",
    overview: [
      "Soft brick: a készülék fastboot/download/EDL módba vihető — flash-sel helyreállítható.",
      "Hard brick: nincs válasz, fekete képernyő, a PC nem ismeri fel a készüléket — test point vagy szerviz szükséges.",
      "Bootloop OTA után: gyakran segít a cache törlése vagy az utolsó működő ROM újraflashelése.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Mód és tünetek azonosítása",
        description:
          "A helyes mód-diagnózis meghatározza, melyik eszközt használd — Odin, fastboot, SP Flash vagy QPST.",
        steps: [
          "Fastboot: fekete képernyő + „FASTBOOT MODE” felirat — megoldás fastboot flash-sel vagy RSA-val (Motorola).",
          "Download/Odin: Samsung logó + „Downloading...” felirat — megoldás Odin3-mal.",
          "EDL (Qualcomm 9008): fekete képernyő, az Eszközkezelőben Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola rescue.",
          "MTK Download: kikapcsolt telefon, SP Flash Tool USB után észleli — scatter flash.",
          "Unisoc Download: kikapcsolt telefon, Research Download észleli a Spreadtrum portot — PAC flash.",
          "Bootloop a logónál: ismétlődő újraindítás az animációnál — cache törlés, boot/system újraflash.",
          "Hard brick: nincs LED, nincs rezgés — test point, EDL/SPD kényszerítés vagy szerviz.",
        ],
        tips: [
          "Motorola: rossz OTA utáni bootloopot gyakran megoldja az LMSA Rescue manuális fastboot nélkül.",
          "Samsung: root utáni bootloop — HOME_CSC + AP flash Odinnal.",
          "Jegyezd fel az utolsó ismert ROM-verziót flash előtt — segít a downgrade-nél.",
        ],
        links: [
          {
            label: "Android Recovery (hivatalos)",
            url: "https://developer.android.com/studio/run/emulator#recovery",
            fileType: "Guide"
          },
          {
            label: "ADB sideload (hivatalos)",
            url: "https://developer.android.com/studio/command-line/adb#copyfiles",
            fileType: "Guide"
          },
          {
            label: "XDA Bootloop fórum",
            url: "https://forum.xda-developers.com/",
            fileType: "Guide"
          }
        ],
      },
      {
        id: "diag-obnova",
        title: "Helyreállítási eljárás súlyosság szerint",
        description: "A legkevésbé invazív lépéstől a teljes újraflash-ig.",
        steps: [
          "1. szint: Kényszerített újraindítás (Power 15–30 mp) vagy recovery cache partition törlése.",
          "2. szint: Recovery gyári visszaállítás (törli az adatokat, megőrzi a firmware-t).",
          "3. szint: Utolsó működő stock ROM újraflash (Odin/fastboot/LMSA).",
          "4. szint: Régebbi ROM-verzió flash (downgrade), ha az anti-rollback engedi.",
          "5. szint: EDL/QPST vagy test point hard brick esetén.",
          "Ha 3 próbálkozás sikertelen, konzultálj az adott modell XDA szálával.",
        ],
        tips: [
          "Minden flash előtt töltsd legalább 50%-ra.",
          "Odin flash előtt vedd ki a SIM-et és az SD-kártyát (ajánlott).",
        ],
        links: [
          {
            label: "ADB Backup návod",
            url: "https://developer.android.com/tools/adb#backup",
            fileType: "Guide"
          },
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          }
        ],
      },
      {
        id: "diag-motorola",
        title: "Motorola — specifikus problémák",
        description:
          "A leggyakoribb Motorola problémák flash, OTA vagy bootloader feloldás után.",
        steps: [
          "„Bootloader unlocked” figyelmeztetés indításkor — normális feloldás után, nem hiba.",
          "Stuck on Motorola logo: próbáld fastboot flash boot + vbmeta, majd fastboot reboot.",
          "No service / invalid IMEI radio flash után: flash-eld újra a megfelelő radio.img-et a te változatodhoz.",
          "„Fail to boot” OTA után feloldott bootloaderen: flash-eld a teljes RETAIL firmware-t LMSA-val.",
          "FRP lock reset után: jelentkezz be az eredeti Google-fiókkal vagy a hivatalos Motorola FRP eljárással.",
          "Slot A/B mismatch: flash-eld a boot-ot mindkét slotba — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "A fastboot getvar all kimenetét mentsd szövegfájlba — diag verziókat tartalmaz XDA segítséghez.",
          "Moto G MTK modellek: ha a fastboot nem működik, próbáld az SP Flash Tool-t Motorola MTK scatter-rel.",
        ],
        warning: "Más régióból származó radio újraflash-elése véglegesen károsíthatja a mobilhálózatot.",
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Moto G XDA fórum",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide"
          },
          {
            label: "Lolinet Motorola firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP",
            note: "Nem hivatalos mirror"
          }
        ],
      },
    ],
  },
  {
    id: "edl-qualcomm",
    brandId: "qualcomm",
    title: "EDL / Qualcomm (9008)",
    description:
      "Emergency Download Mode Snapdragon készülékekhez — Xiaomi, OnePlus, néhány Motorola, Samsung (ritka).",
    overview: [
      "EDL módban a képernyő fekete, a PC a Qualcomm HS-USB QDLoader 9008-at látja.",
      "Megfelelő firehose/programmer és auth szükséges (egyes gyártóknál).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Belépés EDL módba",
        description: "A módszer a gyártótól és a bootloader állapotától függ.",
        steps: [
          "adb reboot edl — csak engedélyezett EDL hozzáféréssel működik (root/debug, modell-specifikus).",
          "fastboot oem edl — néhány Xiaomi/OnePlus modell.",
          "Test point: pontok rövidítése a PCB-n a séma szerint (szétszerelést igényel).",
          "EDL kábel (adatpinek összekötve) — hardveres módszer test point nélkül.",
          "Ellenőrizd az Eszközkezelőben: Qualcomm HS-USB QDLoader 9008 (COM port).",
        ],
        tips: [
          "Motorola Snapdragon: az EDL hozzáférés gyakran korlátozott — preferáld az RSA/LMSA-t.",
          "Megfelelő hitelesítő nélkül a Mi Flash elutasítja a flash-t (Xiaomi).",
        ],
        links: [
          {
            label: "Qualcomm QDLoader driver",
            url: "https://qcomdriver.com/",
            fileType: "ZIP"
          },
          {
            label: "QPST Flash Tool",
            url: "https://qpsttool.com/",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "diag-edl-flash",
        title: "Flash EDL módban",
        description: "Haladó helyreállítás QPST/QFIL vagy Mi Flash segítségével.",
        steps: [
          "Telepítsd a Qualcomm drivert és a QPST/QFIL-t.",
          "Töltsd le a firehose/programmer-t a pontos modellhez (nem mindig nyilvánosan elérhető).",
          "QFIL-ben: Configuration → Load XML → válaszd a rawprogram.xml + patch.xml fájlokat a firmware-ből.",
          "Kattints a Download Content gombra — a folyamat minden partíciót flash-el.",
          "Befejezés után húzd ki az USB-t, és hosszan tartsd a Power gombot a bekapcsoláshoz.",
        ],
        warning: "Helytelen firehose más modellhez = kritikus NAND-kár.",
        links: [
          {
            label: "Mi Flash Tool",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP"
          },
          {
            label: "QPST Flash Tool",
            url: "https://qpsttool.com/",
            fileType: "ZIP"
          },
          {
            label: "XDA Qualcomm EDL útmutató",
            url: "https://forum.xda-developers.com/t/qualcomm-edl-mode-9008.3602067/",
            fileType: "Guide"
          }
        ],
      },
    ],
  },
  {
    id: "usb-driver",
    title: "USB / Driver problémák",
    description:
      "A PC nem ismeri fel a készüléket ADB, fastboot, Odin vagy SP Flash módban — a sikertelen flash leggyakoribb oka.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Megoldás lépésről lépésre",
        description: "Rendszeres diagnosztika az ismételt flash előtt.",
        steps: [
          "Cseréld ki az USB-kábelt egy ellenőrzött adatkábelre (ne csak töltő).",
          "Csatlakoztasd közvetlenül a PC USB-portjához (ne hubon keresztül).",
          "Az Eszközkezelőben távolítsd el az összes sárga felkiáltójelet Android/ADB/Samsung/MTK alatt.",
          "Telepítsd a megfelelő drivert a mód szerint: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "Indítsd újra a PC-t és a telefont is.",
          "Próbálj másik USB-portot (USB 2.0 gyakran stabilabb, mint a 3.0).",
          "Windows-on ideiglenesen kapcsold ki a driver signature enforcement-et, ha a driver nincs aláírva.",
        ],
        tips: [
          "A Zadig felülírhatja a drivert WinUSB-re — hasznos fastboot-hoz Windows-on.",
          "Linux: udev szabályok adb-hez (sudo usermod -aG plugdev).",
        ],
        links: [
          {
            label: "Universal ADB Driver",
            url: "https://adb.clockworkmod.com/",
            fileType: "EXE"
          },
          {
            label: "Motorola USB illesztőprogramok",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE"
          },
          {
            label: "Zadig (re-driver)",
            url: "https://zadig.akeo.ie/",
            fileType: "EXE"
          }
        ],
      },
    ],
  },
];