git pull
yarn build production
tar cvzf build.vsj.tar.gz build
scp build.vsj.tar.gz root@vsj-gold-admin.vvs.vn:/root/
ssh root@vsj-gold-admin.vvs.vn "tar xvzf build.vsj.tar.gz; cp -rf build/* /var/www/vsj-frontend-build/" 

