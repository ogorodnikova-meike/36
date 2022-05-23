axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')

var map

map = L.map('map-address', {
    center: [-9.639621, -75.654574],
    zoom: 12
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$('#frmcover').disableAutoFill({
    'fields': [],
    'debug': false,
    'callback': function() { return checkForm() }
});

const SOL = value => currency(value, { symbol: 'S/. ', decimal: '.', separator: ',' });
var notyf = new Notyf(), place, direction

$('.tabOp').on('click', (e) =>{
    e.preventDefault()
    $('.invalid-feedback').hide()
    place = undefined
    cleardir()
});

$('.inputlight input[type=text]').on('keyup', function(e){
    e.preventDefault()
    clearsearch($(this))
});

$('.dir-clear').bind('click touchstart', function(e){
    e.preventDefault();
    $(this).prev('form').find('input[type=text]').val('')
    $(this).parents('.tab-pane').find('.btn-circle').attr('disabled', true)
    $(this).prev('form').find('span').removeClass('mdc-floating-label--float-above')
    clearsearch($(this).prev('form').find('input[type=text]'))
    cleardir()
});

$('.openpromotion').on('click', function(e){
    e.preventDefault();
    localStorage.setItem('promotion', $(this).data('promotion'))
    window.location.href ="/categorias"
})

initCover()
initNearby()

function initCover(){
    place
    const input = document.getElementById("main-cover");
    var options = {
        componentRestrictions: {country: 'pe'},
        fields: ["address_components", "geometry", "icon", "name", "formatted_address", "types"]
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener("place_changed", () => {
        place = autocomplete.getPlace()
        direction = place.geometry.location
        covers(direction)
        cleardir()
    })

    $('.btn-delivery').on('click', function(e){
        e.preventDefault()
        delivery(place)
    })
}

function delivery(x){
    axios.post('/savestore', {
        input: $('#main-cover').val(),
        log: x,
        method: 1,
    })
    .then((response) => {
        var data = response.data;
        if(data[0] == 1){
            window.location.href = "/categorias"
        }else if(data[0] == 2){
            $('#close-store').modal('show')
        }else if(data[0] == 3){
            $('#pause-store h3').text(data[1])
            $('#pause-store').modal('show')
        }else if(data[0]==0){
            $(this).parents('.tab-pane').find('.dir-error').show()
            $(this).parents('.tab-pane').find('.dir-error').text(data[1])
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

$('#Descripción .main-here').on('click', function(e){
    e.preventDefault();
    currentposition($(this), 1);
});

function initNearby(){
    var input = document.getElementById("main-nearby")

    var options = {
        componentRestrictions: {country: 'pe'},
        fields: ["address_components", "geometry", "icon", "name", "formatted_address", "types"]
    }

    var autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.setComponentRestrictions({ country: ["pe"]})
    autocomplete.addListener("place_changed", () => {
        place = autocomplete.getPlace()
        direction = place.geometry.location
        $('.btn-nearly-sites').removeAttr('disabled')
    })

    $('.btn-nearly-sites').on('click', function(e){
        e.preventDefault()
        pickup($(this), direction, place)
    })
}

function pickup(e, d, p){
    if($('#main-nearby').val() !== ''){
        if(place == undefined){
            e.parents('.tab-pane').find('.dir-error').show()
            e.parents('.tab-pane').find('.dir-error').text('Seleccione una dirección de la lista')
        }else{
            $('#main-map').modal('show')
            createmap(d, p)
        }
    }else{
        e.parents('.tab-pane').find('.dir-error').show()
        e.parents('.tab-pane').find('.dir-error').text('Ingrese la dirección de entrega')
    }
}

$('#caracteristicas .main-here').on('click', function(e){
    e.preventDefault();
    currentposition($(this), 2);
})

$('#main-map').on('shown.bs.modal', function() {
    map.invalidateSize()
})

function createmap(coord, place){
    var hereicon = L.icon({
        iconUrl: '/images/icons/current.svg',
        iconSize: [50, 50],
        iconAnchor: [38, 38]
    })

    L.marker([coord.lat(), coord.lng()], {icon: hereicon}).addTo(map)

    axios.post('/getstores', {
        current: {'lat':coord.lat(),'lng':coord.lng()}
    })
    .then((response) => {
        var data = response.data;
        data.forEach((item) => {
            createmarker(item, place, map)
        })
    })
    .catch((error) => {
        console.log(error)
    })

    map.panTo([coord.lat(), coord.lng()]).setZoom(13)
}

function createmarker(data, place, map){
    var icostore = L.icon({
            iconUrl: '/images/icons/store.svg',
            iconSize: [50, 50],
            iconAnchor: [38, 38]
        })

    L.marker([parseFloat(data.latitude), parseFloat(data.longitude)], {icon: icostore, info: data}).addTo(map).on('click', function(e) {
        $('.mdch-selected').text('Ha seleccionado la tienda PIZZA RAÚL '+ data.title +'\n'+ ' en '+ data.street_name+' '+ data.street_number)
        $('.mdch-message').text('¿Desea elegir esta tienda?')
        $('#modal-confirm').modal('show')

        $('#modal-confirm .accept').on('click', () => {
            accept(data, place)
        })
    })
}

function accept(data,place){
    axios.post('/savestore', {
        input: $('#main-nearby').val(),
        store: data.id,
        log: place,
        method: 2,
    })
    .then((response) => {
        var data = response.data;
        if(data[0]==1){
            window.location.href = "/categorias"
        }else if(data[0]==2){
            $('#modal-confirm').modal('hide')
            $('#main-map').modal('hide')
            $('#close-store').modal('show')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

function clearsearch(e){
    if(e.val() !== ''){
        e.parents('form').next().addClass('show')
    }else{
        e.parents('form').next().removeClass('show')
    }
}

function currentposition(e, t){

    navigator.geolocation.getCurrentPosition((position) => {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        var geocoder = new google.maps.Geocoder();
        var stop = false;

        if(stop === false){

            geocoder.geocode({
                latLng: pos
            }, function(results, status){

                if(status == google.maps.GeocoderStatus.OK){
                    nueva_latitude = pos.lat()
                    nueva_longitude = pos.lng()

                    place = results[0]
                    direction = place.geometry.location

                    var resultado = results[0].address_components;

                    e.parents(".active").find(".mdc-floating-label").addClass("mdc-floating-label--float-above")
                    e.parents(".active").find("input[type=text]").val(results[0].formatted_address);

                    (t === 1)?
                    (covers(direction, direct = '1'))
                    :
                    (e.parents(".active").find('.btn-circle').removeAttr('disabled'),
                    pickup($('.btn-nearly-sites'), direction, place));

                    clearsearch(e.parents(".active").find("input[type=text]"))

                    var number = 0
                    for(var i=0; i < resultado.length; i++){
                        if(resultado[i].types[0] == "street_number"){
                            number = parseInt(resultado[i].long_name)
                        }
                    }

                }else{
                    console.log('La dirección proporcionada no permite autocompletar su ubicación.');
                }

            });

            stop = true;

        }

    },() => {
        console.log("La posición no esta disponible");
    },{
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
    })
}

function cleardir(){
    $('.tab-pane').find('.dir-error').hide();
    $('.tab-pane').find('.dir-error').text('');
}

function covers(current, direct){
    axios.get('/covers')
    .then((response) => {
        var coord = [];
        var store;
        var stores = response.data;
        stores.forEach(function(item){
            if(item.length > 0){
                item.forEach(function(sub){
                    var geo = new google.maps.LatLng(sub.latitude,sub.longitude);
                    coord.push(geo);
                })
                var polyOptions = {path: coord};
                var poligon = new google.maps.Polygon(polyOptions);
                var isWithinPolygon = google.maps.geometry.poly.containsLocation(current, poligon);
                if(isWithinPolygon == true){
                    store = item[0];
                }
                coord.length = 0;
            }
        });

        if(store === undefined){
            $('.btn-delivery').attr('disabled', true);
            notyf.error('Lo sentimos, no poseemos coobertura en esta dirección');
        }else{
            $('.btn-delivery').removeAttr('disabled')
            /* if(direct !== undefined){
                delivery(place)
            } */
        }

    })
    .catch((error) => {
        console.log(error);
    })
}
