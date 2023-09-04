import logging
import boto3
from dotenv import load_dotenv
import os
import uuid
from botocore.exceptions import ClientError

load_dotenv()

def s3_connection():
    try:
        s3 = boto3.resource(
        service_name='s3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
    )
    except Exception as e:
        print(e)
    else:
        return s3

def putVideoToS3(fname, uploadFile, user): 
    key = f"{user}/video/{fname}"
    s3r = s3_connection()
    s3r.Bucket(os.environ.get('AWS_S3_BUCKET_NAME')).put_object(Key=key, Body=uploadFile.read(), ContentType='video/mp4')
    imageKey = key
    return imageKey

def putImageToS3(fname, uploadFile, user): 
    key = f"{user}/video/{fname}"
    s3r = s3_connection()
    s3r.Bucket(os.environ.get('AWS_S3_BUCKET_NAME')).put_object(Key=key, Body=uploadFile.read(), ContentType='image/png')
    imageKey = key
    return imageKey