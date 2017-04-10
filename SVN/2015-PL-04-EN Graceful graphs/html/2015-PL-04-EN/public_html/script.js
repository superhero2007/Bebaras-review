/**
 * 
 * @description 2015-PL-04-EN Graceful graphs
 * 
 * 
 * @author Adil Aliyev <adilaliev@gmail.com>
 * 
 */

var answer_to_send = "A";


generate_answer = function () {
    answer_to_send = "A";
    answer_to_send += $("#input_1").val();
    answer_to_send += $("#input_2").val();
    answer_to_send += $("#input_3").val();
    answer_to_send += $("#input_4").val();
    answer_to_send += $("#input_5").val();
}

$(document).ready(function () {

    var tc_pos = $("#task_container").position();
    var offset = 8;


    $("#input_1").css("left", tc_pos.left + 77 - offset);
    $("#input_1").css("top", tc_pos.top + 18 - offset);
    $("#input_1").keyup(function () {
        var num1 = $(this).val();
        var num2 = "4";
        var num3 = $("#input_2").val();
        var num4 = $("#input_3").val();
        if ($.isNumeric(num1) && $.isNumeric(num2)) {
            var d = Math.abs(parseInt(num1) - parseInt(num2));
            $("#diff_14").html(d);
        } else {
            $("#diff_14").html("");
        }
        if ($.isNumeric(num1) && $.isNumeric(num3)) {
            var d = Math.abs(parseInt(num1) - parseInt(num3));
            $("#diff_12").html(d);
        } else {
            $("#diff_12").html("");
        }
        if ($.isNumeric(num1) && $.isNumeric(num4)) {
            var d = Math.abs(parseInt(num1) - parseInt(num4));
            $("#diff_13").html(d);
        } else {
            $("#diff_13").html("");
        }
        generate_answer();
    });

    $("#input_2").keyup(function () {
        var num1 = $(this).val();
        var num2 = $("#input_1").val();
        if ($.isNumeric(num1) && $.isNumeric(num2)) {
            var d = Math.abs(parseInt(num1) - parseInt(num2));
            $("#diff_12").html(d);
        } else {
            $("#diff_12").html("");
        }
        generate_answer();
    });

    $("#input_3").keyup(function () {
        var num1 = $(this).val();
        var num2 = $("#input_1").val();
        if ($.isNumeric(num1) && $.isNumeric(num2)) {
            var d = Math.abs(parseInt(num1) - parseInt(num2));
            $("#diff_13").html(d);
        } else {
            $("#diff_13").html("");
        }
        generate_answer();
    });

    $("#input_4").keyup(function () {

        var num1 = $(this).val();
        var num2 = "4";
        var num3 = $("#input_5").val();
        if ($.isNumeric(num1) && $.isNumeric(num2)) {
            var d = Math.abs(parseInt(num1) - parseInt(num2));
            $("#diff_46").html(d);
        } else {
            $("#diff_46").html("");
        }
        if ($.isNumeric(num1) && $.isNumeric(num3)) {
            var d = Math.abs(parseInt(num1) - parseInt(num3));
            $("#diff_67").html(d);            
        } else {
            $("#diff_67").html("");
        }
        generate_answer();
    });

    $("#input_5").keyup(function () {
        var num1 = $(this).val();
        var num2 = $("#input_4").val();
        if ($.isNumeric(num1) && $.isNumeric(num2)) {
            var d = Math.abs(parseInt(num1) - parseInt(num2));
            $("#diff_67").html(d);
        } else {
            $("#diff_67").html("");
        }
        generate_answer();
    });
    $("#input_2").css("left", tc_pos.left + 17 - offset);
    $("#input_2").css("top", tc_pos.top + 145 - offset);

    $("#input_3").css("left", tc_pos.left + 136 - offset);
    $("#input_3").css("top", tc_pos.top + 145 - offset);

    $("#input_4").css("left", tc_pos.left + 393 - offset);
    $("#input_4").css("top", tc_pos.top + 18 - offset);

    $("#input_5").css("left", tc_pos.left + 393 - offset);
    $("#input_5").css("top", tc_pos.top + 145 - offset);

    $("#diff_12").css("left", tc_pos.left + 35 - offset);
    $("#diff_12").css("top", tc_pos.top + 70 - offset);

    $("#diff_14").css("left", tc_pos.left + 170 - offset);
    $("#diff_14").css("top", tc_pos.top + 5 - offset);

    $("#diff_13").css("left", tc_pos.left + 135 - offset);
    $("#diff_13").css("top", tc_pos.top + 70 - offset);

    $("#diff_46").css("left", tc_pos.left + 330 - offset);
    $("#diff_46").css("top", tc_pos.top + 5 - offset);

    $("#diff_67").css("left", tc_pos.left + 415 - offset);
    $("#diff_67").css("top", tc_pos.top + 70 - offset);

});
