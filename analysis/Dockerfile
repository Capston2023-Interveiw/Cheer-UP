FROM python:3.9.0

WORKDIR /analysis
COPY requirements.txt /analysis/

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install libglib2.0-0
RUN pip install --upgrade pip
RUN pip install -U pip wheel cmake
RUN pip install numpy==1.23.3
RUN pip install --upgrade cython
RUN pip install -r requirements.txt
RUN pip install scikit_learn
COPY . /analysis

CMD ["python3", "app.py"]