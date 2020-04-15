///after page loaded.
$(document).ready(function () {
    var formType = "log in";
    ///on "Sign Up form" loading.
    $("#buttonSignUp").click(function () {
        formType = "sign up";
        var username = "";
        $("#username, #email").on("keyup", function () {
            var inputID = $(this).attr('id');
            var inputValue = $(this).val();
            var inputElement = document.getElementById(inputID);
            var errorContaner = $(this).next();
            if (username !== inputValue) {
                username = inputValue;
                $.post("php/database.php", {
                        function: "UserDataAlreadyExists",
                        name: inputID,
                        value: username
                    }, function (data) {
                        // alert(data);
                        if (data == -2) {
                            inputElement.setCustomValidity(inputID + " Already Exists.");
                            errorContaner.html(inputID + " Already Exists.");
                        } else {
                            inputElement.setCustomValidity("");
                            errorContaner.html("");
                        }
                    }
                );
            }
        });
        $("#username").attr("required", true);
        $("#passwordrepeat").attr("required", true);
    });

    ///on "Log In form" loading.
    $("#buttonLogIn").click(function () {
        formType = "log in";
        $("#username, #email").off("keyup");
        $("#username").removeAttr("required");
        $("#passwordrepeat").removeAttr("required");
    });

    ///on form submit.
    ///prevent default.
    $("#form").on("submit", function (e) {
        e.preventDefault();
    });
    ///custom submit fuction.
    $("#form").on("submit", function () {
        if (formType === "log in") {
            $.post("php/database.php", {
                    function: "UserValidation",
                    email: $("#email").val(),
                    password: $("#password").val()
                }, function (data) {
                    // alert(data);
                    if (data == 1) {
                        alert("Welcome!");
                    } else if (data == -2) {
                        alert("wrong email or password");
                    } else {
                        alert(data);
                    }
                }
            );
        } else if (formType === "sign up") {
            $.post("php/database.php", {
                    function: "AddNewUser",
                    username: $("#username").val(),
                    password: $("#password").val(),
                    email: $("#email").val()
                }, function (data) {
                    if (data == 1) {
                        alert("Done!");
                    } else {
                        alert(data);
                    }
                }
            );
        }
    });

    ///on "Submit button" click;
    $("#buttonSubmit").click(function () {
        if (formType === "sign in") {
            if ($("#password").val() !== $("#passwordrepeat").val())
                InvalidInput("passwordrepeat", "Password confirmation doesn't match Password");
            else
                ValidInput("passwordrepeat");
        }
        InsertStyle();
    });
});

///insert "mystyle.css" file to head only once.
function InsertStyle() {
    InsertStyle = function () {
    };
    $("head").append("<link href=\"Style/mystyle.css\" rel=\"stylesheet\">");
}

///make input "invalid" and show "custom message".
function InvalidInput(idInput, message) {
    document.getElementById(idInput).setCustomValidity(message);
}

///make input "valid".
function ValidInput(idInput) {
    document.getElementById(idInput).setCustomValidity("");
}