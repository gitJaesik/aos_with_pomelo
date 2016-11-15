const fs = require('fs');
const Seq = require('sequelize');
const config = require('../../shared/config/mysql');
const path = require('path');

var seq = new Seq(
		config.database,
		config.user,
		config.password, {
	define: {
		underscored: true
	}
});

// Define models
var models = {};

fs.readdirSync(path.normalize(__dirname)).forEach(fileName => {
	if (path.normalize(__dirname+'/'+fileName) == path.normalize(__filename)|| fileName ==='.DS_Store') return;
	let modelName = fileName.slice(0, -3);
	models[modelName] = require(path.normalize(__dirname+'/'+fileName))(seq, Seq);
});

/*
// 모델 관계 자동으로 설정하기
Object.keys(models).forEach(modelName => {
	let Model = models[modelName];
	if (Model.relate) {
		Model.relate(models);
		delete Model.relate;
	}
});
*/
models.seq = seq;
models.Seq = Seq;

// Sync with database
// DROP=1 node index.js
console.log('process.env.DROP : ', process.env.DROP);
if (process.env.DROP) {
	seq.sync({force: true}).then(() => {

		console.log("===DATABASE SYNCED===");

		// post 1 comments and files and tags
		return models.User.bulkCreate([{
				email: 'admin@gmail.com',
				password: '1111',
				username: 'GM'
			}, {
				email: 'test@test.com',
				password: '1111',
				username: 'tester'
			}, {
				email: 'kakao@kakao.com',
				password: '1111',
				username: 'kakao'
			}]);
	}).then(()=>{
		console.log('===DATABASE SYNC COMPLETE===');
	});
}

module.exports = models;