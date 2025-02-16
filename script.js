$(document).ready(function () {
    function generarRFC() {
        let nombre = $("#nombre").val().trim().toUpperCase();
        let apellidoP = $("#apellidoP").val().trim().toUpperCase();
        let apellidoM = $("#apellidoM").val().trim().toUpperCase();
        let fechaNacimiento = $("#fechaNacimiento").val();

        if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento) {
            $("#rfc-output").text("⚠ Ingrese todos los datos correctamente").css("color", "red");
            return;
        }

        let fecha = fechaNacimiento.split("-");
        let year = fecha[0].slice(-2);
        let month = fecha[1];
        let day = fecha[2];

        let vocales = apellidoP.substring(1).match(/[AEIOU]/g);
        let primeraVocal = vocales ? vocales[0] : "X";

        let consonantesPaterno = apellidoP.substring(1).replace(/[AEIOU]/g, "");
        let consonantesMaterno = apellidoM.substring(1).replace(/[AEIOU]/g, "");
        let consonantesNombre = nombre.substring(1).replace(/[AEIOU]/g, "");

        consonantesPaterno = consonantesPaterno.length > 0 ? consonantesPaterno[0] : "X";
        consonantesMaterno = consonantesMaterno.length > 0 ? consonantesMaterno[0] : "X";
        consonantesNombre = consonantesNombre.length > 0 ? consonantesNombre[0] : "X";

        let rfc = apellidoP.charAt(0) + primeraVocal + 
                  apellidoM.charAt(0) + nombre.charAt(0) + 
                  year + month + day +
                  consonantesPaterno + consonantesMaterno + consonantesNombre + "X";

        $("#rfc-output").text(rfc).css("color", "lightgreen");
    }

    // Generar RFC al escribir en los campos
    $("#nombre, #apellidoP, #apellidoM, #fechaNacimiento").on("input", generarRFC);

    // Generar RFC al hacer clic en el botón
    $("#generate-rfc").click(generarRFC);

    // ✅ Función para consultar la API REST
    $("#fetch-user").click(function () {
        let userId = parseInt($("#user-id").val()); // Convertir a número

        if (isNaN(userId) || userId < 1 || userId > 10) {
            $("#user-info").html("<p style='color: red;'>❌ Ingrese un ID válido entre 1 y 10.</p>");
            return;
        }

        $.ajax({
            url: https://jsonplaceholder.typicode.com/users/${userId},
            method: "GET",
            success: function (data) {
                // Verificar que los datos existen antes de asignarlos
                let nombre = data.name || "No disponible";
                let email = data.email || "No disponible";
                let ciudad = (data.address && data.address.city) ? data.address.city : "No disponible";

                $("#user-name").text(nombre);
                $("#user-email").text(email);
                $("#user-city").text(ciudad);
            },
            error: function () {
                $("#user-info").html("<p style='color: red;'>❌ Error al obtener datos del usuario.</p>");
            }
        });
    });
});
