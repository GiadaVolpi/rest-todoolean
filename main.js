$(document).ready (function () {

    var template_html = $("#template").html();
    var template_function = Handlebars.compile(template_html);

    stampaLista();

    //intercetto il click sul pulsante inserisci
    $("#button-new-todo").click(function(){
        //leggo il testo inserito dall'utente
        var nuovoTodo = $("#input-new-todo").val().trim();

        if (nuovoTodo.length > 0) {
            //resetto l'input
            $("#input-new-todo").val("");

            creazioneTodo(nuovoTodo);
        }
    })

    // intercetto il click sul cestino
    $("#todo-list").on("click", ".remove", function() {
        //recupero id dell'item da eliminare
        var todo_id = $(this).parent().attr("data-id");
        // chiamata ajax per cancellazione item
        $.ajax ({
            "url": "http://157.230.17.132:3024/todos/" + todo_id,
            "method": "DELETE",
            "success": function (data) {
                stampaLista();
            },
            "error": function() {
                alert ("Error");
            }
        });
    });



    /* ------------------------ funzioni ------------------------ */

    function stampaLista () {
        // chiamata ajax in get per leggere le API
        $.ajax ({
            "url": "http://157.230.17.132:3024/todos/",
            "method": "GET",
            "success": function (data) {
                //resetto la lista dei todo
                $ ("#todo-list").empty();

                var todos = data;
                for (var i = 0; i < todos.length; i++) {
                    var todoText = todos[i].text;
                    var todo_id = todos[i].id
                    var context = {
                        todoId: todo_id,
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
    }

    function creazioneTodo (newText) {
        //chiamata ajax in get per leggere le API
        $.ajax ({
            "url": "http://157.230.17.132:3024/todos/",
            "method": "POST",
            "data": {
                "text": newText
            },
            "success": function (data) {
                stampaLista();
            },
            "error": function() {
                alert ("Error");
            }
        });
    }


})
