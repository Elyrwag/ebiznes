# ubuntu 24:04
FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && apt install -y \
    wget libffi-dev gcc build-essential curl unzip tcl-dev tk-dev uuid-dev \
    lzma-dev liblzma-dev libssl-dev libsqlite3-dev
    
# java 8 with kotlin
RUN apt-get install -y openjdk-8-jdk && java -version
    
RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.8.0/kotlin-compiler-1.8.0.zip -P /tmp

RUN unzip /tmp/kotlin-compiler-1.8.0.zip -d /opt \
    && ln -s /opt/kotlinc/bin/kotlinc /usr/local/bin/kotlinc \
    && ln -s /opt/kotlinc/bin/kotlin /usr/local/bin/kotlin \
    && rm /tmp/kotlin-compiler-1.8.0.zip \
    && kotlin -version

# gradle v8.13
RUN wget https://services.gradle.org/distributions/gradle-8.13-bin.zip -P /tmp
RUN unzip /tmp/gradle-8.13-bin.zip -d /opt/gradle \
    && ln -s /opt/gradle/gradle-8.13/bin/gradle /usr/local/bin/gradle \
    && rm /tmp/gradle-8.13-bin.zip \
    && gradle --version

# python 3.10
RUN wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz
RUN tar -zxvf Python-3.10.0.tgz

RUN cd Python-3.10.0 && ./configure --prefix=/opt/python3.10 && make && make install
RUN rm Python-3.10.0.tgz && rm -r Python-3.10.0/
    
RUN rm -f /usr/bin/python3 \
    && ln -s /opt/python3.10/bin/python3.10 /usr/bin/python \
    && ln -s /opt/python3.10/bin/python3.10 /usr/bin/python3 \
    && ln -s /opt/python3.10/bin/pip3.10 /usr/bin/pip3 \
    && python3 --version && python --version

RUN useradd -ms /bin/bash student
RUN adduser student sudo

USER student 

WORKDIR /home/student/
COPY . /home/student/

EXPOSE 8080
VOLUME /home/student/


RUN gradle build
CMD gradle run -q

