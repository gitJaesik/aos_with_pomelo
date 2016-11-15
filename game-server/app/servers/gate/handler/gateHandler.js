const models = require('../../../../models');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.queryEntry = function(msg, session, next) {	
	console.log('queryEntry entered');
	var uid = msg.uid;
	var password = msg.password;

	// 만약 아이디나 비밀번호가 없다면 500 에러
	if(!uid || !password) {
		next(null, {
			code: 500
		});
		return;
	}

	// 로그인을 한다.
	models.User.findOne({ 
		where: { 
			email: msg.uid,
			password: msg.password
			 }
		}).then((user)=>{
			// user있으면 로그인 
			if(!user) {
				next(null, {
					code: 500
				});
				return;
			}			
			// 커넥터 서버를 모두 가져온다.
			var connectors = this.app.getServersByType('connector');
			if(!connectors || connectors.length === 0) {
				//서버가 없으면 에러
				next(null, {
					code: 500
				});
				return;
			}
			// 첫번째 커넥터 서버로 넘기고 커넥터 서버를 돌려준다.
			var res = connectors[0];
			next(null, {
				code: 200,
				host: res.host,
				port: res.clientPort
			});
		}).catch(()=>{
			console.log('USER ERROR!');
		}); 
};
