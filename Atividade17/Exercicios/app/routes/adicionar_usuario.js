module.exports = function(application){
    application.get('/admin/adicionar_professor', function(req,res){
        res.render('admin/adicionar_professor');
     });
   
     application.post('/professor/salvar', function(req,res){
   
         async function getAdcProfessor(){
            try {
                var professor = req.body;
                  
                var connection = application.config.dbConnection;
                const pool = await connection();
   
                var professoresModel = application.models.professormodel;
   
                professoresModel.salvarProfessor(professor,pool, (error, results)=>{
                     if(error){
                     console.log('Erro ao inserir no banco:' + error);
                        res.status(500).send(error);
                     } else {
                         console.log('professor criado!!!');
                         res.redirect('/admin/crud_professores');
                     }
                });
            } catch (error) {
                console.log(error);
             }
         }
         getAdcProfessor();
     });
  }