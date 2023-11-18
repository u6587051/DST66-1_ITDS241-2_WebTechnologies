//function ในการเรียก searchWS ผ่านการ fetch api
async function callSearchWS(url, method,sentData = {}) {
    let data;
    if (method == "select") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง SearchWS
      });
      data = await response.json();
    }
    return data; //ส่งข้อมูลกลับมา
}

//รับค่า input box โดย id
let PNAME, PBRAND, PCAT;
let PNAME_TXT = document.querySelector("#pname");
let PCAT_TXT = document.querySelector("#pcat");
let PBRAND_TXT = document.querySelector("#pbrand");

//รับค่าปุ่มมาจากid
let selectB = document.querySelector("#psearch");

function clearInput() { //function ในการ clear กล่อง input box
  PNAME_TXT.value = "";
  PBRAND_TXT.value = "";
  PCAT_TXT.value = "";
}


//หากกดคลิก select button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callSearchWS
//ส่ง parameter url คือ http://localhost:8022/searchWS/search บวกกับ params เพื่อใช้ในการใส่เงื่อนไขการค้นหา
selectB.addEventListener("click", () => {
    PBRAND = PBRAND_TXT.value;
    PCAT = PCAT_TXT.value;
    PNAME = PNAME_TXT.value;

    let pname = `PNAME=${PNAME}`
    let cat = `PCAT=${PCAT}`;
    let brand = `PBRAND=${PBRAND}`;

    callSearchWS("http://localhost:8022/searchWS/" + "search?"+pname+"&"+cat+"&"+brand, "select").then((data) => {
      console.log(data);
      if (data.error == false) {
        alert(data.message);
        // ใช้เพื่อ clear กล่อง id:Soutput จากไฟล์ Search_page.html
        $("#Soutput").empty();

        //ลูปเรียก data จาก Object
        data.data.forEach((productData) => {

          //มีการกำหนดเพื่อสร้าง element HTML และทำการกำหนด Semantic ต่างๆ
          var column = document.createElement('div'); 
          column.className = 'column';

          //สร้าง Element img และ กำหนด src โดยการเรียก Propertie จาก Object productData
          var img = document.createElement('img');
          img.src = productData.Pimg; 
          img.className = 'productimg'; 
          console.log(productData)

          // สร้าง Element h3 และกำหนด id เป็น producthead
          var heading = document.createElement('h3');
          heading.id = 'producthead'; 
          heading.textContent = productData.PName; //กำหนด text จาก property PName

          //สร้าง Element h4 และกำหนด id เป็น price
          var price = document.createElement('h4');
          price.id = 'price';
          price.textContent = '฿' + productData.PPrice; //กำหนด text จาก property Pprice

          var buyButton = document.createElement('h4');
          buyButton.id = 'buybutton';
          
          var link = document.createElement('a');
          link.id = 'Buy';
          link.textContent = 'สั่งซื้อสินค้า';

          buyButton.appendChild(link);

          // นำ Tag ต่างๆ ใส่เป็น child ของตัวแปร column ซึ่งคือ div ที่ class คือ column
          column.appendChild(img);
          column.appendChild(heading);
          column.appendChild(price);
          column.appendChild(buyButton);

          // ใช้ jQuery selector เลือก HTML element ทีมี ID ชื่อ Soutput และทำการ append ด้วย column ซึ่งคือ div ที่ class คือ column
          $("#Soutput").append(column);
          clearInput();
          });

    
      }else{
        // กรณีที่เกิด error ให้ใช้ Javascript environment ชื่อ Window ในการไปที่ URL Searchpage อีกรอบ
        window.location.replace('http://localhost:8021/Searchpage');
      }
  });
});