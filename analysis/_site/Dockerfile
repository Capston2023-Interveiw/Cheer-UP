FROM python:3.9.0

WORKDIR /analysis
COPY requirements.txt /analysis/

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get -y install libglib2.0-0
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /analysis

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]