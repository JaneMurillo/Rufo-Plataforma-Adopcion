const Router = require('express');
const pet_model = require('./../models/pet');
var xl = require('excel4node');
const router = Router();
const path = require('path');
const axios =  require("axios");

const getMascotas = async () => {
    try{
        return await axios.get( "http://localhost:5000/mascotas/pet/")
    }
    catch(error){
        console.error(error)
    }
 }

 const getSolicitudes = async () => {
    try{
        return await axios.get( "http://localhost:5000/adopReq/")
    }catch(error){
        console.error(error)
    }
 }

 const getAdoptantes = async () => {
    try{
        return await axios.get( "http://localhost:5000/adopReq/")
    }catch(error){
        console.error(error)
    }
 }

router.get('/reporte/mascotas',async(req, res) => {
    //Se crea documento
    const petsData = await getMascotas();
    if (petsData.data) {
        const pets = petsData.data
        console.log(pets.length);
        console.log(pets[1].pet_name);
        var wb = new xl.Workbook();
        //Nueva hoja de trabajo
        var ws = wb.addWorksheet('Reporte de Mascotas');

        // Estilo de documento
        var style = wb.createStyle({
            font:{
                color: '#040404',
                size: 12,
            }
        });
        ws.cell(1,1).string("ID").style(style);
        ws.cell(1,2).string("Nombre").style(style);
        ws.cell(1,3).string("Especie").style(style);
        ws.cell(1,4).string("Raza").style(style);
        ws.cell(1,5).string("Edad").style(style);
        ws.cell(1,6).string("Tamaño").style(style);
        ws.cell(1,7).string("Sexo").style(style);
        ws.cell(1,7).string("Personalidad").style(style);
        ws.cell(1,8).string("ID de Receptor").style(style);
        for ( x=0; x<pets.length;x++){
            ws.cell(x+2,1).number(pets[x].pet_id).style(style);
            ws.cell(x+2,2).string(pets[x].pet_name).style(style);
            ws.cell(x+2,3).string(pets[x].pet_specie).style(style);
            ws.cell(x+2,4).string(pets[x].pet_breed).style(style);
            ws.cell(x+2,5).string(pets[x].pet_age).style(style);
            ws.cell(x+2,6).string(pets[x].pet_size).style(style);
            ws.cell(x+2,7).string(pets[x].pet_sex).style(style);
            ws.cell(x+2,8).number(pets[x].pet_user_id).style(style);

        };



        ws.column(1).setWidth(10);
        ws.column(2).setWidth(15);
        ws.column(4).setWidth(15);
        ws.column(8).setWidth(15);

        console.log("-> Excel de Mascotas, generado!!");
    }
    
    //
    //wb.write('db_report_pets.xlsx');
    const pathExcel = path.join(__dirname,'../documents/db_report_pets.xlsx');
    wb.write(pathExcel, function (err,stats){
        if (err) {
            console.error(err);
        } else { 
            function donwloadFile(){
                res.download(pathExcel);
            }
            donwloadFile();
            return false;
        }
    });
});

router.get('/reporte/solicitudes',async(req, res) => {
    //Se crea documento
       //Se crea documento
       const reqsData = await getSolicitudes();
       if (reqsData.data) {
           const reqs = reqsData.data
           var wb = new xl.Workbook();
           //Nueva hoja de trabajo
           var ws = wb.addWorksheet('Reporte de Solicitudes');
   
           // Estilo de documento
           var style = wb.createStyle({
               font:{
                   color: '#040404',
                   size: 12,
               }
           });
           ws.cell(1,1).string("ID").style(style);
           ws.cell(1,2).string("Fecha").style(style);
           ws.cell(1,3).string("Estado").style(style);
           ws.cell(1,4).string("Visible").style(style);
           ws.cell(1,5).string("ID de Candidato").style(style);
           ws.cell(1,6).string("ID de Mascota").style(style);
           for ( x=0; x<reqs.length;x++) {
               ws.cell(x+2,1).number(reqs[x].adopreq_id).style(style);
               ws.cell(x+2,2).string(reqs[x].adopreq_date).style(style);
               ws.cell(x+2,3).string(reqs[x].adopreq_state).style(style);
               ws.cell(x+2,4).string(reqs[x].adopreq_visible).style(style);
               ws.cell(x+2,5).number(reqs[x].adopreq_cand_id).style(style);
               ws.cell(x+2,6).number(reqs[x].adopreq_pet_id).style(style);
   
           };
   
           ws.column(2).setWidth(15);
           ws.column(5).setWidth(10);
           ws.column(6).setWidth(10);
   
           console.log("-> Excel de Solicitudes, generado!!");
       }
    //wb.write('db_report_pets.xlsx');
    const pathExcel = path.join(__dirname,'../documents/db_report_adoption_reqs.xlsx');
    wb.write(pathExcel, function (err,stats){
        if (err) {
            console.error(err);
        } else { 
            function donwloadFile(){
                res.download(pathExcel);
            }
            donwloadFile();
            return false;
        }
    });
});

router.get('/reporte/adoptantes',async(req, res) => {
    //Se crea documento
    const adopsData = await getAdoptantes();
    if (adopsData.data) {
        const adops = adopsData.data
        var wb = new xl.Workbook();
        //Nueva hoja de trabajo
        var ws = wb.addWorksheet('Reporte de Adoptantes');

        // Estilo de documento
        var style = wb.createStyle({
            font:{
                color: '#040404',
                size: 12,
            }
        });
        ws.cell(1,1).string("ID").style(style);
        ws.cell(1,2).string("Fecha").style(style);
        ws.cell(1,3).string("Estado").style(style);
        ws.cell(1,4).string("Visible").style(style);
        ws.cell(1,5).string("ID de Candidato").style(style);
        ws.cell(1,6).string("ID de Mascota").style(style);
        for ( x=0; x<adops.length;x++) {
            ws.cell(x+2,1).number(adops[x].adopreq_id).style(style);
            ws.cell(x+2,2).string(adops[x].adopreq_date).style(style);
            ws.cell(x+2,3).string(adops[x].adopreq_state).style(style);
            ws.cell(x+2,4).string(adops[x].adopreq_visible).style(style);
            ws.cell(x+2,5).number(adops[x].adopreq_cand_id).style(style);
            ws.cell(x+2,6).number(adops[x].adopreq_pet_id).style(style);

        };

        ws.column(2).setWidth(15);
        ws.column(5).setWidth(10);
        ws.column(6).setWidth(10);

        console.log("-> Excel de Adoptantes, generado!!");
    }
    //wb.write('db_report_pets.xlsx');
    const pathExcel = path.join(__dirname,'../documents/db_report_adopters.xlsx');
    wb.write(pathExcel, function (err,stats){
        if (err) {
            console.error(err);
        } else { 
            function donwloadFile(){
                res.download(pathExcel);
            }
            donwloadFile();
            return false;
        }
    });
});

module.exports = { router };