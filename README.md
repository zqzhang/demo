# Experimental Examples and Demos

This repository serves as a placeholder of my experimental examples and demos,
especially for new web technology and testing methodology.

## Demos on Browsers

The simple way to use the demos is to access to the GitHub pages at
https://zqzhang.github.io/demo/

## Demos on Android

Based on the [Crosswalk Project](https://crosswalk-project.org/), one can build
an installable web application for Android platforms following these steps:

1. Download and unpack Crosswalk Project for Android package (`.zip`) from
   https://download.01.org/crosswalk/releases/crosswalk/android/:

   ```sh
   wget url/to/android/canary/16.45.407.0/crosswalk-16.45.407.0.zip
   unzip crosswalk-16.45.407.0.zip
   ```

2. Go to the unpacked Crosswalk Android directory:

   ```sh
   cd crosswalk-16.45.407.0
   ```

3. Run the `make_apk.py` script with Python as follows:

   ```sh
   python make_apk.py --package=com.zqzhang.demo \
       --manifest=/path/to/demo/manifest.json
   ```

   This will package the application defined in the specified manifest.json file
   and produce two apk files from it, one for x86 architecture and one for ARM.
   The apk files will end up in the directory where you ran the script.
   Each file is given the name set in the manifest, with any filesystem-sensitive
   characters removed and an architecture identifier ("x86" or "arm") appended.
   For this demo, the output files are `Demo_0.0.1_arm.apk` and `Demo_0.0.1_x86.apk`.

4. Install the application on the target.

   If installing on an x86 device:

   ```sh
   adb install -r Demo_0.0.1_x86.apk
   ```

   If installing on an ARM device:

   ```sh
   adb install -r Demo_0.0.1_arm.apk
   ```

   The `-r` flag stands for "reinstall". It is not required for the first
   installation, but useful for subsequent reinstalls of the same package.
