# Hive App: Sean's Outpost

Send Bitcoins to Pensacola homeless outreach from Hive wallet.

![Hive app sean's outpost](https://f.cloud.github.com/assets/412533/1961132/421bb568-8268-11e3-877c-1a7d0ac2513e.png)

## Developers
```
cd ~ && git clone https://github.com/hivewallet/hiveapp-seansoutpost.git
cd ~/Library/Application\ Support/Hive/Applications/
ln -s ~/hiveapp-seansoutpost/ seansoutpost
```

This should get the latest repository and symlink it into Hive's app directory. From here, you'll need to access `Tools > Debugging Tools... > Rebuild application list` from Hive's menubar. This will hopefully result in a new Bitstamp icon in the apps dashboard.
