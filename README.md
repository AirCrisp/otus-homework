## Base service with only healthcheck

### Build

```
docker build --tag your_docker_acc/your_repo:sometag
```

### Prerequsites

Install minikube

### Install

```
cd ./manifests
kubectl apply -f .
```