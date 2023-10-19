test:
	cd exampleSite; sudo -u apache -g apache /usr/local/bin/hugo server --themesDir ../.. --disableFastRender --baseURL www.chem.okayama-u.ac.jp --bind 153.120.1.15
deploy:
	cd exampleSite; sudo /usr/local/bin/hugo --themesDir ../.. -d /var/www/html2 

pull:
	sudo chown -R reg:reg .
	git pull
	cd exampleSite; make permission
