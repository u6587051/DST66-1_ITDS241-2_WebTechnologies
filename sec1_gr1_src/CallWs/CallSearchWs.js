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

          var cate = document.createElement('h5');
          cate.id = 'productCat'; 
          cate.textContent = "ประเภท: "+productData.PCat; //กำหนด text จาก property PCat

          
          var brand_ = document.createElement('h5');
          brand_.id = 'productBrand'; 
          brand_.textContent = "แบรนด์: "+productData.PBrand; //กำหนด text จาก property PName

          //สร้าง Element h4 และกำหนด id เป็น price
          var price = document.createElement('h4');
          price.id = 'price';
          price.textContent = '฿' + productData.PPrice; //กำหนด text จาก property Pprice

          var buyButton = document.createElement('input'); //สร้าง element input เป็น type button เพื่อเป็นปุ่มสั่งซื้อสินค้า
          buyButton.type = 'button';
          buyButton.id = 'buybutton';
          buyButton.value = 'สั่งซื้อสินค้า';

          // ฟังก์ชันสร้าง Dynamic Page เพื่อแสดงรายละเอียดของ Product นั้น ๆ หลังกดปุ่ม สั่งซื้อสินค้า
          buyButton.onclick = function() {
            var productPage = document.createElement('div');

            var imgSrc = productData.Pimg; // กำหนดตัวแปรเป็น Pimg จาก Database
            var productName = productData.PName; // กำหนดตัวแปรเป็น PName จาก Database
            var productCategory = productData.PCat; // กำหนดตัวแปรเป็น PCat จาก Database
            var productPrice = productData.PPrice; // กำหนดตัวแปรเป็น PPrice จาก Database
            var productQuantity = productData.PQuan; // กำหนดตัวแปรเป็น PQuan จาก Database
            var productDetail = productData.PDetail; // กำหนดตัวแปรเป็น PDetail จาก Database

            // สร้างตัวแปร productPage ไว้ใส่ HTML elements ต่างๆ
            productPage.innerHTML = 
            `<section class="ProInfo">
                    <table>
                        <td>
                            <img src="${imgSrc}" class="ProImg" id="pimg"><br>
                        </td>
                        <td>
                            <h1 id="pname">${productName}</h1>
                            <h3 id="pcat">${productCategory}</h3>
                            <h3 id="pprice">ราคา ${productPrice} บาท</h3>
                            <label for="quantity" id="pquan">Quantity: ${productQuantity}</label>
                        </td>
                    </table>
                </section>

                <!-- หัวข้อรายระเอียดของสินค้า -->
                <section class="BoxContent">
                    <h2 class="center-container" id="pdetail">${productDetail}</h2><br>
                </section>
                <footer>
                <p>TopKing 👑</p><br>
                <p>Tel: 02-345-6789</p><br>
                <p>Address: 999 Phutthamonthon Sai 4 Rd, Salaya, Phutthamonthon District, Nakhon Pathom 73170 </p>
            </footer>`;

            // เก็บ productPage.innerHTML เข้าไปเก็บใน localStorage เพื่อจะนำไปสร้างหน้า Product แบบ Dynamic หลังกดปุ่ม
            localStorage.setItem('productPageContent', productPage.innerHTML);

            // Navigate ไป หน้า product โดยใช้ window.location.replace ด้วย URL ของหน้า Product เมื่อกดปุ่มสั่งซื้อสินค้า
            window.location.replace('http://localhost:8021/Product1');
          };
          
          var link = document.createElement('a');
          link.id = 'Buy';
          link.textContent = 'สั่งซื้อสินค้า';

          buyButton.appendChild(link);

          // นำ Tag ต่างๆ ใส่เป็น child ของตัวแปร column ซึ่งคือ div ที่ class คือ column
          column.appendChild(img);
          column.appendChild(heading);
          column.appendChild(cate);
          column.appendChild(brand_);
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