# syntax=docker/dockerfile:1

FROM amazonlinux

WORKDIR python-docker

COPY requirements.txt requirements.txt

RUN yum install python3 python3-pip git mysql -y 

RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "app.py", "--host=0.0.0.0", "--port=80"]
