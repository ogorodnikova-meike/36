var numorder
badgecount()

function badgecount(){
    axios.get('/getProductsCar')
    .then(function (response) {
        var data = response.data;

        if(data[2]>0){
            $('.bag').parents('.iconBar').show()
            $('.iconBar .bag').text(data[2])
        }else{
            $('.bag').parents('.iconBar').hide()
            $('.iconBar .bag').text(0)
        }

        if(data[3]>0){
            $('.orders').parents('.iconBar').show()
            $('.iconBar .orders').text(data[3])
            numorder = data[3]
        }else{
            $('.orders').parents('.iconBar').hide()
            $('.iconBar .orders').text(data[3])
            numorder = 0
        }
        
    })
    .catch(function (error) {
        console.log(error);
    })
}

$('.openorder').on('click', function(e){
    e.preventDefault();
    if(numorder == 1){
        axios.get('/lastorder')
        .then((response) => {
            var order = response.data
            window.location.href= "/pedidos/"+order+"/seguimiento";
        })
    }else if(numorder > 1){
        
        window.location.href= "/pedidos";
    }
})

//CREATION OF SERVICE WORKER
/* if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://www.pizzaraul.work/sw.js');
}; */