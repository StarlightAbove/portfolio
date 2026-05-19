---
title: "An automated note syncing system using Obsidian, GitHub and GoodNotes"
date: "2026-05-18"
tags: ["tech-stuff"]
excerpt: "A system to automate note syncing between Obsidian, GitHub and GoodNotes."
---

Like many of you, I am slightly obsessed with getting my study stack exactly right. All throughout high school, I was obsessed with using Notion. Database linking, calculations, etc. However, with their recent move to branding themselves as an AI company than a good notes system, I needed something different. They didn't even have a system to edit offline! I also started to work with patient data and more sensitive documents in my lab, so I decided to use an approach that doesn't feed some proprietary AI. Also, frankly, the features were overwhelming and I just didn't need that many things on my screen.

### Obsidian

I love Obsidian. It is a simple, elegant notes system with good linking and a fun graph system, and most of all, it is local and open-source. I tried to use it a while ago, but I was way less technically mature, which means that I was quite bad at what I was doing with it.

### GoodNotes

A system to take and organize notes on iPad. Has been indispensible during my college journey. However, my issue with it is that to reference it, I need to go back on my iPad, and I can't copy stuff from it onto my computer without going through a whole ringamarole of transferring. I also had the issue that my workstation runs on Arch Linux, and the rest of my devices use iOS or MacOS, so it wasn't as easy as AirDropping PDFs over.

### GitHub

I needed a way to back up my data without paying for inordinate amounts of storage on the cloud, so I didn't want to use a host to backup my notes system. GitHub is simple and has basically unlimited data, so it was the best choice.

## Set-up

The idea is pretty simple.

1. Back up your GoodNotes to your Google Drive. This allows you to dynamically access PDFs.

2. Create your Obsidian vault, and set up a simpel file system. I use something quite simple. Just basic folders classifying where everything is, and square-bracket Obsidian links where needed instead of forcing it. The one thing you need to do is create a "sync" folder, where your notes can live.

3. Now, you need to get it on your PC. I used rclone for this. It is pretty self-explanatory.
``` bash
yay -S rclone
rclone config
```
And just go through the wizard to link your Google Drive and mount it into your filesystem. You need to be careful where you mount this. Mount it anywhere BUT your Obsidian vault. The reason is that if this crashes, it is annoying and can cause a mess in your vault's workspace.json.

4. The benefit of rclone is that you can easily create a systemd service to automate it checking if your notes have updated. You can use this snippet below. Change ```mnt/gdrive``` to your mount location.
``` ini
[Unit]
Description=rclone Google Drive mount
After=network-online.target
Wants=network-online.target

[Service]
Type=notify
ExecStartPre=/bin/mkdir -p %h/mnt/gdrive
ExecStart=rclone mount gdrive: %h/mnt/gdrive \
    --vfs-cache-mode writes \
    --vfs-cache-max-size 512M \
    --dir-cache-time 30s \
    --poll-interval 15s \
    --log-level INFO \
    --log-file %h/.local/share/rclone/gdrive-mount.log
ExecStop=/bin/fusermount -u %h/mnt/gdrive
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=default.target
```

5. The above gives you ALL of your Google Drive data. Luckily, we can filter it. Goodnotes maintains its internal file structure in its backup, and puts everything into a GoodNotes folder. So, you can just import that! The below service just automates that, instead of having to do this manually, it just directly gets where to put what, and saves you a ton of time.

``` ini
[Unit]
Description=Sync GoodNotes PDFs from Google Drive
Requires=rclone-gdrive.service
After=rclone-gdrive.service

[Service]
Type=oneshot
# Adjust the source path to match where GoodNotes saves on your Drive
ExecStart=rclone copy gdrive:GoodNotes %h/Documents/GoodNotes \
    --include "*.pdf" \
    --update \
    --log-level INFO \
    --log-file %h/.local/share/rclone/goodnotes-sync.log
```

6. Finally, the issue with this is that the sync will work, but not reguarly. So, we need a timer to run it intermittently, so you aren't stuct till you go and run the service manually using ```systemctl```. That is fixed with the timer below:

``` ini
[Unit]
Description=Run GoodNotes sync every 15 minutes
Requires=rclone-gdrive.service

[Timer]
OnBootSec=2min
OnUnitActiveSec=15min
Unit=goodnotes-sync.service

[Install]
WantedBy=timers.target
```

I use 15 minutes for sync, but you can also use a lesser time if you'd like. I just don't think GoodNotes syncs super fast, and you are quite limited by that.

And you're done! Remember to put all the services and timer in ```~/.config/systemd/user/``` to make sure the OS picks up on it.

``` bash
# Reload systemd to pick up the new unit files
systemctl --user daemon-reload

# Enable and start the mount (persists across reboots)
systemctl --user enable --now rclone-gdrive.service

# Enable the timer
systemctl --user enable --now goodnotes-sync.timer

# Make sure lingering is on so user services run without a login session
loginctl enable-linger $USER
```

The files should start syncing immediately. However, it is worth it to restart to make sure that the ```systemctl enable``` is working properly.

I hope this helps you set up a small notes system like mine, and I wish you all a good summer!