import os
import sys
import time

from fswatch import Monitor

mon = Monitor()
mon.add_path(".")

last_commit = time.time()
commit_interval = 10
files = set()


def callback(path, evt_time, flags, flags_num, event_num):
    global files, last_commit, commit_interval
    rel = os.path.relpath(path).decode()
    if rel.find("_gen") >= 0:
        return
    if rel.find(".git/") >= 0:
        return
    if rel.find(".DS_Store") >= 0:
        return
    if rel.find("/resources") >= 0:
        return

    files.add(rel)
    print(files)

    now = time.time()
    if now > last_commit + commit_interval:
        print(f"Commit {files}")
        last_commit = now
        files = set()
        # what to do?


mon.set_callback(callback)
mon.start()