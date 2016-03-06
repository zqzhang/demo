import argparse
import sys

def get_args(args):
    '''
    Helper function for parsing arguments
    Usage:
        args = get_args(sys.argv)
    '''
    old_argv = sys.argv
    sys.argv = args

    parser = argparse.ArgumentParser(
                description = 'Process arguments for each script/runner')
    # connection arguments
    # serial
    parser.add_argument('-s', '--serial', dest = 'serial',
                        help = 'Device serial')
    # ADB server port
    parser.add_argument('--adb-server-port', dest = 'adb_server_port',
                        help = 'Port for ADB server')
    # ADB local port for uiautomator
    parser.add_argument('--adb-local-port', dest = 'adb_local_port',
                        help = 'ADB local port for uiautomator')

    # script args
    parser.add_argument('--script-args', dest = 'script_args',
                        help = 'Script arguments', nargs = '+')


    args = parser.parse_args()

    sys.argv = old_argv
    globals().update(vars(args))
    return args
