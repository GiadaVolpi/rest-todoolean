$(document).ready (function () {

    var template_html = $("#template").html();
    var template_function = Handlebars.compile(template_html);

    var urlApi = "http://157.230.17.132:3024/todos/";

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
        var remove_todo_id = $(this).parent().attr("data-id");

        cancellazioneTodo(remove_todo_id);
    });

    // intercetto il click sulla matita
    $("#todo-list").on("click", ".replace", function() {
        // nascondo il testo e visualizzo l'input
        $(this).parent().find(".todo-text").addClass("hidden");
        $(this).parent().find(".edit-todo-input").addClass("active");

        // nascondo la matita e visualizzo il floppy
        $(this).parent().find(".replace").addClass("hidden");
        $(this).parent().find(".save").addClass("active");
    });

    // intercetto il click sul floppy
    $("#todo-list").on("click", ".save", function() {
        //recupero id dell'item da modificare
        var replace_todo_id = $(this).parent().attr("data-id");

        // recupero l'id
        $(this).parent().attr("data-id");

        // leggo il testo modificato dall'utente
        var todoModificato = $(this).parent().find(".edit-todo-input").val();

        modificaTodo(replace_todo_id, todoModificato)
    });


    /* ------------------------ funzioni ------------------------ */

    function stampaLista() {
        // chiamata ajax in get per leggere le API
        $.ajax ({
            "url": urlApi,
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

    function creazioneTodo(newText) {
        //chiamata ajax in get per leggere le API
        $.ajax ({
            "url": urlApi,
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

    function cancellazioneTodo(id) {
        // chiamata ajax per cancellazione item
        $.ajax ({
            "url": urlApi + id,
            "method": "DELETE",
            "success": function (data) {
                stampaLista();
            },
            "error": function() {
                alert ("Error");
            }
        });
    }

    function modificaTodo(id, testo_todo) {
        // chiamata ajax per modifica item
        $.ajax ({
            "url": urlApi + id,
            "method": "PUT",
            "data": {
                "text": testo_todo
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
