Please see the most up-to-date version of this protocol on my blog at [https://darencard.net/blog/](https://darencard.net/blog/).

# Automatically push an updated file whenever it is changed

### Linux
1. Make sure `inotify-tools` is installed ([https://github.com/rvoicilas/inotify-tools](https://github.com/rvoicilas/inotify-tools))
2. Configure git as usual
3. Clone the git repository of interest from github and, if necessary, add file you want to monitor
4. Allow username/password to be cached so you aren't asked everytime
```bash
git config credential.helper store
```
5. Open a terminal and navigate, as necessary; issue the following command
```bash
# <<branch>> = branch you are pushing to
# <<file>> = file you want to monitor
inotifywait -q -m -e CLOSE_WRITE --format="git commit -m 'auto commit' %w && git push origin <<branch>>" <<file>> | bash
```
6. In a separate shell, do whatever you want and when monitored file is updated, it will automatically get committed and pushed (as long as the shell with the `inotifywait` command is still active)

### Mac
1. Make sure `fswatch` is installed ([https://github.com/emcrisostomo/fswatch](https://github.com/emcrisostomo/fswatch))
2. Configure git as usual
3. Clone the git repository of interest from github and, if necessary, add file you want to monitor
4. Allow username/password to be cached so you aren't asked everytime
```bash
git config credential.helper store
```
5. Create a script that performs the commit and push (auto_commit_push.sh)
```bash
#!/bin/bash
# <<branch>> = branch you are pushing to
git commit -m "auto commit" $1
git push origin <<branch>>
```
6. Open a terminal and navigate, as necessary; issue the following command
```bash
# <<file>> = file you want to monitor
# <<path/to/auto_commit_push.sh>> = path to the script created above
fswatch -0 <<file>> | xargs -0 -n 1 bash <<path/to/auto_commit_push.sh>>
```
7. In a separate shell, do whatever you want and when monitored file is updated, it will automatically get committed and pushed (as long as the shell with the `fswatch` command is still active)


```
fswatch 1.17.1

Usage:
fswatch [OPTION] ... path ...

Options:
 -0, --print0          Use the ASCII NUL character (0) as line separator.
 -1, --one-event       Exit fswatch after the first set of events is received.
     --allow-overflow  Allow a monitor to overflow and report it as a change event.
     --batch-marker    Print a marker at the end of every batch.
 -a, --access          Watch file accesses.
 -b, --bubble-events   Bubble events with the same timestamp and path.
 -d, --directories     Watch directories only.
 -e, --exclude=REGEX   Exclude paths matching REGEX.
 -E, --extended        Use extended regular expressions.
     --filter-from=FILE
                       Load filters from file.
     --format=FORMAT   Use the specified record format.
 -f, --format-time     Print the event time using the specified format.
     --fire-idle-event Fire idle events.
 -h, --help            Show this message.
 -i, --include=REGEX   Include paths matching REGEX.
 -I, --insensitive     Use case insensitive regular expressions.
 -l, --latency=DOUBLE  Set the latency.
     --no-defer        Set the no defer flag in the monitor.
 -L, --follow-links    Follow symbolic links.
 -M, --list-monitors   List the available monitors.
 -m, --monitor=NAME    Use the specified monitor.
     --monitor-property name=value
                       Define the specified property.
 -n, --numeric         Print a numeric event mask.
 -o, --one-per-batch   Print a single message with the number of change events.
 -r, --recursive       Recurse subdirectories.
 -t, --timestamp       Print the event timestamp.
 -u, --utc-time        Print the event time as UTC time.
 -x, --event-flags     Print the event flags.
     --event=TYPE      Filter the event by the specified type.
     --event-flag-separator=STRING
                       Print event flags using the specified separator.
 -v, --verbose         Print verbose output.
     --version         Print the version of fswatch and exit.

Available monitors in this platform:

  fsevents_monitor
  kqueue_monitor
  poll_monitor

See the man page for more information.

Report bugs to <enrico.m.crisostomo@gmail.com>.
fswatch home page: <https://github.com/emcrisostomo/fswatch>.
```
