#!/usr/bin/env python

import os

def listHtmlFilesSorted(directory=None):
    try:
        files = []
        if not directory:
            directory = "."
        if not os.path.exists(directory): 
            print "Directory %s does not exist." % directory
            return []
        for name in sorted(os.listdir(directory)):
            fullname = os.path.join(directory, name)
            if os.path.isfile(fullname):
                if fullname.endswith(".html"):
                    files.append(fullname)
            elif os.path.isdir(fullname):
                files2 = listHtmlFilesSorted(fullname)
                files.extend(files2)
    except Exception, e:
        print "Got error: %s" % e
        return []
    return files


def createIndexHtml():
    try:
        content = "<!doctype html><meta charset='utf-8'><title>Samples</title><ul>\n"
        files = listHtmlFilesSorted()
        for name in files:
            content += "<li><a href='%s'>%s</a></li>\n" % (name, name)
        content += "</ul>\n"
        index = open("index.html", "w")
        index.write(content)
        index.close()
    except Exception as e:
        print("Failed to create index.html: %s" % e)
        return False
    return True

def main():
    createIndexHtml()

if __name__ == '__main__':
    main()

