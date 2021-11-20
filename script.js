
const cookieData = [
    {name:"chocolate chip cookie", price:12.25, imgsrc:"https://handletheheat.com/wp-content/uploads/2018/02/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9.jpg"},
    {name:"macadamia nut cookie", price:12.00, imgsrc:"https://sugarspunrun.com/wp-content/uploads/2017/05/Macadamia-Nut-Cookies-1-of-1.jpg"},
    {name:"oatmeal raisin cookie", price:11.25, imgsrc:"https://beamingbaker.com/wp-content/uploads/2019/08/IGT1-Classic-Gluten-Free-Oatmeal-Raisin-Cookies-Recipe-Vegan-Dairy-Free-GF-1.jpg"},
    {name:"snickerdoodle cookie", price:12.00, imgsrc:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Pile_of_snickerdoodles.jpg"},
    {name:"sugar cookie", price:12.50, imgsrc:"https://images.pexels.com/photos/1963999/pexels-photo-1963999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {name:"peanut butter cookie", price:12.50, imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYIt4jSQ7XM3NGvAqcNI6A5ii2fQ9k8DqHA&usqp=CAU"},{name:"almond milk", price:12.25, imgsrc:"https://40aprons.com/wp-content/uploads/2019/07/how-to-make-almond-milk-2.jpg"},{name:"soy milk", price:12.00, imgsrc:"https://images.medicinenet.com/images/article/main_image/why-is-soy-milk-bad-for-you.jpg"},{name:"oat milk", price:11.25, imgsrc:"https://www.ishn.com/ext/resources/Issues/2019/11-November/ISHN1119_ONLINE-EXCLUSIVE-ForYourHealth_Pic.jpg?1572976921"},{name:"rice milk", price:12.00, imgsrc:"https://wholenewmom.com/wp-content/uploads/2020/05/homemade-rice-milk-img1-2.jpg"},{name:"coconut milk", price:12.50, imgsrc:"https://img1.mashed.com/img/gallery/the-untold-truth-of-coconut-milk/intro-1593114618.jpg"},{name:"goat milk", price:12.45, imgsrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsBblmLu3gwxloEwZYMAlcPeUsTegmev-_bg&usqp=CAU"}
  ];
  
  
  const loremIpsom = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC.";
  
  const cookiesContainer = document.querySelector('.cookie-items');
  const cartContainer = document.querySelector('.cartContainer');
  const grandTotalInput = document.querySelector('.grandTotalInput');
  
  
  function renderProducts(){
    cookieData.forEach((product)=>{
      cookiesContainer.innerHTML += 
        `<div class="cookie-item">
          <div class="cookie-item-inner">
              <div class="cookie-item-front">
                <img class="cookie-image" src=${product.imgsrc}>
              </div>
              <div class="cookie-item-back">
               <p>${loremIpsom}</p>
              </div>
          </div>
              <p class="cookie-name">${product.name}</p>
              <p class="cookie-price">${product.price}</p>
              <button type="button" class="cookieBtn" onclick="addItemToCart('${product.name}')">add to cart</button>
           </div>`;
    });
  }
  renderProducts();
  
  let cartData = JSON.parse(localStorage.getItem("CART")) || [];
  
  function addItemToCart(name){
    if(cartData.some((item)=> item.name === name)){
      alert('This item is already in your cart');
    } else {
      const item = cookieData.find((product)=> product.name === name);
      cartData.push({
        ...item,
        qty:1,
      });
    }
    updateCart();
  }
    
  function updateCart(){
    renderCartItems();
    renderSubTotal();
    
    localStorage.setItem("CART", JSON.stringify(cartData))
  }
  
  
  function renderSubTotal(){
    let totalPrice = 0;
    cartData.forEach((item)=>{
      totalPrice += item.price * item.qty
    })
    grandTotalInput.value = `$${totalPrice.toFixed(2)}`;
  }
  
  
  function renderCartItems(){
    cartContainer.innerHTML = "";
    cartData.forEach((item)=>{
      cartContainer.innerHTML += 
        `
        <div class="cartRow">
          <div>
            <label for="imgSrc"></label>
            <input class="imgSrc" name="imgSrc" type="image" src="${item.imgsrc}">
          </div>
          <div>
            <label for="name">item:</label>
            <input class="name" name="name" type="text" value="${item.name}" value="1">
          </div>
          <div>
            <label for="qty">qty:</label>
            <button type="button" class="increment" onclick="updateNumberOfUnits('add', '${item.name}')">+</button>
            <input  class="qty" name="qty" type="number" min="1" max="5" value="${item.qty}" disabled="">
            <button type="button" class="decrement" onclick="updateNumberOfUnits('minus', '${item.name}')">-</button>
          </div>
          <div>
            <label for="name">price:</label>
            <input class="price" name="price" type="number" value="${item.price}" disabled="">
          </div>
          <div>
            <button type="button" class="deleteBtn" onclick="removeItemFromCart('${item.name}')">X</button>
          </div>
        </div>`;
    })
  }
  
  function removeItemFromCart(name){
    cartData = cartData.filter((item)=> item.name !== name)
    
    updateCart();
  }
  removeItemFromCart()
  
  
  
  function updateNumberOfUnits(action, name){
    cartData = cartData.map((item)=> {
      let qty = item.qty;
      if(item.name === name){
        if(action === 'add'){
          qty++
        } else if(action === 'minus'){
          qty--
        }
      }
      return {
        ...item,
        qty,
      }
    })
    updateCart()
  }