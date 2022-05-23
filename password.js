var notyf = new Notyf()

$(document).ready(function(){
    $('#otpp-register input[type=text]').mask('0');
});

$('.btm-password').on('click', function(e){
    e.preventDefault()
    axios.get('/checkmail')
    .then((response) => {
        var resp = response.data[0]
        switch(resp){
            case 1:
                $('#modal-password .form1').removeClass('hide')
                $('#modal-password').modal('show')
            break;
            case 2:
                $('#modal-password .form2').html(response.data[2])
                $('#modal-password .form2').removeClass('hide')
                $('#modal-password').modal('show')

                $('#otpp-register input').on('keyup', function(e){
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        if($(this).val() !== ''){
                            $(this).next().focus()
                        }
                    }
                    if(e.keyCode === 8){
                        if($(this).val() == ''){
                            $(this).prev().focus()
                        }
                    }
                    if(e.keyCode === 229){
                        if($(this).val() !== ''){
                            $(this).next().focus();
                        }
                    }
                    enable_btn_otp()
                });

                $('#otpp-register input').bind('paste', function(e){
                    e.preventDefault()
                    $('#otpp-register input').each(function(){ $(this).val('') })
                    var pastedData = e.originalEvent.clipboardData.getData('text');
                    pastedData = pastedData.split("");
                    for(var i=0;i<pastedData.length;i++){
                        $("#otpp-register .inputotp"+(i+parseInt(1))).val(pastedData[i]);
                        $("#otpp-register .inputotp"+(i+parseInt(1))).focus();
                    }
                })

                $('.btne-otp').on('click', function(e){
                    e.preventDefault()
                    axios.post('/checkotp', {
                        otp: concatOTP(),
                    })
                    .then((response) => {
                        var data = response.data;
                        if(data[0] == 1){
                            $('#modal-password .form2 *').remove()
                            $('#modal-password .form2').addClass('hide')
                            $('#modal-password .form1').removeClass('hide')
                        }else if(data[0] == 0 || data [0] == 2){
                            notyf.error(data[1])
                        }else if(data[0] == 3){
                            sendagaine($(this), data[2])
                            notyf.error(data[1])
                        }
                    })
                    .catch((error) => {
                        notyf.error("Ha ocurrido un error")
                        console.log(error)
                    })
                })

            break;
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

var a,b,c,t

$('#pss-input').on('keyup', function(e){
    e.preventDefault()
    if($(this).val().length == 0){
        $("#rqs2").addClass('disabled');
        $("#rqs3").addClass('disabled');
    }

    if($(this).val().length >= 8){
        $("#rqs1").removeClass('disabled');
        a = true;
    }else{
        a = false;
        $("#rqs1").addClass('disabled');
    }

    //eval 1 letter
    for(var i=0;i < $(this).val().length;i++){
        if($(this).val().charAt(i).match(/[a-z]/i)){
            $("#rqs2").removeClass('disabled');
            b = true;
            break;
        }else{
            b = false
            $("#rqs2").addClass('disabled');
        }
    }

    //eval 1 number
    for(var i=0;i < $(this).val().length;i++){
        if($(this).val().charAt(i).match(/[0-9]/i)){
            $("#rqs3").removeClass('disabled');
            c = true;
            break;
        }else{
            c = false;
            $("#rqs3").addClass('disabled');
        }
    }

    activate(a,b,c);
});

$('.rps-change').on('click', (e) => {
    e.preventDefault()
    axios.post("/updatepass",{
        password: $('#pss-input').val()
    })
    .then((response)=>{
        var data = response.data;
        if(data[0] == 1){
            notyf.success(data[1])
            setTimeout(function(){
                location.reload();
            }, 777);
        }else{
            notyf.error(data[1])
            console.log(error)
        }
    });
});

function enable_btn_otp(){
    var length = $('#otpp-register input').length
    var i = 0
    $('#otpp-register input').each(function(){
        if($(this).val()!==''){ i++ }
    });
    if(i === length){ 
        $('.lgps-btn').removeClass('hide')
    }else{
        $('.lgps-btn').addClass('hide')
    }
}

function sendagaine(e,f){
    e.after(f);
    e.remove();

    $('.lgps-btn-again').on('click', function(e){
        e.preventDefault();
        $('#otpp-register input').val('');
        $('.btm-password').click();
        $('#otpp-register input').first().focus();
    });
}

function concatOTP(){
    var otp = "";
    $('#otpp-register input').each(function(){
        otp += $(this).val();
    });
    return otp;
}

function activate(u,d,t){
    if(u && d && t){
        $(".rps-change").attr('disabled',false);
    }else{
        $(".rps-change").attr('disabled',true);
    }
}