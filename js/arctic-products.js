import menu from "./data.js"

// Llamando a los elementos del HTML que se van a manipular
const products = document.getElementById('products')
const filterBtns = document.querySelectorAll('.filter-btn')
const searchProduct = document.getElementById('searcher')
let initValue = ''

const redirectToWhatsApp = (whatsappNumber, message) => {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
    window.open(url, '_blank')
}

//Creando función parar mostrar los cards en el documento
const showMenuItems = (menu) => {
    let menuArr = menu.map(el => {
        return `
        <div class="product-container">
                <div class="product-image">
                    <img src=${el.img} alt=${el.title}>
                </div>
                <div class="product-info">
                    <div class="description">
                        <h3>${el.title}</h3>
                    </div>
                </div>
                <div class="product-price">
                    <h4 class="price">
                        Precio:<br> 
                        ${el.price}
                    </h4>
                </div>
                <div class="product-button">
                    <button class="whatsappButton" data-whatsapp="+51946556268" 
                    data-message="Hola buenas, Estoy interesado en realizar la compra del producto ${el.title}.">
                        Comprar por WhatsApp
                    </button>    
                </div>
        </div>`
    })
    menuArr = menuArr.join('')
    products.innerHTML = menuArr

    // Agregar evento a los botones "Comprar por WhatsApp"
    const whatsappButtons = document.querySelectorAll('.whatsappButton')
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            const whatsappNumber = button.dataset.whatsapp
            const message = button.dataset.message
            redirectToWhatsApp(whatsappNumber, message)
        })
    })
}

//Creando función para filtrar resultados según la categoría usando botones
const filterByCategory = () => {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnCategory = e.currentTarget.dataset.id
            const menuCategory = menu.filter(option => {
                if (option.category === btnCategory) {
                    return option
                }
            })
            if (btnCategory === 'all') {
                showMenuItems(menu)
            } else {
                showMenuItems(menuCategory)
            }
        })
    })
}

//Creando función para filtrar resultados según el texto ingresado en el buscador
const searchText = () => {
    searchProduct.addEventListener('keyup', () => {
        initValue = searchProduct.value.toUpperCase()
        const filtered = menu.filter(item => {
            // console.log(item.title.toUpperCase());
            if (item.title.toUpperCase().indexOf(initValue) > -1) {
                return item
            }
        })
        showMenuItems(filtered)
    })
}

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener('DOMContentLoaded', () => {
    showMenuItems(menu)
    filterByCategory()
    searchText()
})

// Función para abrir WhatsApp con el mensaje predefinido
const openWhatsApp = () => {
    const phoneNumber = '+51946556268' // Reemplaza esto con tu número de teléfono con el código de país
    const message = encodeURIComponent('Hola buenas, Estoy interesado en realizar la compra de este producto.')
    // Generar la URL del enlace con el mensaje predefinido
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`
    // Redirigir a la URL de WhatsApp
    window.location.href = whatsappURL
}

// Evento clic para el botón "Comprar por WhatsApp"
const whatsappButton = document.getElementById('whatsappButton')
whatsappButton.addEventListener('click', openWhatsApp)