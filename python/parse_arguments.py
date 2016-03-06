import sys
from base_utils import get_args

##### initialization #####
globals().update(vars(get_args(sys.argv)))
args = {}
if script_args:
    for entry in script_args:
        key, val = entry.split("=")
        args[key] = val

globals().update(args)
