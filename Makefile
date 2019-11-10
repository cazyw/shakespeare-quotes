dockerUp:
	docker-compose up --build -d

dockerX:
	docker exec -it shakespeare sh

dockerDown:
	docker-compose down -v

dockerPrune:
	docker container prune -f
	docker image prune -af
