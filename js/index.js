// bài 2
localStorage.setItem(keyLocalStorageListSp, JSON.stringify(listData));
const getData = JSON.parse(localStorage.getItem(keyLocalStorageListSp));

let data = "";
getData.map((item) => {
  data += `
  <div class="item">
  <img
    src="${item.image}"
    alt=""
  />
  <h4>${item.name}</h4>
  <div class="item__bottom">
    <div class="price">
      <p>Giá: ${item.price}</p>
      <p>Số Lượng:  ${item.sl}</p>
    </div>
    <div class="add__Cart">
      <button class=btn__add onClick="addSp(${item.id},${item.sl})">Thêm giỏ hàng</button>
    </div>
  </div>
</div>
  `;
});
document.querySelector(".content__list").innerHTML = data;

//  bài 4
function ObjectCart(id, sl) {
  (this.id = id), (this.sl = sl);
}

function addSp(id, soluong) {
  let arr = localStorage.getItem(keyLocalStorageItemcart)
    ? JSON.parse(localStorage.getItem(keyLocalStorageItemcart))
    : [];
  let check = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      let slCart = (arr[i].sl += 1);
      if (slCart > soluong) {
        alert("sản phẩm này đã hết!");
        return;
      }
      check = true;
      alert("thêm thành công");
    }
  }

  if (!check) {
    let sp = new ObjectCart(id, 1);
    arr.push(sp);
    alert("thêm thành công");
  }
  localStorage.setItem(keyLocalStorageItemcart, JSON.stringify(arr));
}
