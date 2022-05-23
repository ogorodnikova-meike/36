$('.addproduct').click(function(){
    var productCard = $(this).parents('.modal').find('.image-responsive')
    var position = productCard.offset()
    $("body").append('<div class="floating-cart"></div>')
	var cart = $('div.floating-cart')
    productCard.clone().appendTo(cart)
    cart.css({'top' : position.top + 'px', "right" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
    setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
    setTimeout(function(){
        $('div.floating-cart').remove();
        $("body").removeClass("MakeFloatingCart");
    }, 1000);
});