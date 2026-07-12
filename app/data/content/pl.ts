import type { Category, HubContent, Subsection } from "./types";

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Uniwersalna metoda dla Google Pixel, Xiaomi, OnePlus, Motorola i innych urządzeń z odblokowanym bootloaderem. Wymaga debugowania USB, prawidłowych sterowników i zweryfikowanego firmware.",
    overview: [
      "Fastboot to tryb niskiego poziomu do flashowania poszczególnych partycji (boot, recovery, system, vendor).",
      "ADB (Android Debug Bridge) służy do komunikacji z włączonym systemem — kopie zapasowe, przenoszenie plików, restart do fastboot.",
      "Zawsze sprawdź oznaczenie modelu (np. XT2343-2) przed pobraniem firmware.",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "Przygotowanie PC i środowiska",
        description:
          "Prawidłowo skonfigurowane środowisko to podstawa. Błędna ścieżka do platform-tools lub stary sterownik to najczęstsze przyczyny niepowodzenia.",
        steps: [
          "Pobierz Android Platform Tools i rozpakuj do folderu bez spacji (np. C:\\platform-tools).",
          "Otwórz terminal w tym folderze lub dodaj ścieżkę do systemowej PATH.",
          "Na telefonie: Ustawienia → Informacje o telefonie → 7× stuknij w Numer kompilacji → Opcje programistyczne.",
          "Włącz debugowanie USB i (jeśli istnieje) odblokowanie OEM bootloadera.",
          "Podłącz kabel USB, potwierdź dialog „Zezwól na debugowanie USB” na telefonie.",
          "Sprawdź połączenie: adb devices — musi pojawić się numer seryjny ze statusem „device”.",
          "Aby wejść w tryb flash: adb reboot bootloader lub fizyczna kombinacja przycisków według producenta.",
          "W fastboot sprawdź: fastboot devices",
        ],
        tips: [
          "Jeśli adb devices pokazuje „unauthorized”, odłącz kabel, anuluj autoryzacje debugowania na telefonie i podłącz ponownie.",
          "Na Windows preferuj port USB 2.0 przy problemach z rozpoznaniem urządzenia.",
          "Wyłącz optymalizację MIUI (Xiaomi), jeśli adb losowo się zawiesza.",
        ],
        links: [
          {
            label: "Platform Tools",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP"
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "ZIP"
          },
          {
            label: "Minimal ADB & Fastboot (alternatíva)",
            url: "https://forum.xda-developers.com/t/tool-minimal-adb-and-fastboot-2-9-18.2317790/",
            fileType: "EXE"
          }
        ],
      },
      {
        id: "fastboot-flash",
        title: "Flash przez Fastboot — ogólna procedura",
        description:
          "Ręczne lub skryptowe flashowanie oficjalnych obrazów. Kolejność poleceń i nazwy partycji różnią się w zależności od producenta.",
        steps: [
          "Wykonaj kopię zapasową zdjęć, kontaktów i ważnych danych — flash zwykle usuwa userdata.",
          "Sprawdź odblokowany bootloader: fastboot oem device-info (Motorola) lub fastboot getvar unlocked.",
          "Rozpakuj pobrany firmware do jednego folderu.",
          "Jeśli pakiet zawiera flash-all.bat / flash-all.sh, preferuj ten skrypt przed ręcznym flashowaniem.",
          "Ręcznie: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "Dla slotów A/B: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "Po udanym flashu: fastboot reboot lub fastboot reboot recovery.",
          "Pierwsze uruchomienie po flashu trwa 5–20 minut — nie dotykaj urządzenia.",
        ],
        tips: [
          "Polecenie fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img niektóre ROM wymagają do roota/custom kernel.",
          "Jeśli fastboot zgłasza „waiting for device”, sprawdź sterownik i kabel.",
          "Nigdy nie flashuj boot.img z innego modelu — ryzyko hard bricku.",
        ],
        warning:
          "Flash nieprawidłowego firmware lub przerwanie procesu może trwale uszkodzić urządzenie. Zawsze sprawdź dokładny model i wariant (Global/EU/India).",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG"
          },
          {
            label: "Katalog ROM Xiaomi (HyperOS / MIUI)",
            url: "https://xmfirmwareupdater.com/hyperos/",
            fileType: "Katalóg"
          },
          {
            label: "OnePlus software upgrade",
            url: "https://www.oneplus.com/support/softwareupgrade",
            fileType: "Web"
          }
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — factory image",
        description: "Oficjalny sposób przywrócenia Pixela do czystego stanu bezpośrednio od Google.",
        steps: [
          "Znajdź kod urządzenia (np. felix, cheetah) na stronie factory images.",
          "Pobierz ZIP dla dokładnej wersji Androida.",
          "Rozpakuj archiwum, uruchom flash-all.bat (Windows) lub ./flash-all.sh (Linux/macOS).",
          "Skrypt automatycznie restartuje do bootloadera i flashuje wszystkie partycje.",
          "Jeśli flash-all się nie powiedzie, uruchom poszczególne polecenia z flash-all.sh ręcznie.",
        ],
        tips: [
          "Pixel 6+ używa Android Verified Boot — custom ROM wymaga również prawidłowego vbmeta.",
          "Jeśli bootloader jest zablokowany, flash factory image nie zadziała bez odblokowania.",
        ],
        links: [
          {
            label: "Pixel Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP"
          },
          {
            label: "Pixel OTA balíky",
            url: "https://developers.google.com/android/ota",
            fileType: "ZIP"
          }
        ],
      },
    ],
  },
  {
    id: "motorola",
    brandId: "motorola",
    title: "Motorola (Moto)",
    description:
      "Kompletny przewodnik dla Moto G, Moto Edge, Moto Razr i innych modeli (XT-xxxx). Motorola używa fastboot, własnego procesu odblokowania i oficjalnych narzędzi RSA/LMSA.",
    overview: [
      "Numer modelu znajdziesz w Ustawienia → Informacje o telefonie → Model (np. moto g84 5G, XT2347-2).",
      "Bootloader odblokowuje się przez oficjalną stronę Motorola — proces jest bezpłatny, ale może unieważnić gwarancję.",
      "Po odblokowaniu przy starcie pojawia się komunikat ostrzegawczy — to normalne.",
      "Motorola często dystrybuuje pakiety OTA; do downgrade potrzebujesz starszego pliku flash RETAIL.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Odblokowanie bootloadera (oficjalne)",
        description:
          "Bez odblokowanego bootloadera niemożliwy jest custom ROM ani ręczne flashowanie fastboot większości partycji.",
        steps: [
          "Włącz Opcje programistyczne i debugowanie USB na telefonie.",
          "Włącz również „Odblokowanie OEM” (jeśli jest dostępne w menu programisty).",
          "Podłącz telefon do PC i uruchom: adb reboot bootloader",
          "W fastboot uzyskaj dane unlock: fastboot oem get_unlock_data",
          "Skopiuj cały wynik (wiele linii zaczynających się od BOOTLOADER...).",
          "Odwiedź stronę odblokowania bootloadera Motorola, zaloguj się kontem Moto / Lenovo.",
          "Wklej dane unlock do formularza i wyślij wniosek.",
          "Po zatwierdzeniu e-mailem uruchom: fastboot oem unlock UNIQUE_KEY (klucz z e-maila).",
          "Potwierdź na telefonie Volume Up — urządzenie zostanie wyczyszczone (factory reset).",
        ],
        tips: [
          "Wniosek może zostać odrzucony u urządzeń od operatora (carrier-locked).",
          "Zapisz UNIQUE_KEY z e-maila — przy ponownym zablokowaniu może być potrzebny.",
          "fastboot oem get_unlock_data działa tylko w trybie bootloader.",
          "Niektóre nowsze modele Moto wymagają połączenia Wi-Fi przy wniosku o unlock.",
        ],
        warning:
          "Odblokowanie bootloadera usuwa wszystkie dane i może trwale zablokować niektóre aplikacje bankowe/płatnicze (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web"
          },
          {
            label: "Sterowniki USB Motorola",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE / ZIP"
          },
          {
            label: "XDA Motorola fórum",
            url: "https://forum.xda-developers.com/c/motorola.11969/",
            fileType: "Guide"
          }
        ],
      },
      {
        id: "moto-fastboot-flash",
        title: "Flash firmware przez Fastboot",
        description:
          "Przywrócenie stock ROM, downgrade lub naprawa bootloopu po nieudanym OTA. Wymaga odblokowanego bootloadera i prawidłowego pakietu flash RETAIL.",
        steps: [
          "Pobierz firmware dla dokładnego modelu XT-xxxx i wariantu (RETAIL/EU/SINGLE_SIM).",
          "Rozpakuj ZIP — znajdziesz pliki boot.img, vbmeta.img, radio.img, super.img lub sparse images.",
          "Uruchom ponownie do fastboot: adb reboot bootloader",
          "Sprawdź status: fastboot getvar unlocked — musi być yes.",
          "Flashuj boot: fastboot flash boot boot.img",
          "Flashuj vbmeta (jeśli jest w pakiecie): fastboot flash vbmeta vbmeta.img",
          "Flashuj modem/radio (jeśli jest): fastboot flash modem radio.img",
          "Do pełnego flashu użyj flashfile.sh / flashfile.bat z oficjalnego pakietu.",
          "Restart: fastboot reboot — pierwsze uruchomienie 10–15 minut.",
        ],
        tips: [
          "Motorola super partition: nowsze modele używają fastboot flash super super.img.",
          "Jeśli flash kończy się błędem „invalid sparse file”, pobierz inną wersję pakietu lub użyj LMSA.",
          "Do downgrade docelowa wersja musi być starsza lub taka sama — nowszy anti-rollback może zablokować flash.",
          "fastboot oem fb_mode_set clear może pomóc przy bootloop po nieudanym flashu (specyficzne dla modelu).",
        ],
        warning:
          "Flash nieprawidłowego radio/modem.img dla innego wariantu (np. EU vs US) może zniszczyć pasma sieciowe i GPS.",
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Android File Host (Motorola)",
            url: "https://androidfilehost.com/?w=files&flist=1&s=Motorola",
            fileType: "ZIP"
          },
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP / XML",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA i narzędzia Rescue (oficjalne GUI)",
        description:
          "Lenovo Moto Smart Assistant i Motorola RSA umożliwiają przywrócenie stock ROM przez interfejs graficzny — odpowiednie, gdy polecenia fastboot zawodzą.",
        steps: [
          "Pobierz i zainstaluj Motorola Rescue and Smart Assistant (RSA) lub LMSA.",
          "Włącz debugowanie USB na telefonie.",
          "Uruchom narzędzie jako administrator na Windows.",
          "Podłącz telefon — narzędzie automatycznie wykrywa model.",
          "Wybierz „Rescue” lub „Repair” i pobierz zalecany firmware.",
          "Pozwól procesowi się zakończyć — telefon może kilkakrotnie się restartować.",
          "Po zakończeniu odłącz i pozwól urządzeniu dokończyć first boot.",
        ],
        tips: [
          "RSA wymaga stabilnego połączenia internetowego do pobrania firmware.",
          "W trybie rescue często usuwane są wszystkie dane.",
          "Jeśli RSA nie rozpoznaje urządzenia, spróbuj innego portu USB lub sterownika Motorola.",
        ],
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Lenovo Moto Smart Assistant (LMSA)",
            url: "https://support.lenovo.com/us/en/downloads/ds101291",
            fileType: "EXE"
          },
          {
            label: "Sterowniki USB Motorola",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE / ZIP"
          }
        ],
      },
      {
        id: "moto-modely",
        title: "Popularne modele i specyfikacje",
        description:
          "Szybki przegląd najczęstszych serii Motorola i specyfiki flashowania.",
        steps: [
          "Seria Moto G (g14, g24, g34, g54, g84): fastboot unlock + RETAIL ZIP, często MTK lub Snapdragon.",
          "Moto Edge (edge 30, 40, 50): super partition, OTA przez LMSA, fastboot do downgrade.",
          "Moto Razr (fold): wrażliwy wyświetlacz — przy flashu nie używaj force reboot, tylko fastboot reboot.",
          "Moto One / Android One: odblokowanie bootloadera według regionu, stock image od Google/Motorola.",
          "Sprawdź SKU w fastboot: fastboot getvar all — szukaj channel-id, version-boot, product.",
        ],
        tips: [
          "Warianty Dual SIM mają inny kod CSC — firmware musi pasować.",
          "Modele carrier-branded (Verizon, AT&T) często nie mają opcji unlock.",
          "Moto Actions i gesty przywracają się automatycznie po flashu stock ROM.",
        ],
        links: [
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "Katalóg",
            note: "Nieoficjalne mirror"
          },
          {
            label: "Moto G XDA forum",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide"
          }
        ],
      },
    ],
  },
  {
    id: "odin-samsung",
    brandId: "samsung",
    title: "Odin (Samsung)",
    description:
      "Oficjalny sposób flashowania Samsung Galaxy w trybie Download. Wymaga prawidłowego firmware (AP, BL, CP, CSC), sterownika Samsung USB i Odin3.",
    overview: [
      "Tryb Download (tryb Odin) aktywuje się kombinacją Volume Down + Power (+ Bixby na starszych modelach).",
      "Kod CSC określa region i język — HOME_CSC zachowuje dane, CSC je usuwa.",
      "Odin wyświetla Added!! gdy telefon jest prawidłowo podłączony.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Tryb Download, sterownik i kopia zapasowa",
        description:
          "Przed flashowaniem zawsze wykonaj kopię zapasową danych przez Smart Switch. Nieprawidłowy sterownik = telefon nie pojawi się w Odin.",
        steps: [
          "Zainstaluj Samsung USB Driver i uruchom ponownie PC.",
          "Wykonaj kopię zapasową telefonu przez Samsung Smart Switch (zdjęcia, kontakty, aplikacje).",
          "Wyłącz telefon całkowicie.",
          "Przytrzymaj Volume Down + Power (+ Bixby jeśli istnieje) ok. 10 sekund.",
          "Gdy pojawi się ostrzeżenie, naciśnij Volume Up, aby wejść w tryb Download.",
          "Podłącz kabel USB — Odin powinien pokazać niebieskie pole portu COM z Added!!",
          "Uruchom Odin3 jako administrator.",
        ],
        tips: [
          "Jeśli brakuje Added!!, spróbuj innego kabla, portu lub przeinstaluj sterownik.",
          "Wyłącz Samsung Kies / Smart Switch podczas flashu Odin — mogą kolidować.",
          "Bateria powinna mieć min. 50% przed flashowaniem.",
        ],
        links: [
          {
            label: "Sterownik USB Samsung",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE"
          },
          {
            label: "Samsung Smart Switch",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG"
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "odin-flash",
        title: "Flash firmware w Odin — AP, BL, CP, CSC",
        description:
          "Kompletny flash stock firmware. Każdy plik ma swój slot w Odin.",
        steps: [
          "Pobierz firmware dla dokładnego modelu SM-XXXX i regionu CSC.",
          "Rozpakuj .zip — znajdziesz AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5.",
          "W Odin kliknij BL → wybierz plik BL.",
          "Kliknij AP → wybierz plik AP (wczytywanie może trwać dłużej).",
          "Kliknij CP → wybierz plik CP (modem/radio).",
          "Kliknij CSC → wybierz HOME_CSC (zachowuje dane) lub CSC (factory reset).",
          "Zaznacz Auto Reboot i F. Reset Time.",
          "Kliknij Start — czekaj na zielone PASS! (czerwone FAIL = coś się nie powiodło).",
          "Telefon się restartuje — pierwsze uruchomienie 5–15 minut przy dużych aktualizacjach.",
        ],
        tips: [
          "AP zawiera system, recovery, vbmeta — nigdy go nie pomijaj.",
          "Przy FAIL sprawdź, czy firmware pasuje do modelu i czy tryb Download jest aktywny.",
          "Odin3 wersja 3.14.1+ zalecana dla nowszych Galaxy (S21+).",
          "Downgrade One UI może być zablokowany przez anti-rollback — flashuj tylko tę samą lub nowszą wersję.",
        ],
        warning:
          "Flash firmware z innego regionu może spowodować utratę Samsung Pay, funkcji dual SIM lub pasm LTE.",
        links: [
          {
            label: "Sterownik USB Samsung",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE"
          },
          {
            label: "Samsung Smart Switch",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG"
          },
          {
            label: "Frija — Samsung firmware downloader",
            url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/",
            fileType: "EXE"
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP"
          },
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/firmwares/",
            fileType: "Katalóg",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "odin-pit",
        title: "Plik PIT i repartition",
        description:
          "Przy zmianie rozmiaru partycji lub przywracaniu po hard bricku może być potrzebny plik PIT.",
        steps: [
          "Plik PIT uzyskaj z pakietu firmware lub przez Odin (Repartition — tylko dla zaawansowanych).",
          "W Odin zaznacz Re-Partition i wczytaj plik .pit.",
          "Następnie flashuj AP, BL, CP, CSC jak przy standardowej procedurze.",
          "Re-Partition usuwa wszystkie dane — używaj tylko gdy standardowy flash zawodzi.",
        ],
        tips: [
          "Nieprawidłowy PIT może trwale uszkodzić pamięć — repartition tylko jako ostateczność.",
        ],
        warning: "Re-Partition bez prawidłowego PIT = krytyczne ryzyko hard bricku.",
        links: [
          {
            label: "Sterownik USB Samsung",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE"
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP"
          },
          {
            label: "Samsung Odin PIT poradnik (XDA)",
            url: "https://forum.xda-developers.com/t/guide-odin-pit-file.2191465/",
            fileType: "Guide"
          }
        ],
      },
    ],
  },
  {
    id: "sp-flash",
    brandId: "mediatek",
    title: "SP Flash Tool (MediaTek)",
    description:
      "Flash chipsetów MediaTek (MTK) przez plik scatter i Download Agent. Używany w wielu urządzeniach budget i mid-range, w tym niektórych Motorola (warianty MTK).",
    overview: [
      "Scatter.txt definiuje partycje i adresy pamięci flash.",
      "Telefon musi być wyłączony przed podłączeniem USB (tryb Download).",
      "Format All bez kopii zapasowej = prawie pewny hard brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA i sterownik VCOM",
        description:
          "Bez prawidłowego scatter.txt, Download Agent i sterownika MediaTek VCOM flash się nie rozpocznie.",
        steps: [
          "Pobierz firmware dla dokładnego modelu (musi zawierać scatter.txt i images/).",
          "Zainstaluj sterownik MediaTek USB VCOM (dla Windows 10/11 64-bit).",
          "Rozpakuj SP Flash Tool (najnowsza kompatybilna wersja dla twojego chipsetu).",
          "Uruchom flash_tool.exe jako administrator.",
          "Kliknij Choose przy Download-Agent — wybierz MTK_AllInOne_DA.bin lub DA z firmware.",
          "Kliknij Choose przy Scatter — wybierz scatter.txt.",
          "Partycje wczytają się automatycznie — nie zaznaczaj zbędnych pozycji.",
        ],
        tips: [
          "Dla chipsetów Helio G99/G100 może być potrzebna nowsza wersja SP Flash Tool v5.",
          "Jeśli scatter zgłasza błąd, firmware jest dla innego wariantu pamięci (4GB vs 6GB RAM).",
          "Wyłącz Windows Defender podczas flashu — może blokować flash_tool.",
        ],
        links: [
          {
            label: "MediaTek (oficjalnie)",
            url: "https://www.mediatek.com/",
            fileType: "Web"
          },
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP"
          },
          {
            label: "MediaTek USB VCOM Driver",
            url: "https://androidmtk.com/download-mtk-usb-vcom-drivers",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "sp-flash-postup",
        title: "Download Only vs Firmware Upgrade vs Format",
        description:
          "Trzy tryby flashu — wybierz według sytuacji. Format All jest najbardziej niebezpieczny.",
        steps: [
          "Download Only: flash wybranych partycji bez kasowania — do naprawy boot/recovery.",
          "Firmware Upgrade: flash wszystkich partycji + update — standardowe przywrócenie stock ROM.",
          "Format All + Download: kompletne wymazanie i flash — tylko przy hard bricku.",
          "Wybierz tryb z menu rozwijanego przed kliknięciem Download.",
          "Kliknij Download, następnie podłącz wyłączony telefon przez USB.",
          "SP Flash Tool wykrywa urządzenie i uruchamia pasek postępu.",
          "Po zielonym OK odłącz kabel i włącz telefon ręcznie (długie naciśnięcie Power).",
        ],
        tips: [
          "Jeśli postęp stoi na 0%, sprawdź sterownik VCOM i wyłącz MIUI USB debugging (secure).",
          "Dla wariantów Motorola MTK używaj firmware specyficznie dla SKU MTK.",
        ],
        warning:
          "Format All bez zweryfikowanego firmware dla danego modelu = duże ryzyko trwałego bricku.",
        links: [
          {
            label: "MediaTek (oficjalnie)",
            url: "https://www.mediatek.com/",
            fileType: "Web"
          },
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP"
          },
          {
            label: "Android MTK poradniki",
            url: "https://androidmtk.com/",
            fileType: "Guide"
          },
          {
            label: "Needrom MTK firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
            note: "Nieoficjalne mirror"
          }
        ],
      },
    ],
  },
  {
    id: "unisoc-ufs",
    brandIds: ["unisoc"],
    title: "Unisoc (Spreadtrum) & pamięć UFS",
    description:
      "Flash urządzeń budget i mid-range z chipsetem Unisoc (Tecno, Infinix, Realme, ZTE). Pamięć UFS, przywracanie z hardbricku i rozwiązanie FRP po factory reset.",
    overview: [
      "Unisoc (dawniej Spreadtrum) używa SPD / Research Download zamiast fastboot.",
      "UFS to szybsza pamięć niż eMMC — flash wymaga prawidłowego pakietu PAC i wersji Download Agent.",
      "Hardbrick = czarny ekran, PC nie rozpoznaje telefonu — rozwiązanie przez test point lub autoryzowany serwis.",
      "FRP (Factory Reset Protection) aktywuje się po resecie bez oryginalnego konta Google.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — flash Unisoc",
        description:
          "Standardowa procedura dla urządzeń Unisoc z firmware PAC. Telefon musi być w trybie Download (wyłączony + USB).",
        steps: [
          "Pobierz firmware PAC dla dokładnego modelu (CPU + RAM + wariant UFS/eMMC).",
          "Zainstaluj sterownik Spreadtrum / Unisoc USB (SCI Android USB Driver).",
          "Uruchom Research Download Tool lub SPD Upgrade Tool jako administrator.",
          "Wybierz plik PAC — narzędzie rozpakuje partycje (boot, system, userdata, persist).",
          "Wyłącz telefon, przytrzymaj Volume Down + podłącz USB (kombinacje specyficzne dla modelu).",
          "Kliknij Start Download — pasek postępu musi działać bez błędu BROM.",
          "Po PASS odłącz USB i włącz telefon (pierwsze uruchomienie 5–15 minut).",
        ],
        tips: [
          "PAC z innego modelu = ryzyko hard bricku — sprawdź chipset (np. T606, T610, T760).",
          "Jeśli narzędzie zgłasza „failed to open port”, przeinstaluj sterownik i spróbuj portu USB 2.0.",
          "Niektóre modele wymagają starszego Research Download 2.9.9004 zamiast RDA.",
        ],
        warning:
          "Flash nieprawidłowego PAC lub przerwanie procesu może trwale uszkodzić urządzenie.",
        links: [
          {
            label: "Unisoc / Spreadtrum USB Driver",
            url: "https://androidmtk.com/download-spreadtrum-drivers",
            fileType: "ZIP"
          },
          {
            label: "Research Download Tool",
            url: "https://androidmtk.com/download-research-download-tool",
            fileType: "ZIP"
          },
          {
            label: "SPD Upgrade Tool",
            url: "https://spdflashtool.com/",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "ufs-pamat-flash",
        title: "Pamięć UFS — specyfika flashowania",
        description:
          "UFS (Universal Flash Storage) jest powszechna w nowszych urządzeniach Unisoc, Qualcomm i Samsung. Wymaga precyzyjnego firmware i prawidłowego Download Agent.",
        steps: [
          "Sprawdź typ pamięci: Ustawienia → Pamięć lub specyfikacja modelu (UFS 2.1 / 2.2 / 3.x).",
          "Firmware UFS nie jest kompatybilny z wariantem eMMC tego samego modelu.",
          "Dla Unisoc: flashuj cały PAC — nie używaj częściowego flashu poszczególnych partycji bez doświadczenia.",
          "Dla Qualcomm UFS: EDL + firehose (QPST/QFIL) z rawprogram.xml z pakietu firmware.",
          "Po flashu urządzenia UFS pierwsze uruchomienie trwa dłużej — nie przerywaj zasilania.",
          "Jeśli flash kończy się błędem „storage mismatch”, pobierz firmware dla właściwej pojemności (64/128/256 GB).",
        ],
        tips: [
          "UFS ma wyższy wear — powtarzany Format All zwiększa ryzyko awarii chipu.",
          "Wykonaj kopię zapasową partycji persist i nvram przed eksperymentalnym flashowaniem (jeśli masz root/dostęp debug).",
        ],
        warning:
          "Nieprawidłowy firehose lub UFS programmer dla innego modelu może nieodwracalnie uszkodzić pamięć.",
        links: [
          {
            label: "Unisoc (oficjalnie)",
            url: "https://www.unisoc.com/",
            fileType: "Web"
          },
          {
            label: "Android MTK poradniki",
            url: "https://androidmtk.com/",
            fileType: "Guide"
          },
          {
            label: "Needrom Unisoc firmware",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC / ZIP",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "unisoc-frp",
        title: "FRP bypass / usunięcie ochrony",
        description:
          "Factory Reset Protection blokuje konfigurację po resecie bez oryginalnego konta Google. Legalne rozwiązanie = zalogowanie konta właściciela.",
        steps: [
          "Oficjalnie: zaloguj konto Google, które było na urządzeniu przed resetem.",
          "Jeśli masz dostęp do menu: Ustawienia → Konta → usuń stare konto przed factory reset.",
          "Po flashu stock PAC bez wipe userdata FRP może pozostać — użyj clean flash (userdata format).",
          "Tryb Download + flash pełnego stock PAC często resetuje FRP wraz z systemem.",
          "U modeli operatorskich skontaktuj się z operatorem z dowodem własności.",
          "Narzędzia serwisowe (autoryzowane) mogą legalnie usunąć FRP przy naprawie.",
        ],
        tips: [
          "Nigdy nie kupuj telefonu z aktywnym FRP — może być zgubiony lub skradziony.",
          "Po udanym flashu dokończ kreatora konfiguracji z własnym kontem Google.",
        ],
        warning:
          "Omijanie FRP na cudzym urządzeniu może być nielegalne. Postępuj tylko na własnym telefonie lub za zgodą właściciela.",
        links: [
          {
            label: "Google FRP pomoc (oficjalnie)",
            url: "https://support.google.com/android/answer/2812853?hl=sk",
            fileType: "Guide"
          },
          {
            label: "XDA Unisoc fórum",
            url: "https://forum.xda-developers.com/c/unisoc.12597/",
            fileType: "Guide"
          }
        ],
      },
      {
        id: "unisoc-hardbrick",
        title: "Ożywienie z hardbricku",
        description:
          "Urządzenie nie reaguje, czarny ekran, PC nie widzi ADB ani fastboot. Procedura od najmniej inwazyjnego kroku.",
        steps: [
          "Soft brick: spróbuj trybu Download (Volume Down + USB) i flash stock PAC przez Research Download.",
          "Jeśli PC nie widzi urządzenia: przeinstaluj sterownik Spreadtrum, wymień kabel i port.",
          "Naciśnij kombinację dla trybu BROM (często Volume Up + USB przy wyłączonym telefonie).",
          "Test point: zmostkuj punkty testowe na PCB według schematu modelu — wejście w tryb Download.",
          "Jeśli flash kończy się na 0%: nieprawidłowy PAC, uszkodzony chip UFS lub rozładowana bateria.",
          "Poziom serwisowy: ISP / UFS programmer przy fizycznym uszkodzeniu pamięci lub PMIC.",
          "Po udanym flashu zostaw urządzenie na 20 minut na ładowarce przed pierwszym uruchomieniem.",
        ],
        tips: [
          "Zapisz ostatni działający PAC i wersję przed eksperymentem — ułatwi downgrade.",
          "Bateria poniżej 20% często powoduje failed flash na urządzeniach UFS.",
          "Jeśli telefon wibruje, ale nie ma obrazu, problem może być w wyświetlaczu — nie brick.",
        ],
        warning:
          "Test point i zabieg ISP wymagają doświadczenia — nieprawidłowa procedura może uszkodzić płytę główną.",
        links: [
          {
            label: "GSMHosting Unisoc firmware",
            url: "https://www.gsmhosting.com/unisoc-firmware/",
            fileType: "PAC"
          },
          {
            label: "XDA Hard Brick poradňa",
            url: "https://forum.xda-developers.com/t/guide-soft-brick-hard-brick.2092846/",
            fileType: "Guide"
          }
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
      "Urządzenie ciągle się restartuje, zatrzymuje na logo lub w ogóle nie reaguje. Diagnostyka zaczyna się od identyfikacji dostępnego trybu.",
    overview: [
      "Soft brick: urządzenie można wprowadzić w fastboot/download/EDL — możliwe do naprawy przez flash.",
      "Hard brick: brak reakcji, czarny ekran, PC nie rozpoznaje urządzenia — wymaga test point lub serwisu.",
      "Bootloop po OTA: często pomaga wipe cache lub ponowny flash ostatniego działającego ROM.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Identyfikacja trybu i objawów",
        description:
          "Prawidłowa diagnoza trybu określa, którego narzędzia użyć — Odin, fastboot, SP Flash lub QPST.",
        steps: [
          "Fastboot: czarny ekran + tekst „FASTBOOT MODE” — rozwiązanie przez fastboot flash lub RSA (Motorola).",
          "Download/Odin: logo Samsung + tekst „Downloading...” — rozwiązanie przez Odin3.",
          "EDL (Qualcomm 9008): czarny ekran, w Menedżerze urządzeń Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola rescue.",
          "MTK Download: wyłączony telefon, SP Flash Tool wykrywa po USB — scatter flash.",
          "Unisoc Download: wyłączony telefon, Research Download wykrywa port Spreadtrum — PAC flash.",
          "Bootloop na logo: powtarzający się restart przy animacji — wipe cache, ponowny flash boot/system.",
          "Hard brick: brak LED, brak wibracji — test point, wymuszenie EDL/SPD lub serwis.",
        ],
        tips: [
          "Motorola: bootloop po złym OTA często rozwiązuje LMSA Rescue bez ręcznego fastboot.",
          "Samsung: bootloop po root — flash HOME_CSC + AP przez Odin.",
          "Zapisz ostatnią znaną wersję ROM przed flashowaniem — pomoże przy downgrade.",
        ],
        links: [
          {
            label: "Android Recovery (oficjalnie)",
            url: "https://developer.android.com/studio/run/emulator#recovery",
            fileType: "Guide"
          },
          {
            label: "ADB sideload (oficjalnie)",
            url: "https://developer.android.com/studio/command-line/adb#copyfiles",
            fileType: "Guide"
          },
          {
            label: "XDA Bootloop forum",
            url: "https://forum.xda-developers.com/",
            fileType: "Guide"
          }
        ],
      },
      {
        id: "diag-obnova",
        title: "Procedura przywracania według stopnia powagi",
        description: "Od najmniej inwazyjnego kroku do pełnego ponownego flashu.",
        steps: [
          "Poziom 1: Wymuszony restart (Power 15–30 s) lub recovery wipe cache partition.",
          "Poziom 2: Recovery factory reset (usuwa dane, zachowuje firmware).",
          "Poziom 3: Ponowny flash ostatniego działającego stock ROM (Odin/fastboot/LMSA).",
          "Poziom 4: Flash starszej wersji ROM (downgrade), jeśli anti-rollback na to pozwala.",
          "Poziom 5: EDL/QPST lub test point przy hard brick.",
          "Jeśli 3 próby się nie powiodą, skonsultuj wątek XDA dla konkretnego modelu.",
        ],
        tips: [
          "Przed każdym flashowaniem naładuj min. do 50%.",
          "Wyjmij kartę SIM i SD przed flashowaniem Odin (zalecane).",
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
        title: "Motorola — specyficzne problemy",
        description:
          "Najczęstsze problemy Motorola po flashu, OTA lub odblokowaniu bootloadera.",
        steps: [
          "Ostrzeżenie „Bootloader unlocked” przy starcie — normalne po unlock, to nie błąd.",
          "Stuck on Motorola logo: spróbuj fastboot flash boot + vbmeta, potem fastboot reboot.",
          "No service / invalid IMEI po flashu radio: ponowny flash prawidłowego radio.img dla twojego wariantu.",
          "„Fail to boot” po OTA na odblokowanym bootloaderze: flash pełnego firmware RETAIL przez LMSA.",
          "FRP lock po resecie: zaloguj oryginalne konto Google lub oficjalną procedurę Motorola FRP.",
          "Slot A/B mismatch: flash boot do obu slotów — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "fastboot getvar all zapisz do pliku tekstowego — zawiera wersje diag do pomocy na XDA.",
          "Modele Moto G MTK: jeśli fastboot nie działa, spróbuj SP Flash Tool z Motorola MTK scatter.",
        ],
        warning: "Ponowny flash radio z innego regionu może trwale uszkodzić sieć komórkową.",
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Moto G XDA forum",
            url: "https://forum.xda-developers.com/f/moto-g.5208/",
            fileType: "Guide"
          },
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "ZIP",
            note: "Nieoficjalne mirror"
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
      "Emergency Download Mode dla urządzeń Snapdragon — Xiaomi, OnePlus, niektóre Motorola, Samsung (rzadko).",
    overview: [
      "W trybie EDL ekran jest czarny, a PC widzi Qualcomm HS-USB QDLoader 9008.",
      "Wymaga prawidłowego firehose/programmer i auth (u niektórych producentów).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Wejście w tryb EDL",
        description: "Metoda zależy od producenta i stanu bootloadera.",
        steps: [
          "adb reboot edl — działa tylko z włączonym dostępem EDL (root/debug, specyficzne dla modelu).",
          "fastboot oem edl — niektóre modele Xiaomi/OnePlus.",
          "Test point: zwarcie punktów na PCB według schematu (wymaga rozebrania).",
          "Kabel EDL (piny danych połączone) — sposób sprzętowy bez test point.",
          "Sprawdź w Menedżerze urządzeń: Qualcomm HS-USB QDLoader 9008 (port COM).",
        ],
        tips: [
          "Motorola Snapdragon: dostęp EDL jest często ograniczony — preferuj RSA/LMSA.",
          "Bez prawidłowego autentykatora Mi Flash odmówi flashu (Xiaomi).",
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
        title: "Flash w trybie EDL",
        description: "Zaawansowane przywracanie przez QPST/QFIL lub Mi Flash.",
        steps: [
          "Zainstaluj sterownik Qualcomm i QPST/QFIL.",
          "Pobierz firehose/programmer dla dokładnego modelu (nie zawsze publicznie dostępny).",
          "W QFIL: Configuration → Load XML → wybierz rawprogram.xml + patch.xml z firmware.",
          "Kliknij Download Content — proces flashuje wszystkie partycje.",
          "Po zakończeniu odłącz USB i długo przytrzymaj Power, aby włączyć.",
        ],
        warning: "Nieprawidłowy firehose dla innego modelu = krytyczne uszkodzenie NAND.",
        links: [
          {
            label: "Mi Flash Tool (Xiaomi EDL)",
            url: "https://xiaomiflashtool.com/",
            fileType: "ZIP"
          },
          {
            label: "QPST Flash Tool",
            url: "https://qpsttool.com/",
            fileType: "ZIP"
          },
          {
            label: "XDA Qualcomm EDL poradnik",
            url: "https://forum.xda-developers.com/t/qualcomm-edl-mode-9008.3602067/",
            fileType: "Guide"
          }
        ],
      },
    ],
  },
  {
    id: "usb-driver",
    title: "Problemy USB / sterowników",
    description:
      "PC nie rozpoznaje urządzenia w ADB, fastboot, Odin lub SP Flash — najczęstsza przyczyna nieudanego flashu.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Rozwiązanie krok po kroku",
        description: "Systematyczna diagnostyka przed ponownym flashowaniem.",
        steps: [
          "Wymień kabel USB na sprawdzony dany (nie tylko ładujący).",
          "Podłącz bezpośrednio do portu USB na PC (nie przez hub).",
          "W Menedżerze urządzeń usuń wszystkie żółte wykrzykniki przy Android/ADB/Samsung/MTK.",
          "Zainstaluj prawidłowy sterownik według trybu: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "Uruchom ponownie PC i telefon.",
          "Spróbuj innego portu USB (USB 2.0 często stabilniejszy niż 3.0).",
          "Na Windows tymczasowo wyłącz wymuszanie podpisu sterowników, jeśli sterownik nie jest podpisany.",
        ],
        tips: [
          "Zadig może nadpisać sterownik na WinUSB — przydatne dla fastboot na Windows.",
          "Linux: reguły udev dla adb (sudo usermod -aG plugdev).",
        ],
        links: [
          {
            label: "Universal ADB Driver",
            url: "https://adb.clockworkmod.com/",
            fileType: "EXE"
          },
          {
            label: "Sterowniki USB Motorola",
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

export const nastrojeCategories: Category[] = [
  {
    id: "flash-nastroje",
    brandIds: ["fastboot", "odin", "spflash", "miflash", "rsa", "qpst", "spd-flash"],
    title: "Narzędzia flash",
    description: "Oficjalne i zweryfikowane narzędzia dla poszczególnych platform — zawsze pobieraj z zaufanych źródeł.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description: "Podstawowy pakiet do flashowania Androida, debugowania i komunikacji z urządzeniem.",
        steps: [
          "Pobierz ZIP z developer.android.com.",
          "Rozpakuj do C:\\platform-tools lub ~/platform-tools.",
          "Otwórz terminal w folderze: cd C:\\platform-tools",
          "Sprawdź: adb version && fastboot --version",
          "Polecenia: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
        ],
        links: [
          {
            label: "Platform Tools",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP"
          },
          {
            label: "ADB (oficjalna dokumentacja)",
            url: "https://developer.android.com/tools/adb",
            fileType: "Guide"
          },
          {
            label: "Google USB Driver (Windows)",
            url: "https://developer.android.com/studio/run/win-usb",
            fileType: "EXE"
          }
        ],
      },
      {
        id: "nastroj-motorola",
        title: "Motorola — RSA i LMSA",
        description: "Oficjalne narzędzia GUI do rescue, repair i zarządzania urządzeniami Moto.",
        steps: [
          "RSA: rescue i przywracanie stock ROM bez wiersza poleceń.",
          "LMSA: zarządzanie urządzeniem, kopie zapasowe, aktualizacje, repair.",
          "Oba narzędzia wymagają internetu do pobrania firmware.",
          "Uruchamiaj jako administrator na Windows 10/11.",
        ],
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Lenovo Moto Smart Assistant",
            url: "https://support.lenovo.com/us/en/downloads/ds101291",
            fileType: "EXE"
          },
          {
            label: "Motorola Bootloader Unlock",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web"
          }
        ],
      },
      {
        id: "nastroj-odin",
        title: "Odin 3 (Samsung)",
        description: "Narzędzie flash Samsung w trybie Download — tylko dla urządzeń Galaxy.",
        steps: [
          "Używaj Odin3 wersji 3.13.1 lub 3.14.1+ według modelu.",
          "Nie uruchamiaj wielu instancji jednocześnie.",
          "Firmware musi pasować do modelu SM-XXXX i kodu CSC.",
        ],
        links: [
          {
            label: "Sterownik USB Samsung",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE"
          },
          {
            label: "Samsung Smart Switch",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG"
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "nastroj-spflash",
        title: "SP Flash Tool (MediaTek)",
        description: "Flash urządzeń MTK przez scatter — w tym niektórych modeli Motorola MTK.",
        steps: [
          "Wymaga sterownika VCOM i wyłączonego urządzenia.",
          "Nie używaj Format All bez zweryfikowanego firmware.",
          "Download Agent musi być kompatybilny z chipsetem.",
        ],
        links: [
          {
            label: "MediaTek (oficjalnie)",
            url: "https://www.mediatek.com/",
            fileType: "Web"
          },
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP"
          },
          {
            label: "MediaTek USB VCOM Driver",
            url: "https://androidmtk.com/download-mtk-usb-vcom-drivers",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "nastroj-spd",
        title: "SPD / Research Download (Unisoc)",
        description: "Flash chipsetów Unisoc przez pakiet PAC w trybie Download.",
        steps: [
          "Zainstaluj sterownik Spreadtrum USB.",
          "Wybierz firmware PAC dla dokładnego modelu.",
          "Wyłącz telefon, podłącz USB w trybie Download, uruchom flash.",
        ],
        links: [
          {
            label: "Unisoc (oficjalnie)",
            url: "https://www.unisoc.com/",
            fileType: "Web"
          },
          {
            label: "Research Download Tool",
            url: "https://androidmtk.com/download-research-download-tool",
            fileType: "ZIP"
          },
          {
            label: "Needrom Unisoc firmware",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "nastroj-miflash",
        title: "Mi Flash (Xiaomi)",
        description: "Oficjalne narzędzie flash Xiaomi dla trybu EDL i fastboot.",
        steps: [
          "Niektóre modele wymagają autoryzowanego konta Mi.",
          "Tryby: clean all (usuwa dane), save user data, clean all and lock.",
          "Używaj pakietów fastboot ROM .tgz.",
        ],
        links: [
          {
            label: "Mi Flash Tool (Xiaomi EDL)",
            url: "https://xiaomiflashtool.com/",
            fileType: "ZIP"
          },
          {
            label: "Katalog ROM Xiaomi (HyperOS / MIUI)",
            url: "https://xmfirmwareupdater.com/hyperos/",
            fileType: "Katalóg"
          }
        ],
      },
    ],
  },
  {
    id: "firmver-baliky",
    brandIds: ["motorola", "samsung", "xiaomi", "google"],
    title: "Pakiety firmware według marki",
    description: "Katalogi oficjalnych i zweryfikowanych ROM — zawsze sprawdź oznaczenie modelu przed pobraniem.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description: "Pliki flash RETAIL dla Moto G, Edge, Razr i innych. Wariant SINGLE_SIM/DUAL_SIM i region mają znaczenie.",
        steps: [
          "Znajdź model w Ustawienia → Informacje o telefonie (np. XT2347-2).",
          "Wybierz firmware kanału RETAIL (nie RETAILD for carrier).",
          "Pobierz ZIP i rozpakuj — flash przez fastboot lub LMSA.",
          "Dla pakietów OTA: metadata i payload.bin wymagają recovery sideload.",
        ],
        tips: [
          "Mirror Lolinet to zweryfikowane przez społeczność źródło pakietów RETAIL.",
          "Firmware carrier (Verizon, T-Mobile) nie jest kompatybilny z odblokowanym bootloaderem.",
        ],
        links: [
          {
            label: "Motorola Rescue and Smart Assistant",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/150888",
            fileType: "EXE"
          },
          {
            label: "Motorola Bootloader Unlock",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web"
          },
          {
            label: "Lolinet Motorola Firmware",
            url: "https://mirrors.lolinet.com/firmware/lenomola/",
            fileType: "Katalóg",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "fw-samsung",
        title: "Samsung (SM-XXXX)",
        description: "Kompletny firmware z AP, BL, CP, CSC. Kod CSC = region (ORX, XEO, OXM...).",
        steps: [
          "Sprawdź model: Ustawienia → Informacje → Numer modelu SM-XXXX.",
          "Ustal aktualny CSC: *#1234# lub w informacjach Odin.",
          "Pobierz pasujący firmware lub multi-CSC (OXM).",
        ],
        links: [
          {
            label: "Samsung Support Downloads",
            url: "https://www.samsung.com/us/support/downloads/",
            fileType: "Web"
          },
          {
            label: "Samsung Smart Switch",
            url: "https://www.samsung.com/us/support/owners/app/smart-switch",
            fileType: "EXE / DMG"
          },
          {
            label: "Frija — Samsung firmware downloader",
            url: "https://forum.xda-developers.com/t/tool-frija-samsung-firmware-downloader-checker.3910834/",
            fileType: "EXE"
          },
          {
            label: "SamMobile Firmware",
            url: "https://www.sammobile.com/firmwares/",
            fileType: "Katalóg",
            note: "Nieoficjalne mirror"
          }
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) dla Mi Flash, Recovery ZIP dla OTA/TWRP.",
        steps: [
          "Fastboot ROM: kompletny flash przez Mi Flash w EDL/fastboot.",
          "Recovery ZIP: aktualizacja OTA przez recovery sideload.",
          "Sprawdź codename (np. tapas, marble), nie nazwę marketingową.",
        ],
        links: [
          {
            label: "Mi Unlock (oficjalnie)",
            url: "https://en.miui.com/unlock/",
            fileType: "Web"
          },
          {
            label: "Oficjalne narzędzia Xiaomi",
            url: "https://www.mi.com/global/support/tools",
            fileType: "Web"
          },
          {
            label: "Xiaomi HyperOS (oficjalne info)",
            url: "https://hyperos.mi.com/",
            fileType: "Web"
          },
          {
            label: "Katalog ROM Xiaomi (HyperOS / MIUI)",
            url: "https://xmfirmwareupdater.com/hyperos/",
            fileType: "Katalóg"
          }
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory images i pakiety OTA bezpośrednio od Google.",
        steps: [
          "Znajdź codename urządzenia na developers.google.com/android/images.",
          "Pobierz image dla dokładnej wersji.",
          "Uruchom skrypt flash-all z pakietu.",
        ],
        links: [
          {
            label: "Google Factory Images",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP"
          },
          {
            label: "Google OTA",
            url: "https://developers.google.com/android/ota",
            fileType: "ZIP"
          }
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
      "Standardowy sposób ochrony firmware, plików scatter, loaderów DA i wrażliwych poradników przed przesyłaniem.",
    steps: [
      "Wybierz folder lub pliki do udostępnienia (firmware, narzędzia, dokumentacja).",
      "Kliknij prawym → 7-Zip → Add to archive.",
      "Archive format: zip (nie 7z, jeśli chcesz maks. kompatybilności).",
      "Encryption method: AES-256 (nie ZipCrypto — jest słabe).",
      "Wprowadź silne hasło (min. 16 znaków, wielkie/małe litery, cyfry, symbole).",
      "Zaznacz Encrypt file names, jeśli jest dostępne.",
      "Hasło wyślij innym kanałem — Signal, Threema, SMS, osobiście.",
    ],
    tips: [
      "Format 7z ma lepszą kompresję, ale ZIP z AES-256 jest bardziej uniwersalny.",
      "Dla dużych pakietów firmware (2+ GB) rozważ podział na części.",
    ],
    links: [
          {
            label: "7-Zip (Windows)",
            url: "https://www.7-zip.org/download.html",
            fileType: "EXE"
          },
          {
            label: "7-Zip (Linux/macOS)",
            url: "https://www.7-zip.org/download.html",
            fileType: "TAR / PKG"
          },
          {
            label: "PeaZip (alternatíva)",
            url: "https://peazip.github.io/",
            fileType: "EXE"
          }
        ],
  },
  {
    id: "zdielanie-platformy",
    title: "Zalecane platformy do udostępniania",
    description:
      "Bezpieczne wysyłanie dużych plików (firmware, pakiety narzędzi) z hasłem w osobnej wiadomości.",
    steps: [
      "Wgraj zaszyfrowany ZIP na platformę z wygaśnięciem linku (7–30 dni).",
      "Skopiuj link i wyślij odbiorcy.",
      "Hasło wyślij innym kanałem (nie w tym samym e-mailu/czacie co link).",
      "Odbiorca pobiera, rozpakowuje 7-Zipem i sprawdza hash pliku, jeśli jest dostępny.",
      "Po udanym pobraniu usuń plik z serwera.",
    ],
    tips: [
      "SwissTransfer: do 50 GB za darmo, bez rejestracji, szwajcarskie serwery.",
      "Proton Drive: szyfrowanie end-to-end, odpowiednie dla wrażliwych danych.",
      "Repozytorium GitHub: odpowiednie dla kodu źródłowego tego huba (nie do hostingu firmware).",
    ],
    links: [
          {
            label: "SwissTransfer",
            url: "https://www.swisstransfer.com/",
            fileType: "Web"
          },
          {
            label: "WeTransfer",
            url: "https://wetransfer.com/",
            fileType: "Web"
          },
          {
            label: "Proton Drive",
            url: "https://proton.me/drive",
            fileType: "Web"
          },
          {
            label: "MEGA",
            url: "https://mega.io/",
            fileType: "Web"
          },
          {
            label: "Repozytorium GitHub (kod źródłowy)",
            url: "https://github.com/JVVMEDIA/flash-diagnostics-hub",
            fileType: "Web"
          }
        ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Zasady bezpieczeństwa przy udostępnianiu",
    description: "Jak udostępniać firmware i narzędzia legalnie i bezpiecznie.",
    steps: [
      "Udostępniaj tylko firmware i narzędzia, do których masz prawo (oficjalne, open-source, własne).",
      "Nigdy nie wysyłaj hasła w tym samym e-mailu co link do pliku.",
      "Sprawdź hash SHA256 pobranego pliku przed flashowaniem.",
      "Nie używaj publicznych pendrive'ów do wrażliwych danych.",
      "Rejestruj komu i kiedy wysłałeś plik (do celów serwisowych).",
    ],
    tips: [
      "Weryfikacja hash: certutil -hashfile firmware.zip SHA256 (Windows).",
      "Dla firmware Motorola sprawdź kanał RETAIL w nazwie pliku.",
    ],
    warning: "Udostępnianie zastrzeżonego firmware bez zezwolenia może naruszać warunki licencyjne producenta.",
    links: [
          {
            label: "VirusTotal (weryfikacja plików)",
            url: "https://www.virustotal.com/",
            fileType: "Web"
          },
          {
            label: "Vercel Acceptable Use Policy",
            url: "https://vercel.com/legal/acceptable-use-policy",
            fileType: "Web"
          },
          {
            label: "SHA256 hash (certutil — Windows)",
            url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/certutil",
            fileType: "Guide"
          }
        ],
  },
];

export const plHubContent: HubContent = {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
};