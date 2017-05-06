//burger_controller.js 



var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get("/", function(req,res){
	var available = [];
	var unavailable= [];
//Call back hell [The first circle]
	burger.findAll({
		where: {
			devoured: 0
		}
	}).then(function(result1){
		//You have entered call back hell [Second Circle]
		available = result1;
		console.log(available);
		burger.findAll({
			where: {
				devoured: 1
			}
		}).then(function(result2){
			unavailable = result2;
			var hbsObject = {
				burgers: available,
				eaten: unavailable
			};

			res.render("index", hbsObject);
		});
	});
	
});

router.post("/", function(req,res){
	burger.create({
		burger_name: req.body.name,
		devoured: 0,
	}).then(function(result){
		res.redirect("/");
	})


});

router.put("/:id", function(req,res){
	//var condition = "id = "+req.params.id;

	burger.update({
		devoured: 1
	},{
		where:{
			id: req.params.id
		} 
	}).then(function(){
		res.redirect("/");
	});
});

module.exports = router;