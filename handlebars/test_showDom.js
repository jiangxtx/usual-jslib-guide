$(document).ready(function(){
    Handlebars.registerHelper('fullName', function(person) {
        return person.firstName + " " + person.lastName;
    });
    $("#btn_simple").click(function(){
        // $(this).hide();
        showTemplate();
    });
    $("#btn_helper").click(function(){

        showHowUseHelper();
    });
});
// var context = {title: "My New Post", body: "This is my first post!"};
var persion = {title :"My New Post",body:"This is my first post!"}
function showTemplate(){
    var source   = $("#some-template").html();
    var template = Handlebars.compile(source);
    var data = { users: [
        {username: "alan", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
        {username: "allison", firstName: "Allison", lastName: "House", email: "allison@test.com" },
        {username: "ryan", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
    ]};
    $("#my_div").html(template(data));;
}

function showHowUseHelper(){
    var context = {
        author: {firstName: "Alan", lastName: "Johnson"},
        body: "I Love Handlebars",
        comments: [{
            author: {firstName: "Yehuda", lastName: "Katz"},
            body: "Me too!"
        }]
    };
    var source   = $("#helper-template").html();
    var template = Handlebars.compile(source);
    $("#helper_div").html(template(context));;

}

