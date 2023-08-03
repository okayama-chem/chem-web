test:
	cd exampleSite; hugo server --themesDir ../.. --disableFastRender --baseURL www.chem.okayama-u.ac.jp --bind 153.120.1.15
deploy:
	cd exampleSite; make deploy
