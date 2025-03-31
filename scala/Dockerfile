FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt install -y wget vim curl build-essential openjdk-17-jdk

# sbt
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list
RUN curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | tee /etc/apt/trusted.gpg.d/sbt.asc
RUN apt-get update && apt-get install -y sbt

# ngrok
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
RUN tar -xvzf ngrok-v3-stable-linux-amd64.tgz -C /usr/local/bin
RUN rm -r ngrok-v3-stable-linux-amd64.tgz

EXPOSE 9000

RUN mkdir -p root/.config/ngrok/
COPY ./ngrok.yml root/.config/ngrok/ngrok.yml

WORKDIR /app
COPY ./play-scala-app /app
COPY ./script.sh /app

RUN sbt compile
#CMD ["sbt", "run"]

RUN chmod +x ./script.sh
CMD ["/bin/bash", "./script.sh"]
