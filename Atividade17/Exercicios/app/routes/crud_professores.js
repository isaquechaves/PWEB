module.exports = function(app){
    app.get('/admin/crud_professores', function(req,res){
     
       async function getProf() {
           try {
              var connection = app.config.dbConnection;
              const pool = await connection();
     
               var professoresModel = app.models.professormodel;// variável que recupera a função exporta
     
              professoresModel.getProfessores(pool, function(error, results){
                  res.render('admin/crud_professores', { profs : results.recordset });
               });
     
           } catch (err) {
               console.log(err)
           }
       }
     
       getProf();
    });
    }