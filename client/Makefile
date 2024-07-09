
build-dev:
	docker build -t react-app-dev -f Dockerfile.dev .

###################

build-local:
	docker build -t url-shortner-client-production:local --build-arg NGINXCONF=nginx.local.conf --build-arg REACT_APP_URL=http://localhost:4001 -f Dockerfile.production .


###################

build-production:
	docker build -t url-shortner-client-production:production --build-arg NGINXCONF=nginx.prod.conf --build-arg REACT_APP_URL=https://akmr.me -f Dockerfile.production .
