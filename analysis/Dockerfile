FROM python:3.9.12

WORKDIR /analysis
COPY requirements.txt /analysis/

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install libglib2.0-0
RUN apt-get -y install portaudio19-dev
RUN apt-get install -y \
    vorbis-tools \
    sox \
    alsa-utils \
    libasound2 \
    libasound2-plugins \
    pulseaudio \
    pulseaudio-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* 
COPY pulse-client.conf /etc/pulse/client.conf
RUN pip install --upgrade pip
RUN pip install -U pip wheel cmake
RUN pip install numpy==1.23.3
RUN pip install --upgrade cython
RUN pip install --upgrade pip setuptools wheel
RUN pip install opencv-python==4.5.5.64
RUN pip install -r requirements.txt --verbose
RUN pip install scikit-learn==1.2.2
COPY . /analysis

CMD ["python3", "app.py"]