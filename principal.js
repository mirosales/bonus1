const cursosE=require ('./cursos');
const fs = require('fs');
const express = require('express')
const app = express()
const opciones={
	identificacion_curso:{
		demand:true,
		alias:'id'
	},
	nombre_asipirante:{
		demand:true,
		alias:'n'
	},
	cedula_aspirante:{
		demand:true,
		alias:'c'
	}
}
const argv =require('yargs')
			.command('inscribir','Ingreso de aspirantes',opciones)
			.argv
//Mensaje de Bienvenida
console.log("Bienvendio a los cursos ofrecidos por el Tecnologico de Antioquia\n");	
		  	
//Encontrar el curso que el aspirante desea ver
function encontrar(idcurso){
	var infCurso
	infCurso=cursosE.cursos.find(function(cursos){
			return cursos.id==idcurso})
	 if(infCurso === undefined){
		console.log("No existe un curso con esa identifación");
		return false
		}
	 else return infCurso
} 
//Mostrar información del curso si existe
function informacion(idcurso,nombre,cedula){
	let curso= encontrar(idcurso)
	console.log("Información del ingreso: \n"+
			"Curso: "+ idcurso +"\n"+
			"Nombre del Aspirante: "+ nombre+"\n"+
			"Cedula del Aspirante: "+ cedula+"\n"
	); 
	 if(curso!= false){
		console.log("Información del curso:")
		console.log("Curso: "+curso.id+"\n"+
				"Nombre: "+curso.nombre+ "\n"+
				"Duración: "+curso.duracion+" horas\n"+
				"Valor: $" + curso.valor +"\n" )
		crearArchivo(curso,nombre,cedula)
		}
	 
}
//Función flecha que crea un archivo de texto con la información del
//aspirante y el curso de interes.
let crearArchivo=(cursoA,nombre,cedula)=>{
    texto = 'Inscripción de cursos  \r\n' +
          'Nombre del aspirante: ' + nombre + '.\r\n' +
		  'Cédula: '+ cedula+'. \r\n'+
		  'Inscripción al curso: \r\n'+
		  '  Código: '+ cursoA.id+'. \r\n'+
		  '  Nombre: '+cursoA.nombre+ '.\r\n'+
		  '  Duración: '+ cursoA.duracion+' horas.\r\n'+
		  '  Valor: $'+ cursoA.valor+ '.'
    app.get('/', function (req, res) {
        res.send('  <head> <title>Inscripción</title> </head>' +
            '<body> <h1>Inscripción de curso</h1><br/>'+
            'Nombre del aspirante: ' + nombre + '<br/>'+
            'Cédula: ' + cedula + '<br/>' +
            'Información del curso:<br/>' +
            'Código: ' + cursoA.id + '<br/>' +
            'Nombre: ' + cursoA.nombre + '<br/>' +
            'Duración: ' + cursoA.duracion + ' horas<br/>' +
            'Valor: $' + cursoA.valor+ '<br/></body>')
    })

    app.listen(3001)

}
if (argv.id && argv.n && argv.c) { 
		//Información de la búsqueda de un curso y su inscripción
		informacion(argv.id,argv.n, argv.c);}
	else
	{
		//Información de los cursos 
		let curso1=() =>{
			setTimeout(function(){ 
			console.log("Curso: "+cursosE.curso1.id+"\n"+
						"Nombre: "+cursosE.curso1.nombre+ "\n"+
						"Duración: "+cursosE.curso1.duracion+" horas\n"+
						"Valor: $" + cursosE.curso1.valor +"\n" );
			},0)
		}
		let curso2=() =>{
			setTimeout(function(){ 
			console.log("Curso: "+cursosE.curso2.id+"\n"+
						"Nombre: "+cursosE.curso2.nombre+ "\n"+
						"Duración: "+cursosE.curso2.duracion+" horas\n"+
						"Valor: $" + cursosE.curso2.valor +"\n" );
			},2000)
		}
		let curso3=() =>{
			setTimeout(function(){ 
			console.log("Curso: "+cursosE.curso3.id+"\n"+
						"Nombre: "+cursosE.curso3.nombre+ "\n"+
						"Duración: "+cursosE.curso3.duracion+" horas\n"+
						"Valor: $" + cursosE.curso3.valor +"\n" );
			},4000)
		}
		curso1();
		curso2();
		curso3();
}
