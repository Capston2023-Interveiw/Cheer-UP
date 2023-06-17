import pymysql

class DataDao:
    
    def insertLog(self, reason, timestamp, analysis_id, video_id):
        db = pymysql.connect(host='localhost', user='root', db='cheer', password='1234', charset='utf8')
        curs = db.cursor()

        sql = '''insert into analysis_log (reason, timestamp, analysis_id, video_id) values(%s, %s, %s, %s)'''

        curs.execute(sql,(reason, timestamp, analysis_id, video_id))
        db.commit()
        db.close()


	