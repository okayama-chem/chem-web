preview:
	hugo server --themesDir ../.. --bind=0.0.0.0 --baseURL=http://www.chem.okayama-u.ac.jp --disableFastRender --buildFuture

deploy:
	hugo --themesDir ../.. -d /var/www/html2 --debug

permission:
	sudo chown -R apache:apache .
	sudo chown -R reg:reg .hugo_build.lock resources/
