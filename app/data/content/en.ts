import type { Category, HubContent, Subsection } from "./types";

export const flashovanieCategories: Category[] = [
  {
    id: "fastboot-adb",
    brandIds: ["android", "google", "oneplus", "xiaomi"],
    title: "Fastboot / ADB",
    description:
      "Universal method for Google Pixel, Xiaomi, OnePlus, Motorola, and other devices with an unlocked bootloader. Requires USB debugging, correct drivers, and verified firmware.",
    overview: [
      "Fastboot is a low-level mode for flashing individual partitions (boot, recovery, system, vendor).",
      "ADB (Android Debug Bridge) is used to communicate with a running system — backups, file transfers, reboot into fastboot.",
      "Always verify the model designation (e.g. XT2343-2) before downloading firmware.",
    ],
    subsections: [
      {
        id: "fastboot-priprava",
        title: "PC and environment setup",
        description:
          "A properly configured environment is essential. An incorrect platform-tools path or outdated driver are the most common causes of failure.",
        steps: [
          "Download Android Platform Tools and extract to a folder without spaces (e.g. C:\\platform-tools).",
          "Open a terminal in that folder or add the path to your system PATH.",
          "On the phone: Settings → About phone → tap Build number 7 times → Developer options.",
          "Enable USB debugging and (if available) OEM bootloader unlocking.",
          "Connect the USB cable and confirm the “Allow USB debugging” dialog on the phone.",
          "Verify the connection: adb devices — the serial number must appear with status “device”.",
          "For flash mode: adb reboot bootloader or the physical button combination per manufacturer.",
          "In fastboot verify: fastboot devices",
        ],
        tips: [
          "If adb devices shows “unauthorized”, disconnect the cable, revoke debugging authorizations on the phone, and reconnect.",
          "On Windows, prefer a USB 2.0 port if the device is not recognized.",
          "Disable MIUI optimization (Xiaomi) if adb crashes intermittently.",
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
        title: "Flashing via Fastboot — general procedure",
        description:
          "Manual or scripted flash of official images. Command order and partition names vary by manufacturer.",
        steps: [
          "Back up photos, contacts, and important data — flashing usually wipes userdata.",
          "Verify unlocked bootloader: fastboot oem device-info (Motorola) or fastboot getvar unlocked.",
          "Extract the downloaded firmware into a single folder.",
          "If the package contains flash-all.bat / flash-all.sh, prefer that script over manual flashing.",
          "Manually: fastboot flash boot boot.img, fastboot flash recovery recovery.img, fastboot flash vbmeta vbmeta.img.",
          "For A/B slots: fastboot flash boot_a boot.img && fastboot flash boot_b boot.img.",
          "After a successful flash: fastboot reboot or fastboot reboot recovery.",
          "First boot after flashing takes 5–20 minutes — do not touch the device.",
        ],
        tips: [
          "The command fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img is required by some ROMs for root/custom kernel.",
          "If fastboot reports “waiting for device”, check the driver and cable.",
          "Never flash boot.img from a different model — risk of hard brick.",
        ],
        warning:
          "Flashing incorrect firmware or interrupting the process can permanently damage the device. Always verify the exact model and variant (Global/EU/India).",
        links: [
          {
            label: "Google Factory Images (Pixel)",
            url: "https://developers.google.com/android/images",
            fileType: "ZIP / IMG"
          },
          {
            label: "Xiaomi Firmware Updater",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP"
          },
          {
            label: "OnePlus OxygenOS balíky",
            url: "https://oxygenos.oneplus.com/",
            fileType: "ZIP"
          }
        ],
      },
      {
        id: "fastboot-pixel",
        title: "Google Pixel — factory image",
        description: "Official way to restore a Pixel to a clean state directly from Google.",
        steps: [
          "Find the device codename (e.g. felix, cheetah) on the factory images page.",
          "Download the ZIP for the exact Android version.",
          "Extract the archive, run flash-all.bat (Windows) or ./flash-all.sh (Linux/macOS).",
          "The script automatically reboots into the bootloader and flashes all partitions.",
          "If flash-all fails, run individual commands from flash-all.sh manually.",
        ],
        tips: [
          "Pixel 6+ uses Android Verified Boot — custom ROM also requires the correct vbmeta.",
          "If the bootloader is locked, factory image flash will not work without unlocking.",
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
      "Complete guide for Moto G, Moto Edge, Moto Razr, and other models (XT-xxxx). Motorola uses fastboot, its own unlock process, and official RSA/LMSA tools.",
    overview: [
      "Find the model number in Settings → About phone → Model (e.g. moto g84 5G, XT2347-2).",
      "The bootloader is unlocked via the official Motorola website — the process is free but may void the warranty.",
      "After unlocking, a warning message appears at startup — this is normal.",
      "Motorola often distributes OTA packages; for downgrade you need an older RETAIL flash file.",
    ],
    subsections: [
      {
        id: "moto-bootloader",
        title: "Bootloader unlock (official)",
        description:
          "Without an unlocked bootloader, custom ROM and manual fastboot flash of most partitions is not possible.",
        steps: [
          "Enable Developer options and USB debugging on the phone.",
          "Also enable “OEM unlocking” (if available in the developer menu).",
          "Connect the phone to the PC and run: adb reboot bootloader",
          "In fastboot obtain unlock data: fastboot oem get_unlock_data",
          "Copy the entire output (multiple lines starting with BOOTLOADER...).",
          "Visit the Motorola bootloader unlock page and sign in with your Moto / Lenovo account.",
          "Paste the unlock data into the form and submit the request.",
          "After email approval run: fastboot oem unlock UNIQUE_KEY (key from the email).",
          "Confirm on the phone with Volume Up — the device will be wiped (factory reset).",
        ],
        tips: [
          "The request may be denied for carrier-locked devices.",
          "Save the UNIQUE_KEY from the email — you may need it when re-locking.",
          "fastboot oem get_unlock_data only works in bootloader mode.",
          "Some newer Moto models also require a Wi-Fi connection during the unlock request.",
        ],
        warning:
          "Unlocking the bootloader wipes all data and may permanently block some banking/payment apps (SafetyNet/Play Integrity).",
        links: [
          {
            label: "Motorola Bootloader Unlock",
            url: "https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a",
            fileType: "Web"
          },
          {
            label: "Motorola USB Drivers",
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
        title: "Firmware flash via Fastboot",
        description:
          "Restore to stock ROM, downgrade, or fix bootloop after a failed OTA. Requires an unlocked bootloader and the correct RETAIL flash package.",
        steps: [
          "Download firmware for the exact XT-xxxx model and variant (RETAIL/EU/SINGLE_SIM).",
          "Extract the ZIP — you will find boot.img, vbmeta.img, radio.img, super.img or sparse images.",
          "Reboot into fastboot: adb reboot bootloader",
          "Verify status: fastboot getvar unlocked — must be yes.",
          "Flash boot: fastboot flash boot boot.img",
          "Flash vbmeta (if included): fastboot flash vbmeta vbmeta.img",
          "Flash modem/radio (if present): fastboot flash modem radio.img",
          "For a complete flash use flashfile.sh / flashfile.bat from the official package.",
          "Reboot: fastboot reboot — first boot 10–15 minutes.",
        ],
        tips: [
          "Motorola super partition: newer models use fastboot flash super super.img.",
          "If flash fails with “invalid sparse file”, download a different package version or use LMSA.",
          "For downgrade the target version must be older or equal — newer anti-rollback may block the flash.",
          "fastboot oem fb_mode_set clear may help with bootloop after a failed flash (model-specific).",
        ],
        warning:
          "Flashing incorrect radio/modem.img for a different variant (e.g. EU vs US) can break network bands and GPS.",
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
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "moto-lmsa-rsa",
        title: "LMSA and Rescue tools (official GUI)",
        description:
          "Lenovo Moto Smart Assistant and Motorola RSA allow stock ROM restore via a graphical interface — suitable when fastboot commands fail.",
        steps: [
          "Download and install Motorola Rescue and Smart Assistant (RSA) or LMSA.",
          "Enable USB debugging on the phone.",
          "Run the tool as administrator on Windows.",
          "Connect the phone — the tool automatically detects the model.",
          "Select “Rescue” or “Repair” and download the recommended firmware.",
          "Let the process complete — the phone may restart several times.",
          "After completion disconnect and let the device finish first boot.",
        ],
        tips: [
          "RSA requires a stable internet connection to download firmware.",
          "Rescue mode often wipes all data.",
          "If RSA does not recognize the device, try a different USB port or Motorola driver.",
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
            label: "Motorola USB Drivers",
            url: "https://en-us.support.motorola.com/app/answers/detail/a_id/88481",
            fileType: "EXE / ZIP"
          }
        ],
      },
      {
        id: "moto-modely",
        title: "Popular models and specifics",
        description:
          "Quick overview of the most common Motorola series and flashing specifics.",
        steps: [
          "Moto G series (g14, g24, g34, g54, g84): fastboot unlock + RETAIL ZIP, often MTK or Snapdragon.",
          "Moto Edge (edge 30, 40, 50): super partition, OTA via LMSA, fastboot for downgrade.",
          "Moto Razr (fold): sensitive display — do not force reboot during flash, only fastboot reboot.",
          "Moto One / Android One: bootloader unlock depends on region, stock image from Google/Motorola.",
          "Verify SKU in fastboot: fastboot getvar all — look for channel-id, version-boot, product.",
        ],
        tips: [
          "Dual SIM variants have a different CSC code — firmware must match.",
          "Carrier-branded models (Verizon, AT&T) often have no unlock option.",
          "Moto Actions and gestures are restored automatically with stock ROM after flash.",
        ],
        links: [
          {
            label: "Moto G firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          },
          {
            label: "Moto Edge firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
            note: "Unofficial mirror"
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
      "Official method for flashing Samsung Galaxy in Download mode. Requires correct firmware (AP, BL, CP, CSC), Samsung USB driver, and Odin3.",
    overview: [
      "Download mode (Odin mode) is activated with Volume Down + Power (+ Bixby on older models).",
      "CSC code determines region and language — HOME_CSC preserves data, CSC wipes it.",
      "Odin shows Added!! when the phone is correctly connected.",
    ],
    subsections: [
      {
        id: "odin-priprava",
        title: "Download mode, driver, and backup",
        description:
          "Always back up data via Smart Switch before flashing. Incorrect driver = phone not shown in Odin.",
        steps: [
          "Install Samsung USB Driver and restart the PC.",
          "Back up the phone via Samsung Smart Switch (photos, contacts, apps).",
          "Power off the phone completely.",
          "Hold Volume Down + Power (+ Bixby if present) for about 10 seconds.",
          "When the warning appears, press Volume Up to enter Download mode.",
          "Connect the USB cable — Odin should show a blue COM port box with Added!!",
          "Run Odin3 as administrator.",
        ],
        tips: [
          "If Added!! is missing, try a different cable, port, or reinstall the driver.",
          "Disable Samsung Kies / Smart Switch during Odin flash — they may conflict.",
          "Battery should be at least 50% before flashing.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
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
        title: "Firmware flash in Odin — AP, BL, CP, CSC",
        description:
          "Complete stock firmware flash. Each file has its own slot in Odin.",
        steps: [
          "Download firmware for the exact SM-XXXX model and CSC region.",
          "Extract the .zip — you will find AP_xxx.tar.md5, BL_xxx.tar.md5, CP_xxx.tar.md5, CSC_xxx.tar.md5.",
          "In Odin click BL → select the BL file.",
          "Click AP → select the AP file (loading may take longer).",
          "Click CP → select the CP file (modem/radio).",
          "Click CSC → select HOME_CSC (preserves data) or CSC (factory reset).",
          "Check Auto Reboot and F. Reset Time.",
          "Click Start — wait for green PASS! (red FAIL = something failed).",
          "The phone reboots — first boot 5–15 minutes on large updates.",
        ],
        tips: [
          "AP contains system, recovery, vbmeta — never skip it.",
          "On FAIL check whether firmware matches the model and Download mode is active.",
          "Odin3 version 3.14.1+ recommended for newer Galaxy (S21+).",
          "One UI downgrade may be blocked by anti-rollback — flash only the same or newer version.",
        ],
        warning:
          "Flashing firmware from a different region may cause loss of Samsung Pay, dual SIM features, or LTE bands.",
        links: [
          {
            label: "Samsung USB Driver",
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
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "odin-pit",
        title: "PIT file and repartition",
        description:
          "When changing partition sizes or recovering after hard brick, a PIT file may be required.",
        steps: [
          "Obtain the PIT file from the firmware package or via Odin (Repartition — advanced only).",
          "In Odin check Re-Partition and load the .pit file.",
          "Then flash AP, BL, CP, CSC as in the standard procedure.",
          "Re-Partition wipes all data — use only if standard flash fails.",
        ],
        tips: [
          "Incorrect PIT can permanently damage storage — repartition only as a last resort.",
        ],
        warning: "Re-Partition without the correct PIT = critical risk of hard brick.",
        links: [
          {
            label: "Samsung USB Driver",
            url: "https://developer.samsung.com/android-usb-driver",
            fileType: "EXE"
          },
          {
            label: "Odin3 (XDA)",
            url: "https://forum.xda-developers.com/t/odin-multi-download-android-rom-flash-tool.3393441/",
            fileType: "ZIP"
          },
          {
            label: "Samsung Odin PIT guide (XDA)",
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
      "Flash MediaTek (MTK) chipsets via scatter file and Download Agent. Used on many budget and mid-range devices including some Motorola (MTK variants).",
    overview: [
      "Scatter.txt defines partitions and flash memory addresses.",
      "The phone must be powered off before connecting USB (Download mode).",
      "Format All without backup = almost certain hard brick.",
    ],
    subsections: [
      {
        id: "sp-priprava",
        title: "Scatter, DA, and VCOM driver",
        description:
          "Without the correct scatter.txt, Download Agent, and MediaTek VCOM driver, flashing will not start.",
        steps: [
          "Download firmware for the exact model (must contain scatter.txt and images/).",
          "Install MediaTek USB VCOM driver (for Windows 10/11 64-bit).",
          "Extract SP Flash Tool (latest compatible version for your chipset).",
          "Run flash_tool.exe as administrator.",
          "Click Choose on Download-Agent — select MTK_AllInOne_DA.bin or DA from firmware.",
          "Click Choose on Scatter — select scatter.txt.",
          "Partitions load automatically — do not check unnecessary items.",
        ],
        tips: [
          "For Helio G99/G100 chipsets a newer SP Flash Tool v5 version may be required.",
          "If scatter reports an error, firmware is for a different memory variant (4GB vs 6GB RAM).",
          "Disable Windows Defender during flash — it may block flash_tool.",
        ],
        links: [
          {
            label: "MediaTek (official)",
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
          "Three flash modes — choose based on the situation. Format All is the most dangerous.",
        steps: [
          "Download Only: flash selected partitions without wiping — to fix boot/recovery.",
          "Firmware Upgrade: flash all partitions + update — standard stock ROM restore.",
          "Format All + Download: complete wipe and flash — only for hard brick.",
          "Select the mode from the dropdown before clicking Download.",
          "Click Download, then connect the powered-off phone via USB.",
          "SP Flash Tool detects the device and starts the progress bar.",
          "After green OK disconnect the cable and power on the phone manually (long press Power).",
        ],
        tips: [
          "If progress stalls at 0%, check VCOM driver and disable MIUI USB debugging (secure).",
          "For Motorola MTK variants use firmware specifically for the MTK SKU.",
        ],
        warning:
          "Format All without verified firmware for that model = high risk of permanent brick.",
        links: [
          {
            label: "MediaTek (official)",
            url: "https://www.mediatek.com/",
            fileType: "Web"
          },
          {
            label: "SP Flash Tool",
            url: "https://spflashtool.com/download/",
            fileType: "ZIP"
          },
          {
            label: "Android MTK guides",
            url: "https://androidmtk.com/",
            fileType: "Guide"
          },
          {
            label: "Needrom MTK firmware",
            url: "https://www.needrom.com/category/mtk/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          }
        ],
      },
    ],
  },
  {
    id: "unisoc-ufs",
    brandIds: ["unisoc"],
    title: "Unisoc (Spreadtrum) & UFS storage",
    description:
      "Flash budget and mid-range devices with Unisoc chipset (Tecno, Infinix, Realme, ZTE). UFS storage, hard brick recovery, and FRP resolution after factory reset.",
    overview: [
      "Unisoc (formerly Spreadtrum) uses SPD / Research Download instead of fastboot.",
      "UFS is faster storage than eMMC — flashing requires the correct PAC package and Download Agent version.",
      "Hard brick = black screen, PC does not recognize the phone — solution via test point or authorized service.",
      "FRP (Factory Reset Protection) activates after reset without the original Google account.",
    ],
    subsections: [
      {
        id: "unisoc-spd-flash",
        title: "SPD / Research Download — Unisoc flash",
        description:
          "Standard procedure for Unisoc devices with PAC firmware. Phone must be in Download mode (powered off + USB).",
        steps: [
          "Download PAC firmware for the exact model (CPU + RAM + UFS/eMMC variant).",
          "Install Spreadtrum / Unisoc USB driver (SCI Android USB Driver).",
          "Run Research Download Tool or SPD Upgrade Tool as administrator.",
          "Select PAC file — the tool extracts partitions (boot, system, userdata, persist).",
          "Power off the phone, hold Volume Down + connect USB (model-specific combinations).",
          "Click Start Download — progress bar must run without BROM error.",
          "After PASS disconnect USB and power on the phone (first boot 5–15 minutes).",
        ],
        tips: [
          "PAC from a different model = hard brick risk — verify chipset (e.g. T606, T610, T760).",
          "If the tool reports “failed to open port”, reinstall the driver and try a USB 2.0 port.",
          "Some models require older Research Download 2.9.9004 instead of RDA.",
        ],
        warning:
          "Flashing incorrect PAC or interrupting the process can permanently damage the device.",
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
        title: "UFS storage — flashing specifics",
        description:
          "UFS (Universal Flash Storage) is common on newer Unisoc, Qualcomm, and Samsung devices. Requires exact firmware and the correct Download Agent.",
        steps: [
          "Verify storage type: Settings → Storage or model specifications (UFS 2.1 / 2.2 / 3.x).",
          "UFS firmware is not compatible with the eMMC variant of the same model.",
          "For Unisoc: flash the full PAC — do not partially flash individual partitions without experience.",
          "For Qualcomm UFS: EDL + firehose (QPST/QFIL) with rawprogram.xml from the firmware package.",
          "After flashing a UFS device first boot takes longer — do not interrupt power.",
          "If flash fails with “storage mismatch”, download firmware for the correct capacity (64/128/256 GB).",
        ],
        tips: [
          "UFS has higher wear — repeated Format All increases chip failure risk.",
          "Back up persist and nvram partitions before experimental flashing (if you have root/debug access).",
        ],
        warning:
          "Incorrect firehose or UFS programmer for a different model can irreversibly damage storage.",
        links: [
          {
            label: "Unisoc (official)",
            url: "https://www.unisoc.com/",
            fileType: "Web"
          },
          {
            label: "Android MTK guides",
            url: "https://androidmtk.com/",
            fileType: "Guide"
          },
          {
            label: "Needrom Unisoc firmware",
            url: "https://www.needrom.com/category/unisoc/",
            fileType: "PAC / ZIP",
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "unisoc-frp",
        title: "FRP bypass / protection removal",
        description:
          "Factory Reset Protection blocks setup after reset without the original Google account. Legal solution = sign in with the owner's account.",
        steps: [
          "Official: sign in with the Google account that was on the device before reset.",
          "If you have menu access: Settings → Accounts → remove the old account before factory reset.",
          "After stock PAC flash without userdata wipe FRP may remain — use clean flash (userdata format).",
          "Download mode + full stock PAC flash often resets FRP along with the system.",
          "For carrier models contact the carrier with proof of ownership.",
          "Service tools (authorized) can legally erase FRP during repair.",
        ],
        tips: [
          "Never buy a phone with active FRP — it may be lost or stolen.",
          "After successful flash complete the setup wizard with your own Google account.",
        ],
        warning:
          "Bypassing FRP on someone else's device may be illegal. Proceed only on your own phone or with the owner's consent.",
        links: [
          {
            label: "Google FRP help (oficiálne)",
            url: "https://support.google.com/android/answer/2812853",
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
        title: "Recovery from hard brick",
        description:
          "Device unresponsive, black screen, PC does not see ADB or fastboot. Procedure from least invasive step.",
        steps: [
          "Soft brick: try Download mode (Volume Down + USB) and flash stock PAC via Research Download.",
          "If PC does not see the device: reinstall Spreadtrum driver, change cable and port.",
          "Press combination for BROM mode (often Volume Up + USB with phone powered off).",
          "Test point: short test points on PCB per model schematic — enter Download mode.",
          "If flash fails at 0%: incorrect PAC, damaged UFS chip, or dead battery.",
          "Service level: ISP / UFS programmer for physical memory or PMIC damage.",
          "After successful flash leave the device on charger for 20 minutes before first boot.",
        ],
        tips: [
          "Note the last working PAC and version before experimenting — eases downgrade.",
          "Battery below 20% often causes failed flash on UFS devices.",
          "If the phone vibrates but has no display, the problem may be the display — not a brick.",
        ],
        warning:
          "Test point and ISP intervention require experience — incorrect procedure can damage the motherboard.",
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
      "Device keeps restarting, stuck on logo, or does not respond at all. Diagnosis starts by identifying the available mode.",
    overview: [
      "Soft brick: device can enter fastboot/download/EDL — recoverable by flashing.",
      "Hard brick: no response, black screen, PC does not recognize the device — requires test point or service.",
      "Bootloop after OTA: wipe cache or re-flash the last working ROM often helps.",
    ],
    subsections: [
      {
        id: "diag-rezimy",
        title: "Mode and symptom identification",
        description:
          "Correct mode diagnosis determines which tool to use — Odin, fastboot, SP Flash, or QPST.",
        steps: [
          "Fastboot: black screen + “FASTBOOT MODE” text — fix via fastboot flash or RSA (Motorola).",
          "Download/Odin: Samsung logo + “Downloading...” text — fix via Odin3.",
          "EDL (Qualcomm 9008): black screen, in Device Manager Qualcomm HS-USB QDLoader — QPST, Mi Flash, Motorola rescue.",
          "MTK Download: powered-off phone, SP Flash Tool detects after USB — scatter flash.",
          "Unisoc Download: powered-off phone, Research Download detects Spreadtrum port — PAC flash.",
          "Bootloop on logo: repeated restart at animation — wipe cache, re-flash boot/system.",
          "Hard brick: no LED, no vibration — test point, EDL/SPD forcing, or service.",
        ],
        tips: [
          "Motorola: bootloop after bad OTA often fixed by LMSA Rescue without manual fastboot.",
          "Samsung: bootloop after root — flash HOME_CSC + AP via Odin.",
          "Note the last known ROM version before flashing — helps with downgrade.",
        ],
        links: [
          {
            label: "Android Recovery (official)",
            url: "https://developer.android.com/studio/run/emulator#recovery",
            fileType: "Guide"
          },
          {
            label: "ADB sideload (official)",
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
        title: "Recovery procedure by severity",
        description: "From least invasive step to complete re-flash.",
        steps: [
          "Level 1: Forced restart (Power 15–30 s) or recovery wipe cache partition.",
          "Level 2: Recovery factory reset (wipes data, preserves firmware).",
          "Level 3: Re-flash last working stock ROM (Odin/fastboot/LMSA).",
          "Level 4: Flash older ROM version (downgrade) if anti-rollback allows.",
          "Level 5: EDL/QPST or test point for hard brick.",
          "If 3 attempts fail, consult the XDA thread for the specific model.",
        ],
        tips: [
          "Charge to at least 50% before each flash.",
          "Remove SIM and SD card before Odin flash (recommended).",
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
        title: "Motorola — specific issues",
        description:
          "Most common Motorola problems after flash, OTA, or bootloader unlock.",
        steps: [
          "“Bootloader unlocked” warning at startup — normal after unlock, not an error.",
          "Stuck on Motorola logo: try fastboot flash boot + vbmeta, then fastboot reboot.",
          "No service / invalid IMEI after radio flash: re-flash the correct radio.img for your variant.",
          "“Fail to boot” after OTA on unlocked bootloader: flash full RETAIL firmware via LMSA.",
          "FRP lock after reset: sign in with original Google account or official Motorola FRP procedure.",
          "Slot A/B mismatch: flash boot to both slots — fastboot flash boot_a + boot_b.",
        ],
        tips: [
          "Save fastboot getvar all to a text file — contains diag versions for XDA help.",
          "Moto G MTK models: if fastboot does not work, try SP Flash Tool with Motorola MTK scatter.",
        ],
        warning: "Re-flashing radio from a different region can permanently damage the mobile network.",
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
            note: "Unofficial mirror"
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
      "Emergency Download Mode for Snapdragon devices — Xiaomi, OnePlus, some Motorola, Samsung (rare).",
    overview: [
      "In EDL mode the screen is black and the PC sees Qualcomm HS-USB QDLoader 9008.",
      "Requires the correct firehose/programmer and auth (on some manufacturers).",
    ],
    subsections: [
      {
        id: "diag-edl-vstup",
        title: "Entering EDL mode",
        description: "Method depends on manufacturer and bootloader state.",
        steps: [
          "adb reboot edl — works only with EDL access enabled (root/debug, model-specific).",
          "fastboot oem edl — some Xiaomi/OnePlus models.",
          "Test point: shorting points on PCB per schematic (requires disassembly).",
          "EDL cable (data pins connected) — hardware method without test point.",
          "Verify in Device Manager: Qualcomm HS-USB QDLoader 9008 (COM port).",
        ],
        tips: [
          "Motorola Snapdragon: EDL access is often restricted — prefer RSA/LMSA.",
          "Without the correct authenticator Mi Flash will refuse to flash (Xiaomi).",
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
        title: "Flashing in EDL mode",
        description: "Advanced recovery via QPST/QFIL or Mi Flash.",
        steps: [
          "Install Qualcomm driver and QPST/QFIL.",
          "Download firehose/programmer for the exact model (not always publicly available).",
          "In QFIL: Configuration → Load XML → select rawprogram.xml + patch.xml from firmware.",
          "Click Download Content — the process flashes all partitions.",
          "After completion disconnect USB and long-press Power to turn on.",
        ],
        warning: "Incorrect firehose for a different model = critical NAND damage.",
        links: [
          {
            label: "Mi Flash Tool (Xiaomi EDL)",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP"
          },
          {
            label: "QPST Flash Tool",
            url: "https://qpsttool.com/",
            fileType: "ZIP"
          },
          {
            label: "XDA Qualcomm EDL guide",
            url: "https://forum.xda-developers.com/t/qualcomm-edl-mode-9008.3602067/",
            fileType: "Guide"
          }
        ],
      },
    ],
  },
  {
    id: "usb-driver",
    title: "USB / Driver issues",
    description:
      "PC does not recognize the device in ADB, fastboot, Odin, or SP Flash — the most common cause of failed flash.",
    subsections: [
      {
        id: "diag-usb-fix",
        title: "Step-by-step fix",
        description: "Systematic diagnosis before retrying flash.",
        steps: [
          "Replace USB cable with a verified data cable (not charge-only).",
          "Connect directly to a PC USB port (not through a hub).",
          "In Device Manager remove all yellow exclamation marks under Android/ADB/Samsung/MTK.",
          "Install the correct driver for the mode: Google (ADB), Samsung (Odin), MTK (VCOM), Motorola (Motorola USB).",
          "Restart both PC and phone.",
          "Try a different USB port (USB 2.0 is often more stable than 3.0).",
          "On Windows temporarily disable driver signature enforcement if the driver is unsigned.",
        ],
        tips: [
          "Zadig can replace the driver with WinUSB — useful for fastboot on Windows.",
          "Linux: udev rules for adb (sudo usermod -aG plugdev).",
        ],
        links: [
          {
            label: "Universal ADB Driver",
            url: "https://adb.clockworkmod.com/",
            fileType: "EXE"
          },
          {
            label: "Motorola USB Drivers",
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
    title: "Flash tools",
    description: "Official and verified tools for individual platforms — always download from trusted sources.",
    subsections: [
      {
        id: "nastroj-fastboot",
        title: "Fastboot / ADB (Platform Tools)",
        description: "Core package for Android flash, debugging, and device communication.",
        steps: [
          "Download ZIP from developer.android.com.",
          "Extract to C:\\platform-tools or ~/platform-tools.",
          "Open terminal in the folder: cd C:\\platform-tools",
          "Verify: adb version && fastboot --version",
          "Commands: adb devices, adb reboot bootloader, fastboot flash, fastboot reboot",
        ],
        links: [
          {
            label: "Platform Tools",
            url: "https://developer.android.com/tools/releases/platform-tools",
            fileType: "ZIP"
          },
          {
            label: "ADB (official documentation)",
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
        title: "Motorola — RSA and LMSA",
        description: "Official GUI tools for rescue, repair, and Moto device management.",
        steps: [
          "RSA: rescue and stock ROM restore without command line.",
          "LMSA: device management, backups, updates, repair.",
          "Both tools require internet to download firmware.",
          "Run as administrator on Windows 10/11.",
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
        description: "Samsung Download mode flash tool — for Galaxy devices only.",
        steps: [
          "Use Odin3 version 3.13.1 or 3.14.1+ depending on model.",
          "Do not run multiple instances at once.",
          "Firmware must match SM-XXXX model and CSC code.",
        ],
        links: [
          {
            label: "Samsung USB Driver",
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
        description: "Flash MTK devices via scatter — including some Motorola MTK models.",
        steps: [
          "Requires VCOM driver and powered-off device.",
          "Do not use Format All without verified firmware.",
          "Download Agent must be compatible with the chipset.",
        ],
        links: [
          {
            label: "MediaTek (official)",
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
        description: "Flash Unisoc chipsets via PAC package in Download mode.",
        steps: [
          "Install Spreadtrum USB driver.",
          "Select PAC firmware for the exact model.",
          "Power off the phone, connect USB in Download mode, start flash.",
        ],
        links: [
          {
            label: "Unisoc (official)",
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
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "nastroj-miflash",
        title: "Mi Flash (Xiaomi)",
        description: "Xiaomi official flash tool for EDL and fastboot mode.",
        steps: [
          "Some models require an authorized Mi account.",
          "Modes: clean all (wipes data), save user data, clean all and lock.",
          "Use fastboot ROM .tgz packages.",
        ],
        links: [
          {
            label: "Mi Flash Tool (Xiaomi EDL)",
            url: "https://xiaomiflashtool.com/latest/",
            fileType: "ZIP"
          },
          {
            label: "Xiaomi Firmware Updater",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR / ZIP"
          }
        ],
      },
    ],
  },
  {
    id: "firmver-baliky",
    brandIds: ["motorola", "samsung", "xiaomi", "google"],
    title: "Firmware packages by brand",
    description: "Catalogs of official and verified ROMs — always verify model designation before downloading.",
    subsections: [
      {
        id: "fw-motorola",
        title: "Motorola (XT-xxxx)",
        description: "RETAIL flash files for Moto G, Edge, Razr, and others. SINGLE_SIM/DUAL_SIM variant and region matter.",
        steps: [
          "Find model in Settings → About phone (e.g. XT2347-2).",
          "Select RETAIL channel firmware (not RETAILD for carrier).",
          "Download ZIP and extract — flash via fastboot or LMSA.",
          "For OTA packages: metadata and payload.bin require recovery sideload.",
        ],
        tips: [
          "Lolinet mirror is a community-verified source of RETAIL packages.",
          "Carrier firmware (Verizon, T-Mobile) is not compatible with unlocked bootloader.",
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
            fileType: "ZIP / XML",
            note: "Unofficial mirror"
          },
          {
            label: "Moto G firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_g/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          },
          {
            label: "Moto Edge firmware (Lolinet)",
            url: "https://mirrors.lolinet.com/firmware/lenomola/phone_moto_edge/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "fw-samsung",
        title: "Samsung (SM-XXXX)",
        description: "Complete firmware with AP, BL, CP, CSC. CSC code = region (ORX, XEO, OXM...).",
        steps: [
          "Verify model: Settings → About → Model number SM-XXXX.",
          "Find current CSC: *#1234# or in Odin info.",
          "Download matching firmware or multi-CSC (OXM).",
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
            url: "https://www.sammobile.com/samsung/firmware/",
            fileType: "ZIP",
            note: "Unofficial mirror"
          }
        ],
      },
      {
        id: "fw-xiaomi",
        title: "Xiaomi",
        description: "Fastboot ROM (.tgz) for Mi Flash, Recovery ZIP for OTA/TWRP.",
        steps: [
          "Fastboot ROM: complete flash via Mi Flash in EDL/fastboot.",
          "Recovery ZIP: OTA update via recovery sideload.",
          "Verify codename (e.g. tapas, marble) not marketing name.",
        ],
        links: [
          {
            label: "Mi Unlock (official)",
            url: "https://en.miui.com/unlock/",
            fileType: "Web"
          },
          {
            label: "Xiaomi HyperOS ROM",
            url: "https://hyperos.mi.com/",
            fileType: "Web"
          },
          {
            label: "Xiaomi Firmware Updater",
            url: "https://xiaomifirmwareupdater.com/",
            fileType: "TAR"
          }
        ],
      },
      {
        id: "fw-pixel",
        title: "Google Pixel",
        description: "Factory images and OTA packages directly from Google.",
        steps: [
          "Find device codename on developers.google.com/android/images.",
          "Download image for the exact version.",
          "Run flash-all script from the package.",
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
      "Standard way to protect firmware, scatter files, DA loaders, and sensitive guides during transfer.",
    steps: [
      "Select folder or files to share (firmware, tools, documentation).",
      "Right-click → 7-Zip → Add to archive.",
      "Archive format: zip (not 7z if you want maximum compatibility).",
      "Encryption method: AES-256 (not ZipCrypto — it is weak).",
      "Enter a strong password (min. 16 characters, upper/lowercase, numbers, symbols).",
      "Check Encrypt file names if available.",
      "Send the password via a separate channel — Signal, Threema, SMS, in person.",
    ],
    tips: [
      "7z format has better compression, but ZIP with AES-256 is more universal.",
      "For large firmware packages (2+ GB) consider splitting into parts.",
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
    title: "Recommended sharing platforms",
    description:
      "Secure delivery of large files (firmware, tool packages) with password in a separate message.",
    steps: [
      "Upload encrypted ZIP to a platform with link expiration (7–30 days).",
      "Copy the link and send to the recipient.",
      "Send the password via a different channel (not in the same email/chat as the link).",
      "Recipient downloads, extracts with 7-Zip, and verifies file hash if available.",
      "After successful download delete the file from the server.",
    ],
    tips: [
      "SwissTransfer: up to 50 GB free, no registration, Swiss servers.",
      "Proton Drive: end-to-end encryption, suitable for sensitive data.",
      "GitHub repository: suitable for this hub's source code (not for hosting firmware).",
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
            label: "GitHub repository (source code)",
            url: "https://github.com/JVVMEDIA/flash-diagnostics-hub",
            fileType: "Web"
          }
        ],
  },
  {
    id: "zdielanie-bezpecnost",
    title: "Security rules for sharing",
    description: "How to share firmware and tools legally and securely.",
    steps: [
      "Share only firmware and tools you have rights to (official, open-source, your own).",
      "Never send the password in the same email as the file link.",
      "Verify SHA256 hash of the downloaded file before flashing.",
      "Do not use public USB drives for sensitive data.",
      "Log who and when you sent the file (for service purposes).",
    ],
    tips: [
      "Hash verification: certutil -hashfile firmware.zip SHA256 (Windows).",
      "For Motorola firmware verify RETAIL channel in the file name.",
    ],
    warning: "Sharing proprietary firmware without permission may violate manufacturer license terms.",
    links: [
          {
            label: "VirusTotal (file verification)",
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

export const enHubContent: HubContent = {
  flashovanieCategories,
  diagnostikaCategories,
  nastrojeCategories,
  zdielanieSubsections,
};