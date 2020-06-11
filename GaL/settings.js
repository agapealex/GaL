//1

//prima data se acceseaza app.js acolo te trimite pe pagina asta unde ai serverul

//vom folosi acest fisier js pt a utiliza setarile din el in mai multe fisiere din proiect
//practic asa le putem reutiliza mai usor

//exports se foloseste pentru a permite utilizarea DbConfig in alte parti
//(ca si cum ar fi public)
//DbConfig nu e decat numele obiectului nostru pe  care il vom exporta
//obiectul contine date ce ne ajuta sa ne conectam la baza de date
exports.DbConfig = {
    user: "sa",
    password: "Qwertyui9",
    server: "localhost\\SQLEXPRESS",
    database: "GaL",
    options: {
        encrypt: true,
        enableArithAbort: true
    },
    port: 1433
};

exports.webPort = 8082;

exports.httpMsgsFormat = "HTML";//sau JSON