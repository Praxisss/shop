
update()
storageLoad()    
var flag = true
var flag2 = true
function shownav(){
    let a = document.getElementById('nav')
    let b = document.getElementById('shownav')
    let d = document.getElementById('showcart')
    a.style.visibility = flag ? 'visible' : 'hidden'
    b.innerHTML = flag ? '&#215;' : '&#8801;'
    d.style.visibility = !flag ? 'visible' : 'hidden'
    flag = !flag
}
function showcart(){
    let a = document.getElementById('cart')
    let b = document.getElementById('shownav')
    a.style.visibility = flag2 ? 'visible' : 'hidden'
    b.style.visibility = !flag2 ? 'visible' : 'hidden'
    flag2 = !flag2
}
function update(){
    var removeitemcart = document.getElementsByClassName('remove')
    for(let i = 0; i < removeitemcart.length; i++){
        var rem1 = removeitemcart[i]
        rem1.addEventListener('click', remove)
    }
    var quantityinput = document.getElementsByClassName('quant')
    for(let i = 0; i < quantityinput.length; i++){
        var input = quantityinput[i]
        input.addEventListener('change', changequant)
    }
    var addToCartbtn = document.getElementsByClassName('addToCart')
    for(let i = 0; i < addToCartbtn.length; i++){
        var button = addToCartbtn[i]
        button.addEventListener('click', function(event){
            var button = event.target
            var shopItem = button.parentElement
            var desc = shopItem.getElementsByClassName('desc')[0].innerText
            var price = shopItem.getElementsByClassName('priceEL')[0].innerText
            var img = shopItem.getElementsByClassName('itemimg')[0].src
            addToCart(desc, price, img)
            updateTotal()
            storageSave()
        })
    }
}

function changequant(event){
    {
        var inputTarget = event.target
        if(isNaN(inputTarget.value) || inputTarget.value < 1){
            inputTarget.value = 1
        }
        updateTotal()
        storageSave()
    }
}

function remove(event){
    var rem1click = event.target
    rem1click.parentElement.remove()
    updateTotal()
    storageSave()
}

function addToCart(desc, price, img){
    var cartItem = document.createElement('div')
    cartItem.classList.add('cartRow')
    var cart = document.getElementsByClassName('cartCont')[0]
    var clone = cart.getElementsByClassName('descc')
    var quantt = cart.getElementsByClassName('quant')
    for(let i = 0; i < clone.length; i++){
        if(clone[i].innerHTML == desc){
            var a = parseInt(quantt[i].value)
            a = a + 1
            quantt[i].value = a
            return
        }
    }
    var cartRowItem = `
        <img src="${img}" alt="">
        <span class='descc'>${desc}</span>
        <input type="number" value="1" class="quant">
        <p class="price">${price}</p>
        <button class="remove">X</button>
    `
    cartItem.innerHTML = cartRowItem
    cart.append(cartItem)
    cartItem.getElementsByClassName('remove')[0].addEventListener('click', remove)
    cartItem.getElementsByClassName('quant')[0].addEventListener('change', changequant)
}


function updateTotal(){
    var cartRows = document.getElementsByClassName('cartRow')
    var tototal = 0
    for(let i = 0; i <cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceEl = cartRow.getElementsByClassName('price')[0]
        var quantEl = cartRow.getElementsByClassName('quant')[0]
        var price = parseFloat(priceEl.innerText.replace('$', ''))
        var quant = quantEl.value
        tototal = tototal + (price * quant)
    }
    var total = document.getElementsByClassName('total')[0]
    total.innerHTML = tototal
    storageSave()
}






function filterbox(filterby){
    var filtelem = document.getElementsByClassName('item')
    for(let i = 0; i < filtelem.length; i++){
        if(filtelem[i].classList.contains(filterby) ==true){
            filtelem[i].style.display = ''
        }else{
            filtelem[i].style.display = 'none'
        }
    }
}


function filteradio(filterby){
    var filtelem = document.getElementsByClassName('item')
    for(let i = 0; i < filtelem.length; i++){
        if(filtelem[i].classList.contains(filterby) ==true){
            filtelem[i].style.display = ''
        }else{
            filtelem[i].style.display = 'none'
        }
    }
}
function search(){
    var input = document.getElementById('search').value.toUpperCase()
    var a = document.getElementsByClassName('item')
    var b = document.getElementsByClassName('desc')
    for(let i = 0; i < a.length; i++){
        if(b[i].innerText.toUpperCase().indexOf(input) > -1){
            a[i].style.display = ''
        }else{
            a[i].style.display = 'none'
        }
    }
    if(input == ''){
        for(let i = 0; i < a.length; i++){
            a[i].style.display = ''
        }
    }
}




function storageSave(){
    localStorage.setItem('cart', document.getElementById('cart').innerHTML)
    
}
function storageLoad(){
    var a = document.getElementById('cart')
    var b = localStorage.getItem('cart')
    a.innerHTML = b
    var rembtn = document.getElementsByClassName('remove')
    for(let i = 0; i < rembtn.length; i++){
        document.getElementsByClassName('remove')[i].addEventListener('click', remove)
    }
    var quantup = document.getElementsByClassName('quant')
    for(let i = 0; i < quantup.length; i++){
        document.getElementsByClassName('quant')[i].addEventListener('change', changequant)
    }
}
