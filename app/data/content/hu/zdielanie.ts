import type { Subsection } from "../types";

export const zdielanieSubsections: Subsection[] = [
  {
    id: "zip-7zip",
    title: "Jelszóval védett ZIP (AES-256)",
    description:
      "Szabványos módszer a firmware, scatter fájlok, DA loaderok és érzékeny útmutatók védelmére átvitel közben.",
    steps: [
      "Válaszd ki a megosztandó mappát vagy fájlokat (firmware, eszközök, dokumentáció).",
      "Jobb klikk → 7-Zip → Add to archive.",
      "Archive format: zip (nem 7z, ha maximális kompatibilitást szeretnél).",
      "Encryption method: AES-256 (nem ZipCrypto — gyenge).",
      "Adj meg erős jelszót (min. 16 karakter, kis- és nagybetűk, számok, szimbólumok).",
      "Jelöld be az Encrypt file names opciót, ha elérhető.",
      "A jelszót küldd más csatornán — Signal, Threema, SMS, személyesen.",
    ],
    tips: [
      "A 7z formátum jobb tömörítést ad, de a ZIP AES-256-tal univerzálisabb.",
      "Nagy firmware csomagoknál (2+ GB) fontold meg a fájlok több részre bontását.",
    ],
    links: [
      { label: "7-Zip (Windows)", url: "https://www.7-zip.org/download.html", fileType: "EXE" },
      { label: "7-Zip (Linux/macOS)", url: "https://www.7-zip.org/download.html", fileType: "TAR / PKG" },
      { label: "PeaZip (alternatíva)", url: "https://peazip.github.io/", fileType: "EXE" },
    ],
  },
  {
    id: "zdielanie-platformy",
    title: "Ajánlott megosztási platformok",
    description:
      "Nagy fájlok (firmware, eszközcsomagok) biztonságos küldése, a jelszót külön üzenetben.",
    steps: [
      "Töltsd fel a titkosított ZIP-et egy lejárati idővel rendelkező platformra (7–30 nap).",
      "Másold ki a linket, és küldd el a címzettnek.",
      "A jelszót más csatornán küldd (ne ugyanabban az e-mailben/chaton, mint a linket).",
      "A címzett letölti, 7-Zippel kicsomagolja, és ellenőrzi a fájl hash értékét, ha rendelkezésre áll.",
      "Sikeres letöltés után töröld a fájlt a szerverről.",
    ],
    tips: [
      "SwissTransfer: akár 50 GB ingyen, regisztráció nélkül, svájci szerverek.",
      "Proton Drive: végponttól végpontig titkosítás, érzékeny adatokhoz alkalmas.",
      "GitHub Releases: nyilvános open-source eszközökhöz alkalmas (fizetős firmware-hez nem).",
    ],
    links: [
      { label: "SwissTransfer", url: "https://www.swisstransfer.com/", fileType: "Web", note: "Akár 50 GB, lejárat" },
      { label: "WeTransfer", url: "https://wetransfer.com/", fileType: "Web" },
      { label: "Proton Drive", url: "https://proton.me/drive", fileType: "Web" },
      { label: "MEGA", url: "https://mega.io/", fileType: "Web", note: "E2E titkosítás" },
      { label: "GitHub Releases", url: "https://github.com/JVVMEDIA/flash-diagnostics-hub/releases", fileType: "Web" },
    ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Biztonsági szabályok megosztáskor",
    description: "Hogyan ossz meg firmware-t és eszközöket legálisan és biztonságosan.",
    steps: [
      "Csak olyan firmware-t és eszközöket ossz meg, amelyekhez jogod van (hivatalos, open-source, saját).",
      "Soha ne küldd a jelszót ugyanabban az e-mailben, mint a fájl linkjét.",
      "Flash előtt ellenőrizd a letöltött fájl SHA256 hash értékét.",
      "Ne használj nyilvános USB-meghajtókat érzékeny adatokhoz.",
      "Naplózd, kinek és mikor küldted el a fájlt (szervizcélokra).",
    ],
    tips: [
      "Hash ellenőrzés: certutil -hashfile firmware.zip SHA256 (Windows).",
      "Motorola firmware esetén ellenőrizd a RETAIL csatornát a fájlnévben.",
    ],
    warning: "A védett firmware engedély nélküli megosztása megsértheti a gyártó licencfeltételeit.",
    links: [
      {
        label: "VirusTotal (fájl ellenőrzés)",
        url: "https://www.virustotal.com/",
        fileType: "Web",
      },
    ],
  },
];