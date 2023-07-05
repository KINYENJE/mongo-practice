const deleteButtons = document.querySelectorAll('.delBtn')
const updateButtons = document.querySelectorAll('.updateBtn')



Array.from(deleteButtons).forEach(function(button){
    button.addEventListener('click', deleteCar);
})
Array.from(updateButtons).forEach(function(button){
    button.addEventListener('click', updatePrice);
})

async function deleteCar() {
    brandText = this.parentNode.childNodes[1].innerText
    modelText = this.parentNode.childNodes[3].innerText
    year = this.parentNode.childNodes[5].innerText
    try {
        const response = await fetch('/deleteCar', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "carBrand": brandText,
                "carModel": modelText,
                "YOM": year
            })
        })
    
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log('error on client side')
    }
    
}

async function updatePrice() {
    brandText = this.parentNode.childNodes[1].innerText
    modelText = this.parentNode.childNodes[3].innerText
    year = this.parentNode.childNodes[5].innerText
    price = document.querySelector('.priceField').value
    try {
        const response = await fetch('/updatePrice', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "carBrand": brandText,
                "carModel": modelText,
                "YOM": year,
                "carPrice": price
            })
        })
    
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log('error on client side')
    }
}

