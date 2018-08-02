test-dev:
	nodemon -e py -x "docker-compose run api python setup.py test"

setup-db:
	docker-compose run api python backend/setup_db.py
