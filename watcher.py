import os
import subprocess
import time

from fswatch import Monitor

mon = Monitor()
mon.add_path(".")

last_commit = time.time()
commit_interval = 30
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

        command = ["git", "commit", "-m", "autocommit"] + list(files)
        subprocess.run(command)
        command = ["git", "push", "origin", "autocommit"]
        subprocess.run(command)

        last_commit = now
        files = set()
        # what to do?


mon.set_callback(callback)
mon.start()
