import type { Category } from "../types";

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Univerzális módszer Google Pixel, Xiaomi, OnePlus, Motorola és más eszközök számára feloldott bootloaderrrel. USB hibakeresés, megfelelő illesztőprogramok és ellenőrzött firmware szükséges.",
    overview: [
      "A Fastboot alacsony szintű mód az egyes partíciók flasheléséhez (boot, recovery, system, vendor).",
      "Az ADB (Android Debug Bridge) a bekapcsolt rendszerrel való kommunikációra szolgál — biztonsági mentések, fájlátvitel, újraindítás fastboot módba.",
      "Mindig ellenőrizd a modellmegjelölést (pl. XT2343-2) a firmware letöltése előtt.",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "PC és környezet előkészítése",
        description:
          "A megfelelően beállított környezet az alap. Hibás platform-tools útvonal vagy régi illesztőprogram a leggyakoribb hibaok.",
        steps: [
          "Töltsd le az Android Platform Tools-t, és csomagold ki szóközmentes mappába (pl. C:\\platform-tools).",
          "Nyiss terminált ebben a mappában, vagy add hozzá az útvonalat a rendszer PATH változóhoz.",
          "A telefonon: Beállítások → Telefon névjegye → 7× koppints a Build számra → Fejlesztői beállítások.",
          "Kapcsold be az USB hibakeresést és (ha elérhető) az OEM bootloader feloldást.",
          "Csatlakoztasd az USB-kábelt, és erősítsd meg a „USB hibakeresés engedélyezése” párbeszédablakot a telefonon.",
          "Ellenőrizd a kapcsolatot: adb devices — meg kell jelennie a sorozatszámnak „device” állapottal.",
          "Flash módhoz: adb reboot bootloader vagy a gyártó szerinti fizikai gombkombináció.",
          "Fastbootban ellenőrizd: fastboot devices",
        ],
        tips: [
          "Ha az adb devices „unauthorized” állapotot mutat, húzd ki a kábelt, töröld a hibakeresési engedélyeket a telefonon, majd csatlakoztasd újra.",
          "Windows alatt USB 2.0 portot érdemes használni, ha az eszköz felismerése problémás.",
          "Kapcsold ki a MIUI optimalizálást (Xiaomi), ha az adb véletlenszerűen összeomlik.",
        ],
        links: [
          {
            label: "Android Platform Tools (ADB & Fastboot)",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP",
            note: "Hivatalos Google csomag — mindig frissíts flash előtt",
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
            note: "Könnyebb telepítő kezdőknek",
          },
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flash Fastbooton keresztül — általános eljárás",
        description:
          "Hivatalos képek manuális vagy szkriptes flashelése. A parancsok sorrendje és a partíciók nevei gyártónként eltérnek.",
        steps: [
          "Készíts biztonsági mentést a fotókról, névjegyekről és fontos adatokról — a flash általában törli a userdata-t.",
          "Ellenőrizd a feloldott bootloadert: fastboot oem device-info (Motorola) vagy fastboot getvar unlocked.",
          "Csomagold ki a letöltött firmware-t egy mappába.",
          "Ha a csomag tartalmaz flash-all.bat / flash-all.sh fájlt, előbb ezt a szkriptet használd a manuális flash helyett.",
          "Manuálisan: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "A/B slotokhoz: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "Sikeres flash után: fastboot reboot vagy fastboot reboot recovery.",
          "Az első boot flash után 5–20 percig tart — ne nyúlj az eszközhöz.",
        ],
        tips: [
          "A fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img parancsot egyes ROM-ok root/custom kernelhez megkövetelik.",
          "Ha a fastboot „waiting for device” üzenetet ad, ellenőrizd az illesztőprogramot és a kábelt.",
          "Soha ne flashelj más modell boot.img fájlját — hard brick kockázata.",
        ],
        warning:
          "Hibás firmware flashelése vagy a folyamat megszakítása véglegesen károsíthatja az eszközt. Mindig ellenőrizd a pontos modellt és változatot (Global/EU/India).",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG",
          },
          {
            label: "Xiaomi ROM csomagok",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP",
          },
          {
            label: "OnePlus OxygenOS csomagok",
            url: "https://oxygenos.oneplus.com/",
            fileType: "ZIP",
          },
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — factory image",
        description: "Hivatalos módszer a Pixel tiszta állapotba állítására közvetlenül a Google-tól.",
        steps: [
          "Keresd meg az eszközkódot (pl. felix, cheetah) a factory images oldalon.",
          "Töltsd le a ZIP-et a pontos Android verzióhoz.",
          "Csomagold ki az archívumot, futtasd a flash-all.bat (Windows) vagy ./flash-all.sh (Linux/macOS) fájlt.",
          "A szkript automatikusan bootloader módba indul, és flasheli az összes partíciót.",
          "Ha a flash-all sikertelen, futtasd manuálisan a flash-all.sh egyes parancsait.",
        ],
        tips: [
          "A Pixel 6+ Android Verified Boot-ot használ — custom ROM-hoz megfelelő vbmeta is kell.",
          "Ha a bootloader zárolt, a factory image flash feloldás nélkül nem fog működni.",
        ],
        links: [
          {
            label: "Pixel Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP",
          },
          {
            label: "Pixel OTA csomagok",
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
      "Teljes útmutató Moto G, Moto Edge, Moto Razr és más modellekhez (XT-xxxx). A Motorola fastbootot, saját feloldási folyamatot és hivatalos RSA/LMSA eszközöket használ.",
    overview: [
      "A modellszámot a Beállítások → Telefon névjegye → Modell menüpontban találod (pl. moto g84 5G, XT2347-2).",
      "A bootloader a hivatalos Motorola oldalon oldható fel — a folyamat ingyenes, de érvénytelenítheti a garanciát.",
      "Feloldás után figyelmeztető üzenet jelenik meg induláskor — ez normális.",
      "A Motorola gyakran OTA csomagokat oszt ki; downgrade-hez régebbi RETAIL flash fájl kell.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Bootloader feloldása (hivatalos)",
        description:
          "Feloldott bootloader nélkül nem lehet custom ROM-ot telepíteni, és a legtöbb partíció manuális fastboot flashelése sem.",
        steps: [
          "Kapcsold be a Fejlesztői beállításokat és az USB hibakeresést a telefonon.",
          "Kapcsold be az „OEM feloldás” opciót is (ha elérhető a fejlesztői menüben).",
          "Csatlakoztasd a telefont a PC-hez, és futtasd: adb reboot bootloader",
          "Fastbootban szerezd meg a feloldási adatokat: fastboot oem get_unlock_data",
          "Másold ki a teljes kimenetet (több sor BOOTLOADER... kezdetű).",
          "Látogasd meg a Motorola bootloader unlock oldalt, jelentkezz be Moto / Lenovo fiókkal.",
          "Illeszd be a feloldási adatokat az űrlapba, és küldd el a kérelmet.",
          "E-mailben jóváhagyás után futtasd: fastboot oem unlock UNIQUE_KEY (kulcs az e-mailből).",
          "Erősítsd meg a telefonon a Volume Up gombbal — az eszköz törlődik (gyári alaphelyzet).",
        ],
        tips: [
          "A kérelmet elutasíthatják szolgáltatói zárolású (carrier-locked) eszközöknél.",
          "Mentsd el az e-mailből a UNIQUE_KEY-t — újrazároláskor szükséged lehet rá.",
          "A fastboot oem get_unlock_data csak bootloader módban működik.",
          "Egyes újabb Moto modellek Wi-Fi kapcsolatot is igényelnek a feloldási kérelemhez.",
        ],
        warning:
          "A bootloader feloldása törli az összes adatot, és véglegesen blokkolhat egyes banki/fizetési alkalmazásokat (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock (hivatalos)",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web",
            note: "Az egyetlen hivatalos feloldási módszer",
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
        title: "Firmware flash Fastbooton keresztül",
        description:
          "Visszaállítás stock ROM-ra, downgrade vagy bootloop javítása sikertelen OTA után. Feloldott bootloader és megfelelő RETAIL flash csomag szükséges.",
        steps: [
          "Töltsd le a firmware-t a pontos XT-xxxx modellhez és változathoz (RETAIL/EU/SINGLE_SIM).",
          "Csomagold ki a ZIP-et — boot.img, vbmeta.img, radio.img, super.img vagy sparse image fájlokat találsz.",
          "Indíts újra fastboot módba: adb reboot bootloader",
          "Ellenőrizd az állapotot: fastboot getvar unlocked — yes kell legyen.",
          "Flash boot: fastboot flash boot boot.img",
          "Flash vbmeta (ha a csomagban van): fastboot flash vbmeta vbmeta.img",
          "Flash modem/radio (ha van): fastboot flash modem radio.img",
          "Teljes flashhez használd a flashfile.sh / flashfile.bat fájlt a hivatalos csomagból.",
          "Újraindítás: fastboot reboot — az első boot 10–15 perc.",
        ],
        tips: [
          "Motorola super partition: az újabb modellek fastboot flash super super.img parancsot használnak.",
          "Ha a flash „invalid sparse file” hibát ad, tölts le másik csomagverziót, vagy használd az LMSA-t.",
          "Downgrade-hez a célverziónak régebbinek vagy azonosnak kell lennie — újabb anti-rollback blokkolhatja a flash-t.",
          "A fastboot oem fb_mode_set clear segíthet bootloop esetén sikertelen flash után (modellfüggő).",
        ],
        warning:
          "Más változathoz (pl. EU vs US) tartozó hibás radio/modem.img flashelése tönkreteheti a hálózati sávokat és a GPS-t.",
        links: [
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
            note: "Ellenőrzött RETAIL csomagok XT modell szerint",
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
            note: "Hivatalos rescue eszköz — helyreállítás manuális fastboot nélkül",
          },
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA és Rescue eszközök (hivatalos GUI)",
        description:
          "A Lenovo Moto Smart Assistant és a Motorola RSA grafikus felületen keresztül állítják helyre a stock ROM-ot — akkor hasznos, ha a fastboot parancsok sikertelenek.",
        steps: [
          "Töltsd le és telepítsd a Motorola Rescue and Smart Assistant (RSA) vagy LMSA eszközt.",
          "Kapcsold be az USB hibakeresést a telefonon.",
          "Futtasd az eszközt rendszergazdaként Windows alatt.",
          "Csatlakoztasd a telefont — az eszköz automatikusan felismeri a modellt.",
          "Válaszd a „Rescue” vagy „Repair” opciót, és töltsd le az ajánlott firmware-t.",
          "Hagyd befejezni a folyamatot — a telefon többször is újraindulhat.",
          "Befejezés után húzd ki, és hagyd az eszközt befejezni az első bootot.",
        ],
        tips: [
          "Az RSA stabil internetkapcsolatot igényel a firmware letöltéséhez.",
          "Rescue módban gyakran törlődnek az összes adatok.",
          "Ha az RSA nem ismeri fel az eszközt, próbálj másik USB portot vagy Motorola illesztőprogramot.",
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
        title: "Népszerű modellek és sajátosságok",
        description:
          "Gyors áttekintés a leggyakoribb Motorola sorozatokról és a flashelés sajátosságairól.",
        steps: [
          "Moto G sorozat (g14, g24, g34, g54, g84): fastboot unlock + RETAIL ZIP, gyakran MTK vagy Snapdragon.",
          "Moto Edge (edge 30, 40, 50): super partition, OTA LMSA-n keresztül, fastboot downgrade-hez.",
          "Moto Razr (fold): érzékeny kijelző — flasheléskor ne használj kényszerített újraindítást, csak fastboot reboot-ot.",
          "Moto One / Android One: bootloader feloldás régió szerint, stock image a Google/Motorola oldaláról.",
          "Ellenőrizd az SKU-t fastbootban: fastboot getvar all — keresd a channel-id, version-boot, product értékeket.",
        ],
        tips: [
          "A dual SIM változatok más CSC kóddal rendelkeznek — a firmware-nek egyeznie kell.",
          "Szolgáltatói márkás modellek (Verizon, AT&T) gyakran nem oldhatók fel.",
          "A Moto Actions és gesztusok stock ROM-mal flash után automatikusan visszaállnak.",
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
            label: "XDA Moto G alfórum",
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
      "Hivatalos módszer Samsung Galaxy flashelésére Download módban. Megfelelő firmware (AP, BL, CP, CSC), Samsung USB illesztőprogram és Odin3 szükséges.",
    overview: [
      "A Download mód (Odin mód) a Volume Down + Power (+ Bixby régebbi modelleken) kombinációval aktiválható.",
      "A CSC kód határozza meg a régiót és a nyelvet — a HOME_CSC megőrzi az adatokat, a CSC törli őket.",
      "Az Odin Added!! üzenetet mutat, ha a telefon megfelelően csatlakozik.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Download mód, illesztőprogram és mentés",
        description:
          "Flash előtt mindig készíts biztonsági mentést Smart Switch-csel. Hibás illesztőprogram = a telefon nem jelenik meg az Odinban.",
        steps: [
          "Telepítsd a Samsung USB Driver-t, és indítsd újra a PC-t.",
          "Készíts biztonsági mentést a telefonról Samsung Smart Switch-csel (fotók, névjegyek, alkalmazások).",
          "Kapcsold ki teljesen a telefont.",
          "Tartsd nyomva a Volume Down + Power (+ Bixby, ha van) gombokat kb. 10 másodpercig.",
          "Figyelmeztetés megjelenésekor nyomd meg a Volume Up gombot a Download módba lépéshez.",
          "Csatlakoztasd az USB-kábelt — az Odinban kék COM port doboznak kell megjelennie Added!! felirattal.",
          "Futtasd az Odin3-at rendszergazdaként.",
        ],
        tips: [
          "Ha hiányzik az Added!!, próbálj másik kábelt, portot, vagy telepítsd újra az illesztőprogramot.",
          "Kapcsold ki a Samsung Kies / Smart Switch programot Odin flash közben — ütközhetnek.",
          "A flash előtt az akkumulátornak legalább 50%-os töltöttségűnek kell lennie.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE",
            note: "Hivatalos Samsung illesztőprogram",
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
        title: "Firmware flash Odinban — AP, BL, CP, CSC",
        description:
          "Teljes stock firmware flash. Minden fájlnak saját helye van az Odinban.",
        steps: [
          "Töltsd le a firmware-t a pontos SM-XXXX modellhez és CSC régióhoz.",
          "Csomagold ki a .zip-et — AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5 fájlokat találsz.",
          "Az Odinban kattints a BL-re → válaszd ki a BL fájlt.",
          "Kattints az AP-ra → válaszd ki az AP fájlt (a betöltés hosszabb ideig tarthat).",
          "Kattints a CP-re → válaszd ki a CP fájlt (modem/radio).",
          "Kattints a CSC-re → válaszd a HOME_CSC-t (adatok megőrzése) vagy CSC-t (gyári alaphelyzet).",
          "Pipáld be az Auto Reboot és F. Reset Time opciókat.",
          "Kattints a Start-ra — várj a zöld PASS! üzenetre (piros FAIL = valami hibázott).",
          "A telefon újraindul — nagy frissítéseknél az első boot 5–15 perc.",
        ],
        tips: [
          "Az AP tartalmazza a system, recovery, vbmeta partíciókat — soha ne hagyd ki.",
          "FAIL esetén ellenőrizd, hogy a firmware illik-e a modellhez, és aktív-e a Download mód.",
          "Odin3 3.14.1+ verzió ajánlott újabb Galaxy modellekhez (S21+).",
          "A One UI downgrade anti-rollback miatt blokkolható — csak azonos vagy újabb verziót flashelj.",
        ],
        warning:
          "Más régió firmware-ének flashelése elveszítheti a Samsung Pay-t, a dual SIM funkciókat vagy az LTE sávokat.",
        links: [
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Katalógus SM modell és CSC szerint",
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
        title: "PIT fájl és repartition",
        description:
          "Partícióméret-változtatáskor vagy hard brick utáni helyreállításkor PIT fájl szükséges lehet.",
        steps: [
          "A PIT fájlt a firmware csomagból vagy Odinon keresztül szerezheted be (Repartition — csak haladóknak).",
          "Az Odinban pipáld be a Re-Partition opciót, és töltsd be a .pit fájlt.",
          "Ezután flasheld az AP, BL, CP, CSC fájlokat a szokásos eljárás szerint.",
          "A Re-Partition törli az összes adatot — csak akkor használd, ha a szokásos flash sikertelen.",
        ],
        tips: [
          "Hibás PIT véglegesen károsíthatja a tárhelyet — repartition csak utolsó megoldásként.",
        ],
        warning: "Re-Partition megfelelő PIT nélkül = kritikus hard brick kockázat.",
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
      "MediaTek (MTK) chipsetek flashelése scatter fájl és Download Agent segítségével. Sok budget és középkategóriás eszköznél használatos, beleértve egyes Motorola (MTK) változatokat is.",
    overview: [
      "A scatter.txt definiálja a partíciókat és a flash memória címeket.",
      "A telefont ki kell kapcsolni USB csatlakoztatás előtt (Download mód).",
      "Format All mentés nélkül = szinte biztos hard brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA és VCOM illesztőprogram",
        description:
          "Megfelelő scatter.txt, Download Agent és MediaTek VCOM illesztőprogram nélkül a flash nem indul el.",
        steps: [
          "Töltsd le a firmware-t a pontos modellhez (tartalmaznia kell scatter.txt és images/ mappát).",
          "Telepítsd a MediaTek USB VCOM illesztőprogramot (Windows 10/11 64-bit).",
          "Csomagold ki az SP Flash Tool-t (a chipsethez kompatibilis legújabb verzió).",
          "Futtasd a flash_tool.exe fájlt rendszergazdaként.",
          "Kattints a Choose gombra a Download-Agentnél — válaszd az MTK_AllInOne_DA.bin vagy a firmware DA fájlját.",
          "Kattints a Choose gombra a Scatter-nél — válaszd a scatter.txt fájlt.",
          "A partíciók automatikusan betöltődnek — ne jelölj be felesleges elemeket.",
        ],
        tips: [
          "Helio G99/G100 chipsetekhez újabb SP Flash Tool v5 verzió szükséges lehet.",
          "Ha a scatter hibát jelez, a firmware más memóriaváltozathoz tartozik (4 GB vs 6 GB RAM).",
          "Kapcsold ki a Windows Defendert flash közben — blokkolhatja a flash_tool-t.",
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
          "Három flash mód — válassz a helyzetnek megfelelően. A Format All a legveszélyesebb.",
        steps: [
          "Download Only: kiválasztott partíciók flashelése törlés nélkül — boot/recovery javításhoz.",
          "Firmware Upgrade: összes partíció flash + frissítés — szokásos stock ROM helyreállítás.",
          "Format All + Download: teljes törlés és flash — csak hard brick esetén.",
          "Válaszd ki a módot a legördülő menüben a Download gomb előtt.",
          "Kattints a Download-ra, majd csatlakoztasd a kikapcsolt telefont USB-n.",
          "Az SP Flash Tool felismeri az eszközt, és elindul a folyamatjelző sáv.",
          "Zöld OK után húzd ki a kábelt, és kapcsold be manuálisan a telefont (hosszan tartsd a Power gombot).",
        ],
        tips: [
          "Ha a folyamat 0%-nál megáll, ellenőrizd a VCOM illesztőprogramot, és kapcsold ki a MIUI USB hibakeresést (secure).",
          "Motorola MTK változatokhoz MTK SKU-specifikus firmware-t használj.",
        ],
        warning:
          "Format All ellenőrzött firmware nélkül az adott modellhez = nagy végleges brick kockázat.",
        links: [
          {
            label: "Needrom MTK firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
          },
          {
            label: "Android MTK útmutatók",
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
    title: "Unisoc (Spreadtrum) & UFS memória",
    description:
      "Budget és középkategóriás Unisoc chipsetes eszközök flashelése (Tecno, Infinix, Realme, ZTE). UFS tárhely, helyreállítás hard brickből és FRP megoldás gyári alaphelyzet után.",
    overview: [
      "Az Unisoc (korábban Spreadtrum) SPD / Research Download eszközt használ fastboot helyett.",
      "Az UFS gyorsabb memória, mint az eMMC — flashhez megfelelő PAC csomag és Download Agent verzió kell.",
      "Hardbrick = fekete kijelző, a PC nem ismeri fel a telefont — megoldás test point vagy hivatalos szerviz által.",
      "Az FRP (Factory Reset Protection) aktiválódik reset után az eredeti Google-fiók nélkül.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — Unisoc flash",
        description:
          "Szokásos eljárás PAC firmware-rel rendelkező Unisoc eszközökhöz. A telefonnak Download módban kell lennie (kikapcsolva + USB).",
        steps: [
          "Töltsd le a PAC firmware-t a pontos modellhez (CPU + RAM + UFS/eMMC változat).",
          "Telepítsd a Spreadtrum / Unisoc USB illesztőprogramot (SCI Android USB Driver).",
          "Futtasd a Research Download Tool vagy SPD Upgrade Tool eszközt rendszergazdaként.",
          "Válaszd ki a PAC fájlt — az eszköz kicsomagolja a partíciókat (boot, system, userdata, persist).",
          "Kapcsold ki a telefont, tartsd nyomva a Volume Down gombot, és csatlakoztasd az USB-t (modellfüggő kombinációk).",
          "Kattints a Start Download-ra — a folyamatjelző sávnak BROM hiba nélkül kell futnia.",
          "PASS után húzd ki az USB-t, és kapcsold be a telefont (első boot 5–15 perc).",
        ],
        tips: [
          "Más modell PAC-je = hard brick kockázat — ellenőrizd a chipsetet (pl. T606, T610, T760).",
          "Ha az eszköz „failed to open port” hibát ad, telepítsd újra az illesztőprogramot, és próbálj USB 2.0 portot.",
          "Egyes modellekhez régebbi Research Download 2.9.9004 kell RDA helyett.",
        ],
        warning:
          "Hibás PAC flashelése vagy a folyamat megszakítása véglegesen károsíthatja az eszközt.",
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
        title: "UFS memória — flash sajátosságok",
        description:
          "Az UFS (Universal Flash Storage) gyakori az újabb Unisoc, Qualcomm és Samsung eszközöknél. Pontos firmware és megfelelő Download Agent szükséges.",
        steps: [
          "Ellenőrizd a tárhely típusát: Beállítások → Tárhely vagy a modell specifikációja (UFS 2.1 / 2.2 / 3.x).",
          "Az UFS firmware nem kompatibilis ugyanannak a modellnek az eMMC változatával.",
          "Unisoc esetén flasheld a teljes PAC-et — ne flashelj egyes partíciókat részlegesen tapasztalat nélkül.",
          "Qualcomm UFS esetén: EDL + firehose (QPST/QFIL) rawprogram.xml-lel a firmware csomagból.",
          "UFS eszköz flash után az első boot hosszabb — ne szakítsd meg a tápellátást.",
          "Ha a flash „storage mismatch” hibát ad, tölts le firmware-t a megfelelő kapacitáshoz (64/128/256 GB).",
        ],
        tips: [
          "Az UFS nagyobb kopást szenved el — ismételt Format All növeli a chip meghibásodásának kockázatát.",
          "Készíts mentést a persist és nvram partíciókról kísérleti flash előtt (ha van root/debug hozzáférésed).",
        ],
        warning:
          "Más modellhez tartozó hibás firehose vagy UFS programmer visszafordíthatatlanul károsíthatja a tárhelyet.",
        links: [
          {
            label: "Android MTK — UFS útmutatók",
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
        title: "FRP megkerülése / védelem eltávolítása",
        description:
          "A Factory Reset Protection blokkolja a beállítást reset után az eredeti Google-fiók nélkül. Legális megoldás = a tulajdonos fiókjával való bejelentkezés.",
        steps: [
          "Hivatalosan: jelentkezz be azzal a Google-fiókkal, amely a reset előtt az eszközön volt.",
          "Ha hozzáférsz a menühöz: Beállítások → Fiókok → töröld a régi fiókot gyári alaphelyzet előtt.",
          "Stock PAC flash userdata törlés nélkül esetén az FRP megmaradhat — használj clean flash-t (userdata format).",
          "Download mód + teljes stock PAC flash gyakran együtt nullázza az FRP-t a rendszerrel.",
          "Szolgáltatói modelleknél lépj kapcsolatba a szolgáltatóval tulajdonjog igazolásával.",
          "Szervizes eszközök (hivatalos) legálisan törölhetik az FRP-t javítás során.",
        ],
        tips: [
          "Soha ne vásárolj aktív FRP-vel rendelkező telefont — elveszett vagy lopott lehet.",
          "Sikeres flash után fejezd be a beállítási varázslót saját Google-fiókkal.",
        ],
        warning:
          "Az FRP megkerülése idegen eszközön illegális lehet. Csak saját telefonodon vagy a tulajdonos engedélyével járj el.",
        links: [
          {
            label: "Google FRP help (hivatalos)",
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
        title: "Helyreállítás hard brickből",
        description:
          "Az eszköz nem reagál, fekete kijelző, a PC nem látja az ADB-t és a fastbootot sem. A legkevésbé invazív lépéstől indulj.",
        steps: [
          "Soft brick: próbáld a Download módot (Volume Down + USB) és stock PAC flash-t Research Download-dal.",
          "Ha a PC nem látja az eszközt: telepítsd újra a Spreadtrum illesztőprogramot, cseréld a kábelt és a portot.",
          "Nyomd meg a BROM mód kombinációját (gyakran Volume Up + USB kikapcsolt telefonon).",
          "Test point: rövidítsd a tesztpontokat a PCB-n a modell rajza szerint — Download módba lépéshez.",
          "Ha a flash 0%-nál sikertelen: hibás PAC, sérült UFS chip vagy lemerült akkumulátor.",
          "Szerviz szint: ISP / UFS programmer fizikai memória- vagy PMIC károsodásnál.",
          "Sikeres flash után hagyd az eszközt 20 percig töltőn az első boot előtt.",
        ],
        tips: [
          "Jegyezd fel az utolsó működő PAC-et és verziót kísérlet előtt — megkönnyíti a downgrade-et.",
          "20% alatti akkumulátor gyakran sikertelen flash-t okoz UFS eszközökön.",
          "Ha a telefon rezeg, de nincs kép, a probléma lehet a kijelző — nem brick.",
        ],
        warning:
          "A test point és ISP beavatkozás tapasztalatot igényel — hibás eljárás károsíthatja az alaplapot.",
        links: [
          {
            label: "GSMHosting Unisoc firmware",
            url: "https://www.gsmhosting.com/unisoc-firmware/",
            fileType: "PAC",
          },
          {
            label: "XDA Hard Brick tanácsadó",
            url: "https://forum.xda-developers.com/t/guide-soft-brick-hard-brick.2092846/",
            fileType: "Guide",
          },
        ],
      },
    ],
  },
];