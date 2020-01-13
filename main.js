$(document).ready (function () {

    var template_html = $("#template").html();
    var template_function = Handlebars.compile(template_html);

    $.ajax ({
        "url": "http://157.230.17.132:3024/todos/",
        "method": "GET",
        "success": function (data) {
            var todos = data;
            for (var i = 0; i < todos.length; i++) {
                var todoText = todos[i].text;
                console.log(todoText);

                var context = {
                    todoText: todoText
                }

                var html_finale = template_function(context);
                $("#todo-list").append(html_finale);
            }
        },
        "error": function() {
            alert ("Error");
        }
    });



})
