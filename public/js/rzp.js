var orderId;
$(document).ready(function(){
var settings = {
        "url": "/donate",
        "method": "POST",
        "timeout": 0,
        "headers": {
        "Content-Type": "application/json"
    },
        "data": JSON.stringify({
        "amount": "50000"
    }),
};

//creates new orderId everytime
$.ajax(settings).done(function (response) {
        orderId=response.orderId;
        console.log(orderId);
        $("button").show();
    });
});
document.getElementById('rzp-button1').onclick = function(e){
    var options = {
        "key": "rzp_test_CrrSB9Kr27QO56", // Enter the Key ID generated from the Dashboard
        "amount": <%= donate.amount %> * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Pawdopt",
        "description": "Test Transaction",
        "image": "/img/logo.png",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the previous step
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}
