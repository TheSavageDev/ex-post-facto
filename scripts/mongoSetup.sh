#!/bin/bash
echo "Waiting for startup.."
until curl http://mongo1:28017/serverStatus\?text\=1 2>&1 | grep uptime | head -1; do
  printf '.'
  sleep 1
done

echo curl http://mongo1:28017/serverStatus\?text\=1 2>&1 | grep uptime | head -1
echo "Started.."

sleep 10

echo SETUP.sh time now: `date +"%T" `
mongo --host mongo1:27017 <<EOF
  var cfg = {
    "_id": "epf_rs",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo1:27017",
        "priority": 100
      },
      {
        "_id": 1,
        "host": "mongo2:27017",
        "priority": 50
      },
      {
        "_id": 2,
        "host": "mongo3:27017",
        arbiterOnly: true
      }
    ]
  };
    rs.initiate(cfg, { force: true });
    rs.reconfig(cfg, { force: true });
    rs.slaveOk();
    db.getMongo().setReadPref('nearest');
EOF

tail -f /dev/null
