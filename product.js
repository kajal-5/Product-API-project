const API_URL="https://crudcrud.com/api/0d06e6a84b7a4b2f86f84d5c156d0e04/products";
let totalamount =0;

function displayProducts(products){
    const productlist = document.getElementById('productList');
    const totalprice = document.getElementById('totalAmount');
    productlist.innerHTML='';
    totalamount=0;
    products.forEach(product =>{
        const productdiv= document.createElement('div');
        productdiv.innerHTML=`
        <p>
        ${product.product} - ${product.price}
        <button onClick="deletedata('${product.id}',${product.price})">Delete</button>
        </p>
        `;
        productlist.appendChild(productdiv);
        totalamount += parseInt(product.price);
        
    });
    totalprice.innerHTML=`Total Price is ${totalamount}`;
}

function getProduct(){
    axios
    .get(API_URL)
    .then((response)=>{displayProducts(response.data);})
    .catch((error)=>{console.error("Error",error);});
}

function addProduct(product,price){
    axios
    .post(API_URL,
        {
        name:product,
        price: price
    })
    .then((resolve)=>{
        getProduct();
    })
    .catch((error)=>{console.error("Error",error);});

}


function deleteProduct(id,price){
    axios
    .delete(`${API_URL}/${id}`)
    .then((response)=>{
        totalamount-=parseInt(price);
        getProduct();
    })
    .catch((error)=>{
        console.error("Error",error);
    });
}

document.getElementById('productform').addEventListener('submit',function(e){
    e.preventDefault();
    const product = document.getElementById('product').value;
    const price = document.getElementById('price').value;

    if(product & price){
        addProduct(product,price);
    }

    document.getElementById('product').value = '';
    document.getElementById('price').value = '';
});

getProduct();

