# syntax=docker/dockerfile:1

FROM amazonlinux

WORKDIR python-docker

COPY requirements.txt requirements.txt

RUN yum install python3 python3-pip git mysql -y

RUN yum -y install python python3-devel mysql-devel redhat-rpm-config gcc 

RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "app.py", "--host=0.0.0.0", "--port=80"]
