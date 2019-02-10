#!/bin/bash

cd ..
pm2 start index.js --name="preezma-app"
pm2 save
