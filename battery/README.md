## Battery Status API suite

Latest Editor's Draft: http://dvcs.w3.org/hg/dap/raw-file/default/battery/Overview.html

Latest Technical Report: http://www.w3.org/TR/battery-status/

##Test Cases

Test File | Precondition | User Interaction
----------| ------------ | ----------------
battery-charging-manual.html | battery neither empty nor full; charger plugged in | no, just wait a long time
battery-created-manual.html | charger unplugged in; no backend implementation | no
battery-discharging-manual.html | battery neither empty nor full; charger unplugged in | no, just wait a long time
battery-full-manual.html | battery full; charger plugged in | no
battery-interface.html | no | no
battery-interface-idlharness.html | no | no
battery-interface.js | no | no
battery-plugged-in-manual.html | battery not full; charger unplugged in | plug in the changer
battery-promise.html | no | no
battery-unplugged-manual.html  | battery not full; charger plugged in | unplug the changer

