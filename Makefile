dockerUp:
	docker-compose up --build -d

dockerX:
	docker exec -it shakespeare sh

dockerDown:
	docker-compose down -v

dockerPrune:
	docker container prune -f
	docker image prune -af

npmInstall:
	docker exec shakespeare /bin/sh -c "npm install"

npmTest:
	docker exec shakespeare /bin/sh -c "npm test"

npmStart:
	docker exec shakespeare /bin/sh -c "npm start"
