<?php
///mysql database functions.
include_once("config.php");
///get "Server address" and user account's "Username" and "Password" of database then open a connection to database.
function ConnectionOpen($databaseServer, $databaseUsername, $databasePassword) {
    ///create connection.
    $conn = new mysqli($databaseServer, $databaseUsername, $databasePassword);
    ///if connection failed show message.
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    ///return connection
    return $conn;
}

///get "database connection" then close it.
function ConnectionClose($conn) {
    ///close connection.
    $conn->close();
}

///get "database connection" and user's "username", "password", "firstName", "lastName", "phoneNumber", "email" and "birthDay" then add the user to database.
function AddNewUser($conn, $username, $password, $email) {
    global $databaseName;
    ///hash the password.
    $password = password_hash($password, PASSWORD_ARGON2I);
    ///sql query to insert "user" to database.
    $sql = "INSERT INTO $databaseName.users (`id`, `username`, `email`, `password`) 
            VALUES (NULL, '$username', '$email', '$password');";
    ///execute sql query and if it was "OK" then return "1".
    if ($conn->query($sql) === true)
        return 1;
    ///if something go wrong then return "error"
    else
        return $sql . " " . $conn->error;
}

///get a string then make it safe to use.
function TestInput($data) {
    ///trim string.
    $data = trim($data);
    ///remove slashes.
    $data = stripslashes($data);
    ///make html special chars unexecutable.
    $data = htmlspecialchars($data);
    ///return string.
    return $data;
}

///get "database connection" and one of User's Datas "name" and "value" then check if "value" of type "name" Already Exists in database.
function UserDataAlreadyExists($conn, $name, $value) {
    global $databaseName;
    try {
        ///sql query to check if User's Data already exists.
        $sql = "SELECT EXISTS(
                SELECT *
                FROM $databaseName.users
                WHERE (users.$name = '$value')
            ) AS 'result'";
        ///execute query and save "query result" in "$result".
        $result = $conn->query($sql);
        ///if User's Data already exists return "-2".
        if ($result->fetch_assoc()['result'] == 1) {
            return -2;
        }
    } ///return "-1" if unexpected error occur.
    catch (\Throwable $throwable) {
        return -1;
    }
    ///if User's Data don't exists return "1".
    return 1;
}

///get "database connection" and User's "username" and "password" then check if user is "valid".
function UserValidation($conn, $username, $password) {
    global $databaseName;
    try {
        ///sql query to select password of user with "username = $username".
        $sql = "SELECT password
                FROM $databaseName.users
                WHERE (users.username = '$username');
            ";
        ///execute query and save "query result" in "$result".
        $result = $conn->query($sql);
        ///if user with "username = $username" exists then check password.
        if ($result->num_rows > 0) {
            ///get "hash of User's password" from query result.
            $userPassword = $result->fetch_assoc()["password"];
            ///if "$password" is "right" return "1".
            if (password_verify($password, $userPassword) === true)
                return 1;
        }
    } ///return "-1" if unexpected error occur.
    catch (\Throwable $throwable) {
        return -1;
    }
    ///if "$username" did not existes in database or "$password" was "wrong" return "-2";
    return -2;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_POST["function"]) {
        case "UserDataAlreadyExists":
        {
            $conn = ConnectionOpen($databaseServer, $databaseUsername, $databasePassword);
            echo UserDataAlreadyExists($conn, $_POST["name"], $_POST["value"]);
            ConnectionClose($conn);
            break;
        }
        case "AddNewUser":
        {
            $conn = ConnectionOpen($databaseServer, $databaseUsername, $databasePassword);
            echo AddNewUser($conn, $_POST["username"], $_POST["password"], $_POST["email"]);
            ConnectionClose($conn);
            break;
        }
    }
}
//var_dump($_REQUEST);
