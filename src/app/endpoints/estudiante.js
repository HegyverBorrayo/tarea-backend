const conn = require('../../config/mysql');
const Joi = require('joi');

module.exports = (app) => {
    //Este debera devolver todos los datos dentro de la tabla nota
    app.get('/consulta', (req, res) =>{
        let query = "SELECT id, nombre, nota_parcial1, nota_parcial2, nota_final FROM nota";
        conn.query(query, (err, notas, fields)=>{
            if(err) res.status(500).json({status: 0, message:"Error en el conexion a la tabla"});

            res.json({status: 1, message: "se obtuvo información satisfactoriamente", notas})
        } );
    });

    //insert
    app.post('/ingreso', (req, res) => {
        let scheme = Joi.object({
            nombre: Joi.string().required(),
            notaprimerparcial: Joi.number().required(),
            notasegundoparcial: Joi.number().required(),
            notafinal: Joi.number().required()
        });
        let valido = Joi.validate(req.body, scheme);
        if(valido.error) {
            res.status(500).json({status: 0, message:"Error validando datos"});
        } else {
            console.log(req.body);
            let insert = {
                "nombre" : req.body.nombre,
                "nota_parcial1" : req.body.notaprimerparcial,
                "nota_parcial2" : req.body.notasegundoparcial,
                "nota_final" : req.body.notafinal
            }
            let query = `INSERT INTO nota (nombre, nota_parcial1, nota_parcial2, nota_final) VALUES ( '${insert['nombre']}', '${insert['nota_parcial1']}', '${insert['nota_parcial2']}', '${insert['nota_final']}');`;
            conn.query(query, (err, rows, fields)=>{
                if(err) res.status(500).send('{"mensaje": "Error insertando el nuevo dato"}');
                res.json({status: 1, message:"Se inserto satistactoriamente"});
            });
        }        
    });
}
