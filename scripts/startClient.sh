#!/bin/bash

cd ..
cd client && npm run serve && cd ../
pm2 save