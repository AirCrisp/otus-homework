## Base service with only healthcheck

### Build

```
docker build --tag your_docker_acc/your_repo:sometag
```

### Prerequsites

Install minikube

### Install

#### With kubectl apply

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install my-release bitnami/postgresql -f postgres_values.yaml
$ kubectl apply -f ./migrations/job_up.yaml
$ kubectl apply -f ./manifests/.
```

#### With helm chart

```
$ helm dependency update ./crud-user-chart/
$ helm install crud-app ./crud-user-chart/
```