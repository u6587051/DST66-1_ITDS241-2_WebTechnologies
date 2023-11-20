DROP DATABASE IF EXISTS sec1_gr1_database;
CREATE DATABASE sec1_gr1_database;
USE sec1_gr1_database;

CREATE TABLE Product (
PID char(2) NOT NULL UNIQUE,
PName varchar(100) NOT NULL,
PBrand varchar(40) NOT NULL,
PCat varchar(50) NOT NULL,
PPrice int NOT NULL,
PQuan int NOT NULL,
PDetail varchar(256) NOT NULL,
Pimg varchar(256) NOT NULL,
PRIMARY KEY (PID)
);

CREATE TABLE ADMINS(
AID char(3) NOT NULL UNIQUE,
email varchar(50) NOT NULL,
pwd varchar(5) NOT NULL,
fname varchar(30) NOT NULL,
lname varchar(30) NOT NULL,
address varchar(256) NOT NULL,
age int NOT NULL,
need varchar(256) NOT NULL,
PRIMARY KEY (AID)
);

INSERT INTO ADMINS VALUES
("001","pguide@gmail.com","12345","Thanawich","Juangroongruangkit","42 ponisit",20,"เจ้าของร้านค้า"),
("002","psub@gmail.com","11111","Jaosub","Juangroongruangkit","888 pasulo",20,"เป็นพ่อค้า"),
("003","pjay@gmail.com","69696","Salute","Juangroongruangkit","123 city",20,"ทำรายได้ 50,000 ต่อเดือน"),
("004","pcho@gmail.com","25474","Suntipap","Juangroongruangkit","99 samainiyom",19,"อยากขายของหมด"),
("005","phim@gmail.com","98764","Jittakan","Juangroongruangkit","10 USA",21,"อยากจะเป็นนักธุรกิจพันล้าน");

INSERT INTO Product VALUES
("01","ใบตัด New Kosoku","New Kosoku","เครื่องมือตัด",349,99,"ขนาด4x4","https://i.postimg.cc/mkZyPYC3/Product1.jpg"),
("02","MAKITA สว่าน DF001G Cordless Driver Drill","MAKITA","เครื่องมือไฟฟ้า",3500,99,"40V","https://i.postimg.cc/9f5mCJHk/f97159484da0f32a8476c45427b6cc87.jpg"),
("03","เครื่องตัดเหล็ก 12 Stanley","Stanley","เครื่องมือตัด",1400,99,"#15-166","https://i.postimg.cc/Nfj7kkVZ/Product3.jpg"),
("04","ใบตัด Corolla","Corolla","เครื่องมือตัด",500,99,"ขนาด4x1","https://i.postimg.cc/PqRMCpK0/COROLLA-4-1.jpg"),
("05","MAKITA สว่านไร้สาย สว่าน 3 ระบบ","MAKITA","เครื่องมือไฟฟ้า",849,99,"148V","https://i.postimg.cc/7PmZ03SC/e63b80290abfee823e13426b5c587023.jpg"),
("06","Total ปั๊มลมอัตโนมัติ ปั๊มลมมินิ","Total","เครื่องมือลมปั้มลม",1169,99,"12V 18A แรงดัน 120 PSI","https://i.postimg.cc/7L6FvzfR/sg-11134201-22100-y2koa121xvivdb.png"),
("07","ตู้ชาร์จแบต CB-30","Marten","เครื่องมือช่างยนต์",550,55,"ใช้ชาร์จแบตเตอร์รี่ได้ทั้งแบตน้ำและแบตแห้ง","https://i.postimg.cc/jqBLjFDd/Marten-CB-30-1.jpg"),
("08","ปั๊มลม 30 ลิตร","ETOP","เครื่องมือลม",2500,35,"ปั๊มลม oil free เสียงเงียบ ไม่มีกลิ่นน้ำมัน ไม่ต้องใช้น้ำมันหล่อลื่น","https://i.postimg.cc/SR98sFqC/etop-30l-400x400-4-1.jpg"),
("09","ปั๊มน้ำ ปั๊มแช่ ปั๊มจุ่ม","DC-SOLAR","เครื่องฉีดน้ำแรงดันสูงและอุปกรณ์",790,54,"วัสดุ: โลหะและพลาสติก","https://i.postimg.cc/44vVrGLR/9122019-0006.jpg"),
("10","สีสเปรย์เรดฟ็อกซ์ RED FOX NO.36(300)","RED FOX","สีสเปร์ย",90,10,"NO.36(300) BRIGHT SILVER (สีบรอนซ์)","https://i.postimg.cc/8zLJjqrc/RED-FOX-NO-36-300-BRIGHT-SILVER-2.jpg");

SELECT * FROM ADMINS;

SELECT * FROM Product;