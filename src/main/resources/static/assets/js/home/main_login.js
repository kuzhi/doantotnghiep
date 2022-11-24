
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
	var input2 = $('.validate-input2 .input100');
	
	/*store*/
    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    /*common user*/
    
	$('.validate-form2').on('submit',function(){
        var check = true;

        for(var i=0; i<input2.length; i++) {
            if(validate2(input2[i]) == false){
                showValidate2(input2[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form2 .input100').each(function(){
        $(this).focus(function(){
           hideValidate2(this);
        });
    });

    function validate2(input2) {
        if($(input2).attr('type') == 'email' || $(input2).attr('name') == 'email') {
            if($(input2).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input2).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate2(input2) {
        var thisAlert = $(input2).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate2(input2) {
        var thisAlert = $(input2).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
	
	
})(jQuery);